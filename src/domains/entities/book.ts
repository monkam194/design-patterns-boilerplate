import type { Identifier } from "../constraints";

export type BookId = Identifier<"book">;

// Livre. Un livre peut avoir plusieurs exemplaires.
export interface Book {
    readonly id: BookId;
    readonly title: string;
}
