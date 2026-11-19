import type { Copy } from "../domains/entities";
import type { Clock, IdGenerator } from "../domains/ports";
import type { CopyRepository, LoanRepository, MemberRepository } from "../domains/repositories";
import type { LibraryDependencies } from "../domains/useCase";

// Moyens de stockage disponibles. Ajouter un stockage = ajouter une valeur ici.
export type StorageKind = "memory";

// Fabrique les adapters d'un moyen de stockage (un adapter par repository).
export interface RepositoriesFactory {
    createMemberRepository(): MemberRepository;
    // Les exemplaires existent déjà : le repository démarre avec le catalogue.
    createCopyRepository(catalog: readonly Copy[]): CopyRepository;
    createLoanRepository(): LoanRepository;
}

// Une fabrique par moyen de stockage : le compilateur refuse un stockage oublié.
export type RepositoriesFactories = Record<StorageKind, RepositoriesFactory>;

export interface LibraryServices {
    readonly clock: Clock;
    readonly idGenerator: IdGenerator;
}

// Construit toutes les dépendances des use cases à un seul endroit.
export function createLibraryDependencies(
    storage: StorageKind,
    factories: RepositoriesFactories,
    services: LibraryServices,
    catalog: readonly Copy[],
): LibraryDependencies {
    const factory = factories[storage];

    return {
        memberRepository: factory.createMemberRepository(),
        copyRepository: factory.createCopyRepository(catalog),
        loanRepository: factory.createLoanRepository(),
        clock: services.clock,
        idGenerator: services.idGenerator,
    };
}
