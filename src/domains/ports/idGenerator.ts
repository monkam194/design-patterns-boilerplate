import type { LoanId, MemberId } from "../entities";

// Génère des identifiants uniques.
export interface IdGenerator {
    nextMemberId(): MemberId;
    nextLoanId(): LoanId;
}
