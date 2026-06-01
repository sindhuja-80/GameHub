import { useNavigate } from "react-router-dom";
import profile from "../gameicons/profile.jpg"
import GameLayout from "./GameLayout";

export default function Profile() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("gamehubUser"));

  const username = userData?.name || "No Name";
  const email = userData?.email || "No Email";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <GameLayout title="👤 Profile" />

      <div className="flex flex-1 items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 sm:p-10 rounded-2xl shadow-xl w-full max-w-[380px] text-center">
          <img
            src={profile}
            alt="profile"
            className="w-28 h-28 mx-auto rounded-full border-4 border-sky-500 object-cover shadow-lg"
          />

          <h2 className="text-2xl font-bold mt-6 tracking-tight">{username}</h2>
          <p className="text-slate-400 mt-2 text-sm">{email}</p>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="mt-8 w-full py-3 bg-rose-600 hover:bg-rose-500 rounded-xl font-semibold tracking-wide transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}