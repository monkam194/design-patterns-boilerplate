import type { DomainError } from "../shared/result";

// Donnée brute invalide, détectée avant l'appel du use case.
export interface InvalidInputError extends DomainError<"INVALID_INPUT"> {
    readonly field: string;
}

export function invalidInput(field: string, expected: string): InvalidInputError {
    return {
        code: "INVALID_INPUT",
        field,
        message: `Le champ "${field}" est invalide : ${expected}.`,
    };
}
