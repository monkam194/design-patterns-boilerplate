import type { Identifier } from "../constraints";
import type { BookId } from "./book";

export type CopyId = Identifier<"copy">;

// Exemplaire d'un livre. Il est disponible s'il n'a aucun emprunt "active".
export interface Copy {
    readonly id: CopyId;
    readonly bookId: BookId;
}
