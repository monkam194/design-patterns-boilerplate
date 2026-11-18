import { email, personName, type Email, type PersonName } from "../constraints";
import type { Member } from "../entities";
import type { Clock, IdGenerator } from "../ports";
import type { MemberRepository } from "../repositories";
import { failure, success, type DomainError, type Result } from "../shared/result";
import { invalidInput, type InvalidInputError } from "./invalidInput";

export interface RegisterMemberInput {
    readonly lastName: PersonName;
    readonly firstName: PersonName;
    readonly email: Email;
}

// Valide les données brutes avant d'appeler le use case.
export function parseRegisterMemberInput(
    raw: { lastName?: unknown; firstName?: unknown; email?: unknown },
): Result<RegisterMemberInput, InvalidInputError> {
    const lastName = personName(raw.lastName);
    if (lastName === null) {
        return failure(invalidInput("lastName", "texte de 1 à 100 caractères attendu"));
    }

    const firstName = personName(raw.firstName);
    if (firstName === null) {
        return failure(invalidInput("firstName", "texte de 1 à 100 caractères attendu"));
    }

    const parsedEmail = email(raw.email);
    if (parsedEmail === null) {
        return failure(invalidInput("email", "adresse email valide attendue"));
    }

    return success({ lastName, firstName, email: parsedEmail });
}

export interface RegisterMemberDependencies {
    readonly memberRepository: MemberRepository;
    readonly idGenerator: IdGenerator;
    readonly clock: Clock;
}

export interface EmailAlreadyRegisteredError extends DomainError<"EMAIL_ALREADY_REGISTERED"> {
    readonly email: Email;
}

export function emailAlreadyRegistered(alreadyUsedEmail: Email): EmailAlreadyRegisteredError {
    return {
        code: "EMAIL_ALREADY_REGISTERED",
        email: alreadyUsedEmail,
        message: `Inscription refusée : l'adresse email ${alreadyUsedEmail} est déjà utilisée par un adhérent. Chaque adhérent doit avoir une adresse unique.`,
    };
}

export type RegisterMemberError = EmailAlreadyRegisteredError;

export type RegisterMemberResult = Result<Member, RegisterMemberError>;

// Inscrit un adhérent.
// 1. Email déjà utilisé -> EMAIL_ALREADY_REGISTERED, rien n'est enregistré.
// 2. Sinon crée l'adhérent (nouvel id, date du jour), l'enregistre et le renvoie.
export async function registerMember(
    dependencies: RegisterMemberDependencies,
    input: RegisterMemberInput,
): Promise<RegisterMemberResult> {
    throw new Error("registerMember n'est pas encore implémenté");
}
