# SportSee - Tableau de bord Analytics

## Description
SportSee est une application de coaching sportif qui permet de visualiser ses données d'entraînement via un tableau de bord analytics. L'application est développée avec React, TypeScript et Vite, et utilise diverses bibliothèques pour offrir une expérience utilisateur optimale.

## Technologies Utilisées
- **React 18** - Framework
- **TypeScript** - Typage statique
- **Vite** - Outil de build
- **Tailwind CSS** - Framework CSS utilitaire
- **Recharts** - Bibliothèque de visualisation de données
- **React Router** - Gestion du routing
- **Axios** - Pour les appels API

## Prérequis
- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)
- Git

## Installation

### 1. Backend
```bash
# Cloner le repository backend
git clone https://github.com/OpenClassrooms-Student-Center/P9-front-end-dashboard.git

# Installer les dépendances
cd P9-front-end-dashboard
yarn install

# Démarrer le serveur backend
yarn dev

Le serveur backend sera accessible sur `http://localhost:3000`. **Attention** : Les appels API se basent sur le local, le fetch n'est pas dynamique. Si le serveur backend est ouvert sur un autre port, alors les données ne seront pas accessibles.

### 2. Frontend
```bash
# Cloner le repository frontend
git clone https://github.com/HussonAxel/SportSee-Front

# Installer les dépendances
cd SportSee-Front
npm install

# Démarrer le serveur de développement
npm run dev
```
L'application sera accessible sur `http://localhost:5173`.

## Architecture du Projet
```
src/
├── assets/              # Ressources statiques (images, icons)
│   ├── static/         # Images et icônes
│
├── components/          # Composants React réutilisables
│   ├── HeaderMenu/     # Menu principal
│   ├── WelcomePanel/   # Panneau de bienvenue
│   ├── graphs/         # Graphiques et visualisations
│   └── 404             # Page d'erreur
│
├── mocks/              # Données de test
│   ├── UserInfos.json  # Données utilisateur mockées
│   ├── userActivity.json # Données d'activité mockées
│   ├── userPerformance.json # Données de performance mockées
│   └── userAverageSession.json # Données de sessions moyennes mockées
│
├── services/           # Services et appels API
│   └── api.ts          # Configuration des appels API
│
├── types/              # Types TypeScript
│   └── interfaces.ts   # Interfaces partagées
│
├── utils/              # Fonctions utilitaires
│   └── isMocked.ts     # Formatage des données selon l'utilisation
│
├── hooks/              # Hooks personnalisés
│   ├── useActivity.ts  # Hook pour récupérer les données d'activité
│   ├── usePerformance.ts # Hook pour récupérer les données de performance
│   ├── useScore.ts     # Hook pour récupérer le score de l'utilisateur
│   └── useNutrition.ts  # Hook pour récupérer les données nutritionnelles
│
├── pages/              # Pages de l'application
│   ├── Home/           # Page d'accueil
│   └── 404/            # Page d'erreur
│
└── router/             # Configuration du routing
    └── root.tsx        # Configuration des routes de l'application
```

## Fonctionnalités
L'application offre deux modes de fonctionnement :
1. **Mode API** : Données récupérées depuis le backend.
2. **Mode Mock** : Données de test mockés via l'api.

Pour basculer entre les deux modes, utilisez le toggle switch dans l'interface.

## Scripts Disponibles
```bash
# Démarre le serveur de développement
npm run dev

# Build le projet
npm run build

# Lint le code
npm run lint
```

## Endpoints API
L'API expose les endpoints suivants :
- `GET /user/${userId}` - Informations utilisateur
- `GET /user/${userId}/activity` - Données d'activité
- `GET /user/${userId}/average-sessions` - Sessions moyennes
- `GET /user/${userId}/performance` - Données de performance

## Documentation
Pour plus d'informations sur les bibliothèques utilisées :
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Recharts Documentation](https://recharts.org/)
- [React Router Documentation](https://reactrouter.com/)