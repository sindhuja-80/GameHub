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

  const resetGame = () => {
    setSnake([50]);
    setDirection("RIGHT");
    setScore(0);
    setFood(getRandomFood([50]));
    setGameOver(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col text-white">
      <GameLayout ></GameLayout>
    <div className=" flex flex-1 items-center justify-center text-black">
      <div className="bg-white p-8  rounded-xl shadow-lg w-80">
        <h1 className="text-3xl   font-bold text-center mb-2 ">
           Snake Game
        </h1>

        <p className="text-center text-indigo-600 font-semibold text-md mb-3">
          Score: {score}
        </p>

        {gameOver && (
          <p className="text-center text-red-500 font-bold text-xl mb-3">
            Game Over
          </p>
        )}

        {/* GAME GRID */}
        <div className="grid grid-cols-10 border bg-slate-50 w-fit">
          {Array.from({ length: TOTAL_CELLS }).map((_, index) => (
            <div
              key={index}
              className={`h-6 w-6 border
                ${snake[0] === index ? "bg-indigo-600" : ""}
                ${
                  snake.includes(index) && snake[0] !== index
                    ? "bg-indigo-400"
                    : ""
                }
                ${index === food ? "bg-rose-500" : ""}
              `}
            />
          ))}
        </div>

        <button
          onClick={resetGame}
          className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Reset Game
        </button>
      </div>
    </div>
    </div>
  );
};

export default Snakegame;