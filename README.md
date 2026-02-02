# Analyse Text API

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Architecture](https://img.shields.io/badge/Architecture-Clean_SOLID_MVC-orange?style=for-the-badge)

Une API robuste construite avec **Node.js** et **TypeScript** pour analyser des textes. Le projet met l'accent sur une architecture maintenable et des performances SQL optimisées.

---

## 📂 Structure du Projet

```text
analyse-text-node-api/
├── src/
│   ├── app.ts                 # Configuration Express : middlewares globaux, cors, parsing JSON
│   ├── server.ts              # Bootstrapping du serveur Node.js
│   ├── config/                # Configurations globales
│   │   ├── db/                # Connexion PostgreSQL
│   │   ├── swagger.ts         # Documentation API
│   │   └── security.ts        # Headers et sécurité (helmet, rate-limit)
│   ├── modules/
│   │   ├── analysis/          # Module d'analyse de texte
│   │   │   ├── controller/    # Routes & controllers pour analyse (/api/analyze)
│   │   │   ├── service/       # Logique de calcul du score (AnalysisService)
│   │   │   └── model/         # Types et constantes (ex: ANALYSIS_RULES)
│   │   └── history/           # Module historique
│   │       ├── controller/    # Routes & controllers pour l'historique (/api/history)
│   │       ├── service/       # Logique métier pour pagination & calcul
│   │       ├── repository/    # Accès aux tables SQL (HistoryRepository)
│   │       └── model/         # Types et interfaces
│   ├── routes/                # Centralisation des routes
│   │   ├── api/               # Préfixe /api
│   │   │   ├── analyze.routes.ts
│   │   │   └── history.routes.ts
│   │   └── index.ts           # SetupRoutes : centralisation & 404 handler
│   └── utils/                 # Helpers et fonctions globales
├── .env.example               # Variables d'environnement à remplir
├── bd.sql                     # Script SQL : schéma, tables, triggers et exemples
├── package.json               # Dépendances & scripts npm
└── tsconfig.json              # Configuration TypeScript
```

## ⚙️ Installation & Setup

```bash
git clone [https://github.com/ton-utilisateur/analyse-text-node-api.git](https://github.com/ton-utilisateur/analyse-text-node-api.git)
cd analyse-text-node-api
npm install
npm run dev
```

2. Configuration Environnement
Créez un fichier .env à la racine :
```bash
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=ton_password
DB_NAME=analyse_text
```

## 🛠️ Configuration de la Base de Données

Le projet délègue l'intégrité et le suivi temporel des données directement à **PostgreSQL** via des triggers automatiques. Cela garantit une précision maximale des données, indépendamment de la logique applicative.

### 1. Création de l'instance
Lancez votre client SQL (pgAdmin, psql) et exécutez :
```sql
CREATE DATABASE analyse_text;
```

## Commandes du Projet

Utilisez les scripts `npm` suivants pour piloter le cycle de vie de l'application :

| Commande | Description | Environnement |
| :--- | :--- | :--- |
| `npm run dev` | Lance le serveur avec **nodemon** pour un redémarrage automatique à chaque modification. | 🛠️ Développement |
| `npm run build` | Compile l'ensemble du projet **TypeScript** vers le dossier `/dist` en JavaScript pur. | 🏗️ Build |
| `npm start` | Démarre l'application préalablement compilée via le point d'entrée `/dist/server.js`. | Production |

---


### 💡 Cycle de Déploiement Standard

Pour garantir la stabilité de l'application, suivez cette séquence logique lors de la mise en production ou du déploiement sur un nouvel environnement :


| Étape | Commande | Rôle |
| :--- | :--- | :--- |
| **1. Installation** | `npm install` | Télécharge et synchronise toutes les dépendances du projet. |
| **2. Compilation** | `npm run build` | Transforme le code **TypeScript** source en fichiers **JavaScript** optimisés. |
| **3. Lancement** | `npm start` | Démarre le serveur de production via le dossier de sortie `/dist`. |

---

> ⚠️ **Important** : Assurez-vous que votre base de données PostgreSQL est accessible et que le fichier `.env` est correctement configuré avant de lancer l'étape 3.
>
> 

## 📖 Documentation Interactive (Swagger)

L'API intègre **Swagger UI**, permettant de visualiser et de tester tous les endpoints en temps réel sans avoir besoin d'outils tiers comme Postman.



### 🔗 Accès local
Une fois le serveur démarré, ouvrez votre navigateur à l'adresse suivante :
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

### ✨ Fonctionnalités incluses
* **Exploration visuelle** : Liste complète des schémas de données et des routes.
* **Test "Try it out"** : Exécutez des requêtes directement depuis l'interface.
* **Modèles de données** : Visualisation claire des structures de requêtes (Request Body) et des réponses attendues.

---
> 💡 *Note : Assurez-vous que le middleware Swagger est activé dans votre fichier `app.ts` pour que cette page soit accessible.*
>
> 
## 📌 Points d'entrée (Endpoints)

| Méthode | Route | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Vérifie le statut de l'API |
| `GET` | `/api/texts` | Liste tous les textes analysés |
| `POST` | `/api/texts` | Analyse un nouveau texte et sauvegarde le score |

 
 ## 💡 Principes de Conception

Le projet repose sur des standards de développement modernes pour garantir une maintenabilité à long terme et une robustesse accrue.


* **Clean Architecture & MVC** : Séparation stricte des responsabilités. La logique métier (Controllers) est isolée de l'accès aux données (Repositories), facilitant les tests et l'évolution du code.
* **Principes SOLID** : Conception orientée objet favorisant un code découplé, extensible et facile à maintenir.
* **Global Error Handling** : Centralisation de la gestion des erreurs. Toutes les exceptions sont interceptées et renvoyées via un `ResponseHandler` pour garantir un format JSON unifié : `{ "success": false, "message": "...", "data": null }`.
* **SQL Triggers** : Fiabilité au niveau de la donnée. La logique de timestamp (`updated_on`) est gérée nativement par PostgreSQL, évitant les incohérences entre l'application et la base de données.

---

## 📖 Technologies Utilisées

L'écosystème technique a été choisi pour son équilibre entre performance et sécurité de typage.


* **[Node.js](https://nodejs.org/)** : Environnement d'exécution performant pour le backend.
* **[TypeScript](https://www.typescriptlang.org/)** : Typage statique pour réduire les erreurs en production et améliorer l'auto-complétion.
* **[PostgreSQL](https://www.postgresql.org/)** : Système de gestion de base de données relationnelle puissant et fiable.
* **[Express](https://expressjs.com/)** : Framework minimaliste et flexible pour la gestion des routes et middlewares.