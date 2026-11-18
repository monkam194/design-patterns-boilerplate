import type { Constraint } from "./base";

export const EMAIL_MAX_LENGTH = 254;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Email normalisé (minuscules, sans espaces autour) : deux emails égaux sont la même adresse.
export type Email = string & Constraint<"email">;

export function email(input: unknown): Email | null {
    if (typeof input !== "string") {
        return null;
    }

    const normalized = input.trim().toLowerCase();

    if (normalized.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(normalized)) {
        return null;
    }

    return normalized as Email;
}
