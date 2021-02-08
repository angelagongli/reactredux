import React from 'react';
import Board from "./components/Board";
import MoveHistory from "./components/MoveHistory";
import GameHistory from "./components/GameHistory";
import "./assets/css/style.css";

function App() {
  return (
    <div className="App">
      <Board />
      <MoveHistory />
      <GameHistory />
    </div>
  );
}

export default App;
