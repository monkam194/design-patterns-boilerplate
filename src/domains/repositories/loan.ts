import type { CopyId, ActiveLoan, MemberId, ReturnedLoan } from "../entities";

// "Active" = status "active". Renvoie null si rien n'est trouvé.
export interface LoanRepository {
    countActiveByMemberId(memberId: MemberId): Promise<number>;
    findActiveByCopyId(copyId: CopyId): Promise<ActiveLoan | null>;
    // Ajoute un nouvel emprunt.
    create(loan: ActiveLoan): Promise<void>;
    // Remplace l'emprunt qui a le même id.
    markAsReturned(loan: ReturnedLoan): Promise<void>;
}
