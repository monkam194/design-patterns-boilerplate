import type { Constraint } from "./base";

// Entier >= 0.
export type NonNegativeInteger = number & Constraint<"non-negative-integer">;

export function nonNegativeInteger(input: unknown): NonNegativeInteger | null {
    return typeof input === "number" && Number.isInteger(input) && input >= 0
        ? (input as NonNegativeInteger)
        : null;
}
