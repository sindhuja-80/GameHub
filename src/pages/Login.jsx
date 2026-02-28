import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("gamehubUser"));

    if (!storedUser) {
      setError("No account found. Please signup first.");
      return;
    }

    if (
      email !== storedUser.email ||
      password !== storedUser.password
    ) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("isLoggedIn", "true");
    navigate("/dashboard"); 
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">GameHub</h1>
          <p className="text-slate-400 mt-1">Login to continue </p>
        </div>
        <form onSubmit={handleLogin} className="mt-6 space-y-4">
          <div>
            <label className="text-slate-300 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-sky-500"
            />
          </div>

          <div>
            <label className="text-slate-300 text-sm">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-300">
              <input type="checkbox" className="accent-sky-500" />
              Remember me
            </label>
            <button
              type="button"
              onClick={() =>
                alert("Forgot password feature is coming soon 😄")
              }
              className="text-sky-400 hover:underline"
            >
              Forgot password?
            </button>
          </div>
            {error && (
          <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
        )}

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-sky-500 text-black font-bold hover:bg-sky-400 transition"
          >
            Login
          </button>
          <div className="flex items-center gap-3">
            <div className="h-px w-full bg-slate-700"></div>
            <span className="text-slate-400 text-sm">OR</span>
            <div className="h-px w-full bg-slate-700"></div>
          </div>
          <button
            type="button"
            onClick={() => alert("Google login coming soon 😄")}
            className="w-full py-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
          >
            Continue with Google
          </button>
        </form>
        <p className="text-slate-400 text-center mt-5">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-sky-400 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}
