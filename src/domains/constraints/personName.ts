import type { Constraint } from "./base";

export const PERSON_NAME_MAX_LENGTH = 100;

// Nom ou prénom : sans espaces autour, 1 à 100 caractères.
export type PersonName = string & Constraint<"person-name">;

export function personName(input: unknown): PersonName | null {
    if (typeof input !== "string") {
        return null;
    }

    const trimmed = input.trim();

    if (trimmed.length === 0 || trimmed.length > PERSON_NAME_MAX_LENGTH) {
        return null;
    }

    return trimmed as PersonName;
}
