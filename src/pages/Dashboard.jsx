import { useNavigate } from "react-router-dom";
import profile from '../gameicons/profile.jpg'
import gamehub from '../gameicons/gamehub.jpg'
import tictactoe from '../gameicons/tictactoeboard.png'
import snake from '../gameicons/snakegame.jpg'
import memory from '../gameicons/memorygame.png'
import bird from "../gameicons/flappygame.png"

export default function Dashboard() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("gamehubUser"));
  const username = userData?.name || "Gamer";

  const games = [
    {
      id: "tictactoe",
      title: "Tic-Tac-Toe",
      description: "Classic 3x3 grid battle. Play with a friend on the same screen!",
      image: tictactoe,
      path: "/games/tictactoe",
      badge: "Classic",
      color: "from-blue-600 to-cyan-500",
    },
    {
      id: "snakegame",
      title: "Snake Game",
      description: "Eat food, grow longer, and avoid crashing into walls or yourself!",
      image: snake,
      path: "/games/snakegame",
      badge: "Retro Arcade",
      color: "from-emerald-600 to-teal-500",
    },
    {
      id: "memorygame",
      title: "Memory Game",
      description: "Flip cards and find matching emoji pairs to test your brain memory.",
      image: memory,
      path: "/games/memorygame",
      badge: "Brain",
      color: "from-purple-600 to-indigo-500",
    },
    {
      id: "flappygame",
      title: "Flappy Bird",
      description: "Flap your wings, navigate through pipes, and score as high as you can!",
      image: bird,
      path: "/games/flappygame",
      badge: "Reaction",
      color: "from-amber-600 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col font-sans">
      {/* Header navbar */}
      <header className="flex justify-between items-center px-6 py-4 md:px-12 md:py-6 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <img src={gamehub} alt="GameHub Logo" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover shadow-lg border border-slate-800" />
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
            GameHub
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block text-sm text-slate-400 font-medium">
            Welcome, <span className="text-sky-400 font-bold">{username}</span>
          </span>
          <img
            src={profile}
            alt="Profile"
            onClick={() => navigate("/profile")}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-sky-500 cursor-pointer object-cover shadow-lg hover:scale-105 transition duration-300"
          />
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-10 md:px-12 flex flex-col justify-center">
        {/* Welcome Section */}
        <div className="text-center md:text-left mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-black mb-3">
            Choose Your <span className="bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">Adventure</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl">
            Select one of our classic built-in games below. Ready to test your reaction, logic, and memory?
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
          {games.map((game) => (
            <div
              key={game.id}
              onClick={() => navigate(game.path)}
              className="group relative flex flex-col justify-between w-full max-w-xs bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-slate-700 hover:shadow-[0_0_30px_-5px_rgba(56,189,248,0.15)] transition duration-300 transform hover:-translate-y-1"
            >
              {/* Card top image container */}
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                {/* Floating badge */}
                <span className="absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 bg-slate-900/90 text-sky-400 rounded-full border border-slate-700/50 backdrop-blur-sm">
                  {game.badge}
                </span>
              </div>

              {/* Card text content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-xl font-bold group-hover:text-sky-400 transition duration-200">
                  {game.title}
                </h3>
                <p className="text-slate-400 text-sm mt-2 leading-relaxed flex-1">
                  {game.description}
                </p>
                
                {/* Bottom interactive row */}
                <div className="mt-5 flex items-center justify-between">
                  <span className={`h-1.5 w-12 rounded-full bg-gradient-to-r ${game.color}`} />
                  <button className="text-xs font-bold text-sky-400 group-hover:text-white flex items-center gap-1 group-hover:underline transition duration-200">
                    Play Now
                    <span className="transform group-hover:translate-x-1 transition duration-200">→</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}