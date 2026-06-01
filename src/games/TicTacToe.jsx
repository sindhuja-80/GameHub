import React, { useState, useRef } from "react";
import circle from "./Assets/circle.png";
import cross from "./Assets/cross.png";
import GameLayout from "../pages/GameLayout";

const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(""));
  const [isXTurn, setIsXTurn] = useState(true);
  const [lock, setLock] = useState(false);
  const titleRef = useRef(null);

  const toggle = (index) => {
    if (lock || board[index] !== "") return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    checkWin(newBoard);
  };

  const checkWin = (data) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (data[a] && data[a] === data[b] && data[b] === data[c]) {
        won(data[a]);
        break;
      }
    }
  };

  const won = (winner) => {
    setLock(true);
    if (titleRef.current) {
      titleRef.current.innerHTML = `Winner: ${
        winner === "X"
          ? `<img src="${cross}" class="inline h-8 ml-2 bg-transparent"/>`
          : `<img src="${circle}" class="inline h-8 ml-2 bg-transparent"/>`
      }`;
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setLock(false);
    if (titleRef.current) {
      titleRef.current.innerHTML = "Tic-Tac-Toe";
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col font-sans">
      <GameLayout title="Tic-Tac-Toe" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-sm w-full">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-white mb-6 flex items-center justify-center gap-2 h-12"
            ref={titleRef}
          >
            Tic-Tac-Toe
          </h2>

          <div className="grid grid-cols-3 gap-3 justify-center justify-items-center">
            {board.map((value, index) => (
              <div
                key={index}
                onClick={() => toggle(index)}
                className="bg-slate-950 border border-slate-800 hover:border-slate-700 rounded-xl w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center cursor-pointer transition duration-200 hover:scale-105 active:scale-95"
              >
                {value === "X" && <img src={cross} className="w-12 h-12 sm:w-14 sm:h-14 object-contain" alt="X" />}
                {value === "O" && <img src={circle} className="w-12 h-12 sm:w-14 sm:h-14 object-contain" alt="O" />}
              </div>
            ))}
          </div>

          <button
            onClick={reset}
            className="mt-8 px-8 py-3 bg-sky-500 hover:bg-sky-400 text-black font-bold rounded-xl shadow-lg transition duration-200 transform hover:scale-105 active:scale-95 w-full text-base"
          >
            Reset Game
          </button>
        </div>
      </main>
    </div>
  );
};

export default Tictactoe;
