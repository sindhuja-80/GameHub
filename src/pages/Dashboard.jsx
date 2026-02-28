import { useNavigate } from "react-router-dom";
import profile from '../gameicons/profile.jpg'
import gamehub from '../gameicons/gamehub.jpg'
import tictactoe from '../gameicons/tictactoeboard.png'
import snake from '../gameicons/snakegame.jpg'
import memory from '../gameicons/memorygame.png'
import bird from "../gameicons/flappygame.png"
export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
     <div className="flex justify-between items-center px-8 py-6">
     <div className="flex flex-row">
       <img src={gamehub} className="w-17 h-14 rounded-full object-cover"></img>
  <h1 className="text-4xl font-bold">
     GameHub 
  </h1>
     </div>
  <img
    src={profile}
    alt="profile"
  onClick={() => navigate("/profile")}
    className="w-12 h-12 rounded-full border-2 border-white cursor-pointer object-cover"
  />
</div>
      
        <div className="flex flex-1 items-center justify-center">
          <div className="grid grid-cols-2 gap-10 place-items-center text-center">
        <button
          onClick={() => navigate('/games/tictactoe')}
          className=" rounded-lg "
        >
           <img src={tictactoe} className="w-24 h-24 rounded-md  object-cover "></img>
            Tic-Tac-Toe
        </button>
        <button
          onClick={() => navigate('/games/snakegame')}
          className="  rounded-lg "
        >
         <img src={snake} className="w-24 h-24 rounded-md  object-cover "></img>
            Snake Game
        </button>
         <button
          onClick={() => navigate('/games/memorygame')}
          className="  rounded-lg text-sm"
        >
         <img src={memory} className="w-24 h-24 rounded-md  object-cover "></img>
           Memory Game
        </button>
        
        <button
          onClick={() => navigate('/games/FlappyGame')}
          className="  rounded-lg text-sm"
        >
         <img src={bird} className="w-24 h-24 rounded-md  object-cover "></img>
           Flappy Bird
        </button>
        

        </div>
      </div>
    </div>
  );
}
 