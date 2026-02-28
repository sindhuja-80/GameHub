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

      <div className="relative flex items-center justify-center  border-b border-slate-800">
        <div className="absolute left-1 ">
     <GameLayout></GameLayout></div>

        <h1 className="text-3xl mt-5  font-bold">👤 Profile</h1>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="bg-slate-800 p-10 rounded-2xl shadow-lg w-[350px] text-center">

          <img
            src={profile}
            alt="profile"
            className="w-28 h-28 mx-auto rounded-full border-4 border-blue-500 object-cover"
          />

          <h2 className="text-2xl font-semibold mt-6">{username}</h2>
          <p className="text-slate-400 mt-2">{email}</p>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
            className="mt-8 w-full py-3 bg-red-500 hover:bg-red-400 rounded-xl font-semibold transition"
          >
            Logout
          </button>

        </div>
      </div>

    </div>
  );
}