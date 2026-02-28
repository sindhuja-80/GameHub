import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false)
  const [error, setError] = useState("");

function handleSignup(e) {
  e.preventDefault();
  setError("");

  // Basic required check
  if (!name || !email || !password || !confirmPassword) {
    setError("All fields are required");
    return;
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    setError("Please enter a valid email address");
    return;
  }

  // Check if email already exists
  const existingUser = JSON.parse(localStorage.getItem("gamehubUser"));
  if (existingUser && existingUser.email === email) {
    setError("Email already registered. Please login.");
    return;
  }

  // Password strength validation
  if (password.length < 8) {
    setError("Password must be at least 8 characters long");
    return;
  }

  if (!/[A-Z]/.test(password)) {
    setError("Password must contain at least one uppercase letter");
    return;
  }

  if (!/[0-9]/.test(password)) {
    setError("Password must contain at least one number");
    return;
  }

  // Confirm password match
  if (password !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  // Save user
  const user = { name, email, password };
  localStorage.setItem("gamehubUser", JSON.stringify(user));
  localStorage.setItem("isLoggedIn", "true");

  navigate("/dashboard");
}

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-white">GameHub</h1>
          <p className="text-slate-400 mt-1">Create your account 🎮</p>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500 text-center">{error}</p>
        )}

        <form onSubmit={handleSignup} className="mt-6 space-y-4">

          <div>
            <label className="text-slate-300 text-sm">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-1 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="text-slate-300 text-sm">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-1 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-sky-500"
            />
          </div>
          <div>
            <label className="text-slate-300 text-sm">Password</label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-sky-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showPassword ?   <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <label className="text-slate-300 text-sm">Confirm Password</label>
          <div className="relative mt-1">  <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-1 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 outline-none focus:border-sky-500"
            />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                {showConfirmPassword ?  <FaEyeSlash /> : <FaEye />}
              </button></div>
          </div>

          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input type="checkbox" className="accent-sky-500" />
            Remember me
          </label>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-sky-500 text-black font-bold hover:bg-sky-400 transition"
          >
            Create Account
          </button>
          <div className="flex items-center gap-3">
            <div className="h-px w-full bg-slate-700"></div>
            <span className="text-slate-400 text-sm">OR</span>
            <div className="h-px w-full bg-slate-700"></div>
          </div>
          <button
            type="button"
            onClick={() => alert("Google signup coming soon ")}
            className="w-full py-3 rounded-xl border border-slate-800 bg-slate-950 text-white font-semibold hover:bg-slate-800 transition"
          >
            Continue with Google
          </button>
        </form>
        <p className="text-slate-400 text-center mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
