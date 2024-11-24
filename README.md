# SportSee - Tableau de bord Analytics

## Description
SportSee est une application de coaching sportif qui permet de visualiser ses données d'entraînement via un tableau de bord analytics. L'application est développée avec React, TypeScript et Vite, et utilise diverses bibliothèques pour offrir une expérience utilisateur optimale.

## Technologies Utilisées
- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Outil de build
- **Tailwind CSS** - Framework CSS utilitaire
- **Recharts** - Bibliothèque de visualisation de données
- **React Router** - Gestion du routing
- **Fetch API** - Appels API

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
npm install

# Démarrer le serveur backend
npm run start
```
Le serveur backend sera accessible sur `http://localhost:3000`
/!\ Attention, les appels API se basant sur le local, le fetch n'est pas dynamique. Si le serveur backend est ouvert sur un autre port, alors les données ne seront pas accessibles. /!\ 

### 2. Frontend
```bash
# Cloner le repository frontend
git clone [votre-repo-frontend]

# Installer les dépendances
cd [nom-du-dossier]
npm install

# Démarrer le serveur de développement
npm run dev
```
L'application sera accessible sur `http://localhost:5173`

## Architecture du Projet

```
src/
├── assets/              # Ressources statiques (images, icons)
│   ├── static/         # Images et icônes
│   └── svg/            # Composants SVG
│
├── components/          # Composants React réutilisables
│   ├── HeaderMenu/     # Menu principal
│   ├── WelcomePanel/   # Panneau de bienvenue
│   └── ...
│
├── mocks/              # Données de test
│   └── UserInfos.json  # Données utilisateur mocké
│
├── services/           # Services et appels API
│   └── apiCalls.ts    # Configuration des appels API
│
├── types/              # Types TypeScript
│   └── interfaces.ts   # Interfaces partagées
│
└── utils/              # Fonctions utilitaires
    └── formatters.ts   # Formatage des données
```

## Fonctionnalités

L'application offre deux modes de fonctionnement :
1. **Mode API** : Données récupérées depuis le backend
2. **Mode Mock** : Données de test locales

Pour basculer entre les deux modes, utilisez le toggle switch dans l'interface.

## Scripts Disponibles

```bash
# Démarre le serveur de développement
npm run dev

# Build le projet
npm run build

# Lance les tests
npm run test

# Vérifie le typage TypeScript
npm run type-check

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
