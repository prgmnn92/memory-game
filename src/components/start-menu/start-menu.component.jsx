import React from "react";

import "./start-menu.styles.scss";

const StartMenu = ({
  setPlayers,
  setDifficulty,
  players,
  difficulty,
  startGame,
}) => {
  return (
    <div className="start-menu">
      <h4>Memory Game</h4>
      <div className="start-button" onClick={startGame}>
        Start
      </div>
      <div className="arrow-button">
        <div onClick={() => setPlayers(-1)}>
          <i className="icon fas fa-chevron-left"></i>
        </div>
        <div className="content">{players === 1 ? "1 Player" : "2 Player"}</div>
        <div onClick={() => setPlayers(1)}>
          <i className="icon fas fa-chevron-right"></i>
        </div>
      </div>
      <div className="arrow-button">
        <div onClick={() => setDifficulty(-1)}>
          <i className="icon fas fa-chevron-left"></i>
        </div>
        <div className="content">
          {difficulty === 0 ? "Easy" : difficulty === 1 ? "Normal" : "Hard"}
        </div>
        <div onClick={() => setDifficulty(1)}>
          <i className="icon fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
};

export default StartMenu;
