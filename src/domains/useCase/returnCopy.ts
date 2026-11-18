import { identifier } from "../constraints";
import type { CopyId, ReturnedLoan } from "../entities";
import type { Clock } from "../ports";
import type { LoanRepository } from "../repositories";
import { computeLateDays } from "../rules";
import { failure, success, type DomainError, type Result } from "../shared/result";
import { invalidInput, type InvalidInputError } from "./invalidInput";

export interface ReturnCopyInput {
    readonly copyId: CopyId;
}

// Valide les données brutes avant d'appeler le use case.
export function parseReturnCopyInput(
    raw: { copyId?: unknown },
): Result<ReturnCopyInput, InvalidInputError> {
    const copyId = identifier<"copy">(raw.copyId);
    if (copyId === null) {
        return failure(invalidInput("copyId", "identifiant non vide attendu"));
    }

    return success({ copyId });
}

export interface ReturnCopyDependencies {
    readonly loanRepository: LoanRepository;
    readonly clock: Clock;
}

export interface NoActiveLoanForCopyError extends DomainError<"NO_ACTIVE_LOAN_FOR_COPY"> {
    readonly copyId: CopyId;
}

export function noActiveLoanForCopy(copyId: CopyId): NoActiveLoanForCopyError {
    return {
        code: "NO_ACTIVE_LOAN_FOR_COPY",
        copyId,
        message: `Retour impossible : aucun emprunt en cours ne correspond à l'exemplaire ${copyId}. Aucune donnée n'a été modifiée.`,
    };
}

export type ReturnCopyError = NoActiveLoanForCopyError;

export type ReturnCopyResult = Result<ReturnedLoan, ReturnCopyError>;

// Enregistre le retour d'un exemplaire.
// 1. Aucun emprunt en cours pour cet exemplaire -> NO_ACTIVE_LOAN_FOR_COPY, rien n'est modifié.
// 2. Sinon passe l'emprunt en "returned" avec la date du jour et les jours de retard.
// Un retour en retard est toujours accepté.
export async function returnCopy(
    dependencies: ReturnCopyDependencies,
    input: ReturnCopyInput,
): Promise<ReturnCopyResult> {
    throw new Error("returnCopy n'est pas encore implémenté");
}
