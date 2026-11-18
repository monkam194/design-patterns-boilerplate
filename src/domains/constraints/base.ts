declare const SymbolConstraint: unique symbol;
export type SymbolConstraint = typeof SymbolConstraint;

export interface Constraint<GenericName extends string> {
    readonly [SymbolConstraint]: Record<GenericName, unknown>;
}
