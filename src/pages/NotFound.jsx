import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white text-center px-6">
      
      <h1 className="text-7xl font-bold text-indigo-500 mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-2">
        Page Not Found
      </h2>

      <p className="text-slate-400 mb-6 max-w-md">
        The page you are looking for doesn’t exist or may have been moved.
      </p>

      <button
        onClick={() => navigate("/dashboard")}
        className="px-6 py-3 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition"
      >
        Back to Dashboard
      </button>
      
    </div>
  );
}

export default NotFound;