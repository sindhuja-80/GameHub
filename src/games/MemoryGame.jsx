import React, { useEffect, useState,useNavigate } from "react";
import GameLayout from "../pages/GameLayout";
const icons = [
  "🍎", "🍌", "🍇", "🍓",
  "🍒", "🍉", "🍍", "🥝",
];
 function generateCards(){
    return [...icons,...icons]
    .sort(()=>Math.random()-0.5)
    .map((icon,index)=>({
      id:index,
      icon:icon,
      matched:false
    }))
  }
const Memorygame = () => {
  const [cards,setCards]=useState(generateCards());
  const[first,setFirst]=useState(null)
  const [second,setSecond]=useState(null)
  const [disabled,setDisabled]=useState(false)
  const [score,setScore]=useState(0)
  const [completed,setCompleted]=useState(false)


  function handleClick(card){
    if(disabled) return;
    if(card.matched) return;
   if (card === first) return;

if (first) {
  setSecond(card);
} else {
  setFirst(card);
}

  }
  function resetTurn(){
    setFirst(null)
    setSecond(null)
    setDisabled(false)

  }
  function restartGame(){
    setCards(generateCards())
    setScore(0)
    setCompleted(false)
    resetTurn()
  }
  useEffect(()=>{
    if(!first || !second){
      return
    }
    if(first.icon === second.icon){
      setScore(prev=>prev+10)
      setCards(prev=>
        prev.map(card => 
          card.icon===first.icon ? {...card,matched:true}
        :card))
        resetTurn()       
    }
     else{
          setTimeout(resetTurn,700)
        }
  },[first,second])
  useEffect(()=>{
    if(cards.every(card=>card.matched)){
      setCompleted(true)
      setDisabled(true);
    }
  },[cards])
 
  return (
    <div className="bg-gray-900 text-white"> <GameLayout >
    </GameLayout>
    <div className="min-h-screen  flex flex-col items-center justify-center" >
       
      <h1 className="text-3xl font-bold mb-2">Memory Game</h1>
      <p className="mb-4 text-xl">Score: <span className="text-green-200">{score}</span></p>
      
      {completed ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-green-200 mb-4">Game Completed</h2>
        
        <button onClick={restartGame} className="px-5 py-2 bg-indigo-600 rounded hover:bg-indigo-700">Play Again</button>
     </div>
      ):(
        <div className="grid grid-cols-4 gap-4">
          {cards.map(card=>{
            const flipped=
            card===first || card===second || card.matched
            return(
              <div key={card.id}
              onClick={()=>handleClick(card)}
              className={`w-24 h-24 rounded-lg cursor-pointer flex items-center justify-center text-4xl transition-all duration-300 ${
                card.matched ?"opacity-0 scale-75 pointer-events-none" : flipped ?"bg-green-800 scale-100" : "bg-indigo-700 scale-100"}`}>{flipped ? card.icon :"❓"}</div>
            )
          })}
        </div>
      )}
    </div>
    </div>
  )
}

export default Memorygame
