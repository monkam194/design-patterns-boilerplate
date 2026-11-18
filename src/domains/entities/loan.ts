import type { CalendarDate, Identifier, NonNegativeInteger } from "../constraints";
import type { CopyId } from "./copy";
import type { MemberId } from "./member";

export type LoanId = Identifier<"loan">;

// Un emprunt est "active" puis devient "returned". Il n'est jamais supprimé.
export type Loan = ActiveLoan | ReturnedLoan;

interface LoanBase {
    readonly id: LoanId;
    readonly memberId: MemberId;
    readonly copyId: CopyId;
    readonly borrowedOn: CalendarDate;
    // borrowedOn + 14 jours
    readonly dueOn: CalendarDate;
}

export interface ActiveLoan extends LoanBase {
    readonly status: "active";
}

export interface ReturnedLoan extends LoanBase {
    readonly status: "returned";
    readonly returnedOn: CalendarDate;
    // 0 si rendu à temps
    readonly lateDays: NonNegativeInteger;
}
