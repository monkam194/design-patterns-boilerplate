# Exercice : conception d'une bibliothèque

## Contexte métier

Je gère une petite bibliothèque municipale. Aujourd'hui, nous utilisons des fiches papier pour suivre nos adhérents et les livres qu'ils empruntent.

J'aimerais disposer d'une application qui me permette de gérer les inscriptions, les emprunts et les retours de livres.

Voici comment nous travaillons actuellement.

### Situation 1 : un nouvel adhérent arrive

Lorsqu'une personne souhaite s'inscrire, je lui demande son nom, son prénom et son adresse email.

Je vérifie qu'elle n'est pas déjà inscrite avec cette adresse email, car chaque adhérent doit avoir une adresse unique.

Si tout est en ordre, je crée sa fiche et lui attribue un numéro d'adhérent unique, qui lui permettra d'emprunter des livres.

Si son adresse email est déjà enregistrée, je refuse l'inscription et lui explique pourquoi.

### Situation 2 : un adhérent souhaite emprunter un livre

Lorsqu'un adhérent vient emprunter un livre, je commence par retrouver sa fiche grâce à son numéro d'adhérent.

Je vérifie ensuite deux choses :

- Il ne doit pas avoir plus de trois emprunts en cours.
- L'exemplaire du livre qu'il souhaite emprunter doit être disponible.

Nous pouvons posséder plusieurs exemplaires d'un même livre. Chaque exemplaire possède son propre identifiant et ne peut être emprunté que par une seule personne à la fois.

Si toutes les conditions sont réunies, j'enregistre l'emprunt avec la date du jour et une date de retour prévue 14 jours plus tard.

Sinon, je refuse l'emprunt en précisant la raison.

### Situation 3 : un adhérent rapporte un livre

Lorsqu'un livre est rapporté, je retrouve l'emprunt en cours correspondant à son exemplaire.

J'enregistre la date du retour et je rends cet exemplaire à nouveau disponible pour les autres adhérents.

Si le livre est rendu après la date prévue, je souhaite conserver le nombre de jours de retard dans l'historique de l'emprunt.

Pour le moment, nous n'appliquons aucune pénalité financière. Même en retard, un retour est toujours accepté.

Si aucun emprunt en cours ne correspond à cet exemplaire, je veux être informé du problème sans modifier les données.

## Objectif de l'exercice

À partir de ce contexte, concevoir **trois use cases** correspondant aux trois situations décrites.

L'objectif n'est pas de produire le maximum de code, mais de **rendre le comportement métier suffisamment explicite pour qu'un modèle d'IA peu puissant puisse implémenter chaque use case sans devoir inventer les règles manquantes**.

Le professeur pourra sélectionner la définition d'un use case et demander à une IA de l'implémenter à partir du contexte accessible dans le projet.

## Travail demandé

1. Identifier les entités et leurs responsabilités à partir du récit.
2. Définir les types, les ports et les règles métier nécessaires.
3. Déclarer les trois use cases et leurs contrats explicites.
4. Prévoir les cas nominaux, les cas limites et les refus métier.
5. Vérifier que les définitions fournissent à l'IA toutes les informations nécessaires pour implémenter chaque use case.

La manière d'exprimer les contraintes métier et de structurer les abstractions est libre. Vous pouvez créer les outils et dossiers qui vous semblent nécessaires.

### Contrat attendu pour chaque use case

L'IA doit pouvoir déterminer sans interprétation :

- Les entrées, leur signification et leurs types.
- Les préconditions et les règles métier exactes.
- Les données à consulter et les modifications d'état à effectuer.
- Les dépendances nécessaires, définies via des ports.
- Les valeurs de retour et les différents cas d'échec.
- Le comportement attendu dans les cas limites.

Exprimez ces informations autant que possible dans les types, les signatures et les commentaires proches du code concerné.

**Les ambiguïtés laissées dans les contrats font partie de l'évaluation.**

## Structure de départ

- `src/domains/entities/` : entités métier.
- `src/domains/repositories/` : ports de persistance.
- `src/domains/useCase/` : points d'entrée métier.
- `src/infrastructure/` : serveur Express et implémentations techniques.

Vous pouvez ajouter les fichiers et dossiers nécessaires à votre conception.

## Démarrage

```bash
pnpm install
pnpm dev
```

Le serveur Express expose `GET /health`. Utilisez `pnpm typecheck` pour vérifier le typage.
