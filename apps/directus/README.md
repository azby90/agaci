# AGACI — Directus CMS

## Démarrage

Le CMS Directus est lancé via Docker Compose depuis la racine du projet :

```bash
docker-compose up -d directus
```

- **URL Admin :** http://localhost:8055/admin
- **Email :** admin@agaci.org
- **Mot de passe :** Admin1234! (à changer en production)

## Collections à créer

Voir `/c/dev/AGACI/_bmad-output/architecture.md` section 4 pour le schéma complet.

## Snapshots

Les snapshots du schéma sont versionnés dans `snapshots/` pour reproduire l'environnement.
