import React, { useEffect, useState } from "react";
import GameLayout from "../pages/GameLayout";
import birdImg from "./Assets/bird.png";
import pipeImg from "./Assets/pipe.png";
import bgImg from "./Assets/background.png";

const FlappyBird = () => {
  const [birdY, setBirdY] = useState(250);
  const [velocity, setVelocity] = useState(0);
  const [pipeX, setPipeX] = useState(600);
  const [gapY, setGapY] = useState(200);
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const GAME_HEIGHT = 700;
  const GAME_WIDTH = 900;
  const GRAVITY = 0.5;
  const JUMP = -9;
  const PIPE_SPEED = 4;
  const GAP_HEIGHT = 160;

  const startGame = () => {
    setBirdY(250);
    setVelocity(0);
    setPipeX(700);
    setGapY(Math.random() * 300);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  // Jump
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space" && isPlaying) {
        setVelocity(JUMP);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isPlaying]);

  // Game Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setBirdY((prev) => prev + velocity);
      setVelocity((prev) => prev + GRAVITY);

      setPipeX((prev) => {
        if (prev < -80) {
          setScore((s) => s + 1);
          setGapY(Math.random() * 300);
          return GAME_WIDTH;
        }
        return prev - PIPE_SPEED;
      });

      // Collision
      if (
        birdY < 0 ||
        birdY > GAME_HEIGHT - 40 ||
        (pipeX < 120 &&
          pipeX > 20 &&
          (birdY < gapY || birdY > gapY + GAP_HEIGHT))
      ) {
        setGameOver(true);
        setIsPlaying(false);
      }
    }, 20);

    return () => clearInterval(interval);
  }, [isPlaying, velocity, birdY, pipeX, gapY]);

  return (
    <div className="min-h-screen bg-slate-900 flex text-white flex-col">
      <GameLayout />

      <div className="flex flex-1 items-center justify-center">
        <div
          className="relative rounded-xl overflow-hidden shadow-2xl border border-slate-700"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT, backgroundImage: `url(${bgImg})`, backgroundSize: "cover", backgroundPosition: "center", }}
        >
          {/* Bird */}
          <img src={birdImg} alt="bird" className="absolute transition-transform" style={{ width: 60, left: 60,top: birdY,  }}
          />

          {/* Pipes */}
          <img src={pipeImg} alt="pipe" className="absolute" style={{ width: 80, height: gapY, left: pipeX, top: 0, objectFit: "cover", }}
          />

          <img src={pipeImg} alt="pipe "className="absolute" style={{ width: 80, height: GAME_HEIGHT - gapY - GAP_HEIGHT, left: pipeX,bottom: 0, transform: "rotate(180deg)",objectFit: "cover",}}
          />

          {/* Score */}
          <div className="absolute top-4 left-4 text-white text-2xl font-bold">
            Score: {score}
          </div>

          {/* Start / Game Over Screen */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <button
                onClick={startGame}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg text-lg hover:bg-indigo-700"
              >
                {gameOver ? "Play Again" : "Start Game"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlappyBird;           