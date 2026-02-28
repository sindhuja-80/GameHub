 import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import TicTacToe from "./games/TicTacToe.jsx"
import SnakeGame from './games/SnakeGame.jsx'
import Memorygame from "./games/MemoryGame.jsx";
import Profile from "./pages/Profile.jsx";
import FlappyBird from "./games/FlappyBird.jsx";
import NotFound from "./pages/NotFound";

export default function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
        }
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />}
      />
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/dashboard" /> : <Signup />}
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

     
      <Route path="/games">
   <Route path="tictactoe" element={<ProtectedRoute><TicTacToe/></ProtectedRoute>} />
   <Route path="snakegame" element={<ProtectedRoute><SnakeGame/></ProtectedRoute>} />
    <Route path="memorygame" element={<ProtectedRoute><Memorygame/></ProtectedRoute>} />
    <Route path="flappygame" element={<ProtectedRoute><FlappyBird/></ProtectedRoute>}></Route>
    </Route>

<Route path="*" element={<NotFound />} />
    </Routes>
  );
}


