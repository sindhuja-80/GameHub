import { useNavigate } from "react-router-dom";

export default function GameLayout({ title }) {
  const navigate = useNavigate();

  return (
    <header className="w-full flex items-center justify-between px-4 py-3 sm:px-8 sm:py-4 border-b border-slate-900 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50">
      <button
        onClick={() => navigate("/dashboard")}
        className="flex items-center gap-1 px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-lg transition duration-200 text-xs sm:text-sm font-semibold border border-slate-800"
      >
        ← Back
      </button>
      {title && (
        <h1 className="text-lg sm:text-2xl font-extrabold tracking-tight bg-gradient-to-r from-sky-400 to-indigo-400 bg-clip-text text-transparent">
          {title}
        </h1>
      )}
      <div className="w-16 sm:w-20" /> {/* Spacer to balance the Back button for centering */}
    </header>
  );
}