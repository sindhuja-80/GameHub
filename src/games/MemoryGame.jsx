import React, { useEffect, useState } from "react";
import GameLayout from "../pages/GameLayout";

const icons = [
  "🍎", "🍌", "🍇", "🍓",
  "🍒", "🍉", "🍍", "🥝",
];

function generateCards() {
  return [...icons, ...icons]
    .sort(() => Math.random() - 0.5)
    .map((icon, index) => ({
      id: index,
      icon: icon,
      matched: false
    }));
}

const Memorygame = () => {
  const [cards, setCards] = useState(generateCards());
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  function handleClick(card) {
    if (disabled) return;
    if (card.matched) return;
    if (card === first) return;

    if (first) {
      setSecond(card);
    } else {
      setFirst(card);
    }
  }

  function resetTurn() {
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  }

  function restartGame() {
    setCards(generateCards());
    setScore(0);
    setCompleted(false);
    resetTurn();
  }

  useEffect(() => {
    if (!first || !second) {
      return;
    }
    setDisabled(true);
    if (first.icon === second.icon) {
      setScore(prev => prev + 10);
      setCards(prev =>
        prev.map(card =>
          card.icon === first.icon ? { ...card, matched: true } : card
        )
      );
      resetTurn();
    } else {
      setTimeout(resetTurn, 700);
    }
  }, [first, second]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.matched)) {
      setCompleted(true);
      setDisabled(true);
    }
  }, [cards]);

  return (
    <div className="bg-slate-950 text-white min-h-screen flex flex-col font-sans">
      <GameLayout title="Memory Game" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full text-center">
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-400 font-semibold text-sm">
              Score: <span className="text-sky-400 text-lg font-bold">{score}</span>
            </span>
            {completed && (
              <span className="text-emerald-400 font-extrabold text-sm uppercase tracking-wider animate-pulse">
                Completed!
              </span>
            )}
          </div>

          {completed ? (
            <div className="py-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-2">Well Done! 🎉</h2>
              <p className="text-slate-400 text-sm mb-6">You found all pairs with a score of {score}!</p>
              <button
                onClick={restartGame}
                className="w-full bg-sky-500 hover:bg-sky-400 text-black font-bold py-3 rounded-xl shadow-lg transition duration-200 transform hover:scale-105 active:scale-95 text-base"
              >
                Play Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-3 sm:gap-4 justify-items-center">
              {cards.map(card => {
                const flipped = card === first || card === second || card.matched;
                return (
                  <div
                    key={card.id}
                    onClick={() => handleClick(card)}
                    className={`w-16 h-16 sm:w-20 sm:w-20 md:w-24 md:h-24 rounded-xl cursor-pointer flex items-center justify-center text-2xl sm:text-3xl md:text-4xl transition-all duration-300 border shadow-md
                      ${card.matched 
                        ? "opacity-0 scale-75 pointer-events-none border-transparent" 
                        : flipped 
                          ? "bg-emerald-600 border-emerald-500 scale-100" 
                          : "bg-slate-950 hover:bg-slate-800 border-slate-850 hover:border-slate-700 scale-100 active:scale-95"
                      }`}
                  >
                    {flipped ? card.icon : "❓"}
                  </div>
                );
              })}
            </div>
          )}

          {!completed && (
            <button
              onClick={restartGame}
              className="mt-8 w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold py-3 rounded-xl transition duration-200 active:scale-95 text-sm"
            >
              Restart Game
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default Memorygame;
