import type { Email } from "../constraints";
import type { Member, MemberId } from "../entities";

// Renvoie null si rien n'est trouvé.
export interface MemberRepository {
    findById(id: MemberId): Promise<Member | null>;
    findByEmail(email: Email): Promise<Member | null>;
    // Ajoute un nouvel adhérent.
    create(member: Member): Promise<void>;
}
