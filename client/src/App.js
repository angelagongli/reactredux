import React, { useState } from 'react';
import Board from "./components/Board";
import MoveHistory from "./components/MoveHistory";
import GameHistory from "./components/GameHistory";
import "./assets/css/style.css";

function App() {
  const [moveToReturn, setMoveToReturn] = useState({});
  const [moveSubmission, setMoveSubmission] = useState({});
  
  function pullMoveSubmission(move) {
    console.log("Move submission: " + JSON.stringify(move));
    setMoveSubmission(move);
  }
  
  function pullMoveToReturn(move) {
    console.log("Move to return: " + JSON.stringify(move));
    setMoveToReturn(move);
  }
  
  return (
    <div className="App">
      <Board pullMoveSubmission={pullMoveSubmission} moveToReturn={moveToReturn} />
      <MoveHistory pullMoveToReturn={pullMoveToReturn} moveSubmission={moveSubmission} />
      <GameHistory />
    </div>
  );
}

export default App;
