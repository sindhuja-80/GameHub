import React, { useEffect, useState, useRef } from "react";
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
  const [scale, setScale] = useState(1);

  const containerRef = useRef(null);

  const GAME_HEIGHT = 700;
  const GAME_WIDTH = 900;
  const GRAVITY = 0.5;
  const JUMP = -9;
  const PIPE_SPEED = 4;
  const GAP_HEIGHT = 160;

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parent = containerRef.current.parentElement;
        if (parent) {
          const parentWidth = parent.clientWidth - 32; // padding
          const newScale = Math.min(parentWidth / GAME_WIDTH, 1);
          setScale(newScale);
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startGame = (e) => {
    e.stopPropagation(); // Avoid triggering jump immediately on click
    setBirdY(250);
    setVelocity(0);
    setPipeX(700);
    setGapY(Math.random() * 300 + 100);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  const jump = () => {
    if (isPlaying) {
      setVelocity(JUMP);
    }
  };

  // Jump on Space
  useEffect(() => {
    const handleKey = (e) => {
      if (e.code === "Space" && isPlaying) {
        e.preventDefault();
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
          setGapY(Math.random() * 300 + 100); // add padding so it doesn't spawn at extreme edges
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

  const containerHeight = GAME_HEIGHT * scale;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col text-white font-sans select-none">
      <GameLayout title="Flappy Bird" />

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Helper Hint */}
        <p className="text-slate-400 text-xs sm:text-sm mb-4 text-center">
          Press <kbd className="px-2 py-0.5 bg-slate-800 rounded border border-slate-700 text-white text-xs">Space</kbd> or <span className="text-sky-400 font-semibold">Tap/Click the Screen</span> to jump
        </p>

        {/* Scaled Game Container Wrapper */}
        <div
          ref={containerRef}
          className="flex items-center justify-center overflow-hidden rounded-xl border border-slate-800 bg-slate-900 shadow-2xl touch-none"
          style={{ width: GAME_WIDTH * scale, height: containerHeight }}
        >
          {/* Internal Game Engine Box */}
          <div
            onClick={jump}
            className={`relative origin-center transition-transform duration-75 ${isPlaying ? "cursor-pointer" : ""}`}
            style={{
              width: GAME_WIDTH,
              height: GAME_HEIGHT,
              transform: `scale(${scale})`,
              backgroundImage: `url(${bgImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Bird */}
            <img
              src={birdImg}
              alt="bird"
              className="absolute transition-transform"
              style={{
                width: 60,
                left: 60,
                top: birdY,
                transform: `rotate(${Math.min(Math.max(velocity * 3, -30), 70)}deg)`,
              }}
            />

            {/* Top Pipe */}
            <img
              src={pipeImg}
              alt="pipe"
              className="absolute"
              style={{
                width: 80,
                height: gapY,
                left: pipeX,
                top: 0,
                objectFit: "cover",
                transform: "rotate(180deg)",
              }}
            />

            {/* Bottom Pipe */}
            <img
              src={pipeImg}
              alt="pipe"
              className="absolute"
              style={{
                width: 80,
                height: GAME_HEIGHT - gapY - GAP_HEIGHT,
                left: pipeX,
                bottom: 0,
                objectFit: "cover",
              }}
            />

            {/* Score Overlay */}
            <div className="absolute top-6 left-6 text-white text-3xl font-extrabold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              {score}
            </div>

            {/* Start / Game Over Screen Overlay */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <div className="text-center p-8 bg-slate-900/90 border border-slate-800 rounded-2xl max-w-xs shadow-2xl mx-4">
                  {gameOver ? (
                    <>
                      <h2 className="text-3xl font-black text-rose-500 mb-2">GAME OVER</h2>
                      <p className="text-slate-400 mb-6 text-sm">You crashed! Score: <span className="text-white font-bold">{score}</span></p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-3xl font-black text-white mb-2">Flappy Bird</h2>
                      <p className="text-slate-400 mb-6 text-sm">Flap and fly as far as you can through the pipes.</p>
                    </>
                  )}
                  <button
                    onClick={startGame}
                    className="w-full py-3 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded-xl transition duration-200 shadow-lg transform hover:scale-105 active:scale-95 text-base"
                  >
                    {gameOver ? "Play Again" : "Start Game"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlappyBird;