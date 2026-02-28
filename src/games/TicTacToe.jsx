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
    titleRef.current.innerHTML = `Congrats! ${
      winner === "X"
        ? `<img src="${cross}" class="inline h-10 ml-2"/>`
        : `<img src="${circle}" class="inline h-10 ml-2"/>`
    }`;
  };

  const reset = () => {
    setBoard(Array(9).fill(""));
    setIsXTurn(true);
    setLock(false);
    titleRef.current.innerHTML = "Tic Tac Toe";
  };

  return (
    <div className=" bg-slate-900 text-white">
          <GameLayout ></GameLayout>
    <section className="bg-[#0f1b21] min-h-screen flex items-center justify-center">
      <div className="text-center p-4">
        <h1
          className="text-5xl font-bold text-white mb-6"
          ref={titleRef}
        >
          Tic Tac Toe
        </h1>

        <div className="grid grid-cols-3 gap-2">
          {board.map((value, index) => (
            <div
              key={index}
              onClick={() => toggle(index)}
              className="bg-slate-800 rounded-md h-40 w-40 flex items-center justify-center cursor-pointer"
            >
              {value === "X" && <img src={cross} className="h-20" />}
              {value === "O" && <img src={circle} className="h-20" />}
            </div>
          ))}
        </div>

        <button
          onClick={reset}
          className="mt-8 px-6 py-2 bg-[#1f3540] text-white text-lg rounded-lg"
        >
          Reset
        </button>
      </div>
    </section>
   </div>
  );
};

export default Tictactoe;
