import { useNavigate } from "react-router-dom";

export default function GameLayout({ children, title }) {
  const navigate = useNavigate();

  return (
  
    <div className="relative flex items-center justify-center py-6">
  <button
    onClick={() => navigate("/dashboard")}
    className="absolute left-7 top-4 w-20 h-10 bg-slate-700 hover:bg-slate-600 rounded-lg"
  >
    ← Back
  </button>
</div>
  );
}