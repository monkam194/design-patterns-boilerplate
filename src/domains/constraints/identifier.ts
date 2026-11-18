import type { Constraint } from "./base";

// Identifiant non vide, typé par entité.
export type Identifier<GenericEntity extends string> =
    string & Constraint<`identifier-${GenericEntity}`>;

export function identifier<GenericEntity extends string>(
    input: unknown,
): Identifier<GenericEntity> | null {
    if (typeof input !== "string") {
        return null;
    }

    const trimmed = input.trim();

    return trimmed.length === 0 ? null : (trimmed as Identifier<GenericEntity>);
}
