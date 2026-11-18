import type { BorrowCopyDependencies, BorrowCopyError } from "./borrowCopy";
import type { InvalidInputError } from "./invalidInput";
import type { RegisterMemberDependencies, RegisterMemberError } from "./registerMember";
import type { ReturnCopyDependencies, ReturnCopyError } from "./returnCopy";

// Tous les ports à injecter dans les use cases.
export type LibraryDependencies =
    & RegisterMemberDependencies
    & BorrowCopyDependencies
    & ReturnCopyDependencies;

export type LibraryError =
    | InvalidInputError
    | RegisterMemberError
    | BorrowCopyError
    | ReturnCopyError;

// Tous les codes d'erreur possibles.
export type LibraryErrorCode = LibraryError["code"];
