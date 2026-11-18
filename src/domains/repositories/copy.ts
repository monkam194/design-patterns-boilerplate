import type { Copy, CopyId } from "../entities";

// Renvoie null si rien n'est trouvé.
export interface CopyRepository {
    findById(id: CopyId): Promise<Copy | null>;
}
