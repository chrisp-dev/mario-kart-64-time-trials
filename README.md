# Developer Onboarding Guide

## Overview
Welcome to the Mario Kart 64 Time Trials project! This project allows you to manage time trial records with a sleek and keyboard-friendly UI. This guide will walk you through setting up the project from scratch, including both the backend (Node.js with SQLite) and the frontend (React with Material-UI).

## Prerequisites
Ensure you have the following installed on your system:
- Node.js and npm: [Download and install here](https://nodejs.org/)
- Git: [Download and install here](https://git-scm.com/)
- A code editor (e.g., Visual Studio Code): [Download and install here](https://code.visualstudio.com/)

## Project Structure
```
mario-kart-time-trials/
├── backend/
│   ├── db/
│   │   └── index.js
│   ├── routes/
│   │   └── timeTrials.js
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── TimeTrialForm.js
│   │   │   ├── TimeTrialsList.js
│   │   │   └── Header.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── package-lock.json
├── .gitignore
└── README.md
```

