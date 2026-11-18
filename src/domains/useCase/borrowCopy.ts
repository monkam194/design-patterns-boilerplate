import { identifier } from "../constraints";
import type { ActiveLoan, CopyId, MemberId } from "../entities";
import type { Clock, IdGenerator } from "../ports";
import type { CopyRepository, LoanRepository, MemberRepository } from "../repositories";
import { canStartNewLoan, computeDueDate, MAX_ACTIVE_LOANS_PER_MEMBER } from "../rules";
import { failure, success, type DomainError, type Result } from "../shared/result";
import { invalidInput, type InvalidInputError } from "./invalidInput";

export interface BorrowCopyInput {
    readonly memberId: MemberId;
    readonly copyId: CopyId;
}

// Valide les données brutes avant d'appeler le use case.
export function parseBorrowCopyInput(
    raw: { memberId?: unknown; copyId?: unknown },
): Result<BorrowCopyInput, InvalidInputError> {
    const memberId = identifier<"member">(raw.memberId);
    if (memberId === null) {
        return failure(invalidInput("memberId", "identifiant non vide attendu"));
    }

    const copyId = identifier<"copy">(raw.copyId);
    if (copyId === null) {
        return failure(invalidInput("copyId", "identifiant non vide attendu"));
    }

    return success({ memberId, copyId });
}

export interface BorrowCopyDependencies {
    readonly memberRepository: MemberRepository;
    readonly copyRepository: CopyRepository;
    readonly loanRepository: LoanRepository;
    readonly idGenerator: IdGenerator;
    readonly clock: Clock;
}

export interface MemberNotFoundError extends DomainError<"MEMBER_NOT_FOUND"> {
    readonly memberId: MemberId;
}

export interface CopyNotFoundError extends DomainError<"COPY_NOT_FOUND"> {
    readonly copyId: CopyId;
}

export interface LoanLimitReachedError extends DomainError<"LOAN_LIMIT_REACHED"> {
    readonly memberId: MemberId;
    readonly activeLoansCount: number;
    readonly maxActiveLoans: number;
}

export interface CopyNotAvailableError extends DomainError<"COPY_NOT_AVAILABLE"> {
    readonly copyId: CopyId;
}

export function memberNotFound(memberId: MemberId): MemberNotFoundError {
    return {
        code: "MEMBER_NOT_FOUND",
        memberId,
        message: `Emprunt refusé : aucun adhérent ne correspond au numéro ${memberId}.`,
    };
}

export function copyNotFound(copyId: CopyId): CopyNotFoundError {
    return {
        code: "COPY_NOT_FOUND",
        copyId,
        message: `Emprunt refusé : aucun exemplaire ne correspond à l'identifiant ${copyId}.`,
    };
}

export function loanLimitReached(memberId: MemberId, activeLoansCount: number): LoanLimitReachedError {
    return {
        code: "LOAN_LIMIT_REACHED",
        memberId,
        activeLoansCount,
        maxActiveLoans: MAX_ACTIVE_LOANS_PER_MEMBER,
        message: `Emprunt refusé : l'adhérent a déjà ${activeLoansCount} emprunts en cours, le maximum est ${MAX_ACTIVE_LOANS_PER_MEMBER}.`,
    };
}

export function copyNotAvailable(copyId: CopyId): CopyNotAvailableError {
    return {
        code: "COPY_NOT_AVAILABLE",
        copyId,
        message: `Emprunt refusé : l'exemplaire ${copyId} est déjà emprunté.`,
    };
}

export type BorrowCopyError =
    | MemberNotFoundError
    | CopyNotFoundError
    | LoanLimitReachedError
    | CopyNotAvailableError;

export type BorrowCopyResult = Result<ActiveLoan, BorrowCopyError>;

// Enregistre un emprunt. Vérifications dans cet ordre, on s'arrête au premier refus :
// 1. Adhérent introuvable -> MEMBER_NOT_FOUND
// 2. Exemplaire introuvable -> COPY_NOT_FOUND
// 3. Déjà 3 emprunts en cours -> LOAN_LIMIT_REACHED
// 4. Exemplaire déjà emprunté -> COPY_NOT_AVAILABLE
// Sinon crée l'emprunt (date du jour, retour prévu à J+14), l'enregistre et le renvoie.
// En cas de refus, rien n'est enregistré.
export async function borrowCopy(
    dependencies: BorrowCopyDependencies,
    input: BorrowCopyInput,
): Promise<BorrowCopyResult> {
    throw new Error("borrowCopy n'est pas encore implémenté");
}
