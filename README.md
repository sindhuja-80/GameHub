# GameHub

GameHub is a modern web-based arcade application built using React, Vite, and Tailwind CSS.  
It provides a collection of interactive mini games within a single platform.
## Overview

GameHub is a multi-game frontend application where users can log in, access different games, and enjoy a smooth arcade-style experience. The project demonstrates component-based architecture, routing, and interactive game logic.
## Live Link
Access the application here:
[GameHub Live](https://game-hub-eight-steel.vercel.app/login)
## Features

- User authentication using local storage
- Protected routes
- Profile page
- Responsive dark-themed UI
- Smooth gameplay experience

## Games Included

1. Snake Game  
2. Memory Game  
3. Tic Tac Toe  
4. Flappy Bird  

## Tech Stack

- React JS
- Vite
- Tailwind CSS
- React Router DOM
- React Icons
- Vercel App (deployment)

## Project Structure
```
    ├── public/
    ├── src/
    │   ├── gameicons/
    │   ├── games/
    │   │   ├── Assets/
    │   ├── pages/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── App.css
    │   └── index.css
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── tailwind.config.js
    ├── postcss.config.js
    └── vite.config.js
```
##  Installation

### Clone Repository

```
git clone https://github.com/sindhu6547/GameHub.git
```

### Navigate to Project

```
cd GameHub
```

### Install Dependencies

```
npm install
```

### Start Development Server

```
npm run dev
```

Open in browser:

```
http://localhost:5173
```

## Application Flow

1. User signs up or logs in.
2. Dashboard displays available games.
3. Clicking a game opens it inside a protected route.
4. User can navigate back to dashboard.
5. Profile page displays stored user details.


## Future Improvements

- Add leaderboard system
- Store high scores permanently
- Add sound effects
- Improve animations
- Deploy application online
- Add backend authentication

## Author

Kalagotla Sindhuja

## License

This project is created for educational and learning purposes.
