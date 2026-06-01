import React, { useEffect, useState } from "react";
import GameLayout from "../pages/GameLayout";

const GRID_SIZE = 10;
const TOTAL_CELLS = GRID_SIZE * GRID_SIZE;

const Snakegame = () => {
  const [snake, setSnake] = useState([50]);
  const [direction, setDirection] = useState("RIGHT");
  const [food, setFood] = useState(22);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const getRandomFood = (snakeBody) => {
    let position;
    do {
      position = Math.floor(Math.random() * TOTAL_CELLS);
    } while (snakeBody.includes(position));

    return position;
  };

  useEffect(() => {
    if (gameOver) return;

    const gameInterval = setInterval(() => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        let newHead = head;
        if (direction === "RIGHT") newHead = head + 1;
        if (direction === "LEFT") newHead = head - 1;
        if (direction === "UP") newHead = head - GRID_SIZE;
        if (direction === "DOWN") newHead = head + GRID_SIZE;

        const hitRightWall =
          direction === "RIGHT" && head % GRID_SIZE === GRID_SIZE - 1;

        const hitLeftWall =
          direction === "LEFT" && head % GRID_SIZE === 0;

        const hitTopWall =
          direction === "UP" && head < GRID_SIZE;

        const hitBottomWall =
          direction === "DOWN" &&
          head >= TOTAL_CELLS - GRID_SIZE;

        if (hitRightWall || hitLeftWall || hitTopWall || hitBottomWall) {
          setGameOver(true);
          return prevSnake;
        }

        if (prevSnake.includes(newHead)) {
          setGameOver(true);
          return prevSnake;
        }
        if (newHead === food) {
          setScore((prev) => prev + 1);
          setFood(getRandomFood(prevSnake));
          return [newHead, ...prevSnake];
        }
        return [newHead, ...prevSnake.slice(0, -1)];
      });
    }, 300);

    return () => clearInterval(gameInterval);
  }, [direction, gameOver, food]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowUp" && direction !== "DOWN") setDirection("UP");
      if (e.key === "ArrowDown" && direction !== "UP") setDirection("DOWN");
      if (e.key === "ArrowLeft" && direction !== "RIGHT") setDirection("LEFT");
      if (e.key === "ArrowRight" && direction !== "LEFT") setDirection("RIGHT");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [direction]);

  const handleDirectionChange = (newDir) => {
    if (gameOver) return;
    if (newDir === "UP" && direction !== "DOWN") setDirection("UP");
    if (newDir === "DOWN" && direction !== "UP") setDirection("DOWN");
    if (newDir === "LEFT" && direction !== "RIGHT") setDirection("LEFT");
    if (newDir === "RIGHT" && direction !== "LEFT") setDirection("RIGHT");
  };

  const resetGame = () => {
    setSnake([50]);
    setDirection("RIGHT");
    setScore(0);
    setFood(getRandomFood([50]));
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-white font-sans animate-fade-in">
      <GameLayout title="Snake Game" />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
          <div className="flex justify-between items-center mb-4">
            <span className="text-slate-400 font-semibold text-sm">
              Score: <span className="text-emerald-400 text-lg font-bold">{score}</span>
            </span>
            {gameOver && (
              <span className="text-red-500 font-extrabold text-sm uppercase tracking-wider animate-pulse">
                Game Over
              </span>
            )}
          </div>

          {/* GAME GRID */}
          <div className="grid grid-cols-10 border border-slate-800 bg-slate-950 w-fit mx-auto rounded-xl overflow-hidden shadow-inner p-1">
            {Array.from({ length: TOTAL_CELLS }).map((_, index) => {
              const isHead = snake[0] === index;
              const isBody = snake.includes(index) && !isHead;
              const isFood = index === food;
              return (
                <div
                  key={index}
                  className={`h-6 w-6 sm:h-7 sm:w-7 border border-slate-900/50 transition-all duration-100
                    ${isHead ? "bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[3px] shadow-[0_0_8px_rgba(52,211,153,0.5)]" : ""}
                    ${isBody ? "bg-emerald-600/70 rounded-[2px]" : ""}
                    ${isFood ? "bg-rose-500 rounded-full shadow-[0_0_8px_rgba(244,63,94,0.7)] animate-pulse scale-90" : ""}
                  `}
                />
              );
            })}
          </div>

          {/* VIRTUAL D-PAD CONTROLS */}
          <div className="mt-6 flex flex-col items-center gap-2">
            {/* Up Button */}
            <button
              onClick={() => handleDirectionChange("UP")}
              className="w-12 h-12 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:scale-90 text-sky-400 font-extrabold rounded-xl transition-all duration-100 border border-slate-700 shadow-md"
            >
              ▲
            </button>
            {/* Left & Right Buttons */}
            <div className="flex gap-8">
              <button
                onClick={() => handleDirectionChange("LEFT")}
                className="w-12 h-12 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:scale-90 text-sky-400 font-extrabold rounded-xl transition-all duration-100 border border-slate-700 shadow-md"
              >
                ◀
              </button>
              <button
                onClick={() => handleDirectionChange("RIGHT")}
                className="w-12 h-12 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:scale-90 text-sky-400 font-extrabold rounded-xl transition-all duration-100 border border-slate-700 shadow-md"
              >
                ▶
              </button>
            </div>
            {/* Down Button */}
            <button
              onClick={() => handleDirectionChange("DOWN")}
              className="w-12 h-12 flex items-center justify-center bg-slate-800 hover:bg-slate-700 active:scale-90 text-sky-400 font-extrabold rounded-xl transition-all duration-100 border border-slate-700 shadow-md"
            >
              ▼
            </button>
          </div>

          <button
            onClick={resetGame}
            className="mt-6 w-full bg-emerald-500 text-black py-3 rounded-xl font-bold hover:bg-emerald-400 active:scale-95 transition-all duration-200 text-base"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Snakegame;