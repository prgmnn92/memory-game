import React from "react";

import Game from "./pages/game/game.component";
import Start from "./pages/start/start.component";

import Angular from "./assets/angular.svg";
import Vue from "./assets/vue.svg";
import Ember from "./assets/ember.svg";
import Aurelia from "./assets/aurelia.svg";
import Backbone from "./assets/backbone.svg";
import ReactBadge from "./assets/react.svg";

import "./App.scss";

class App extends React.Component {
  state = {
    gameIsRunning: false,
    playerTwoTurn: false,
    score: {
      playerOne: 0,
      playerTwo: 0,
    },
    players: 1, // 1 || 2
    difficulty: 0, // 0 = Easy, 1 = Normal, 2 = Hard
    firstCard: null,
    secondCard: null,
    cards: [
      {
        id: 0,
        name: "Angular",
        img: Angular,
        flipped: false,
      },
      {
        id: 1,
        name: "Angular",
        img: Angular,
        flipped: false,
      },
      {
        id: 2,
        name: "Aurelia",
        img: Aurelia,
        flipped: false,
      },
      {
        id: 3,
        name: "Aurelia",
        img: Aurelia,
        flipped: false,
      },
      {
        id: 4,
        name: "Backbone",
        img: Backbone,
        flipped: false,
      },
      {
        id: 5,
        name: "Backbone",
        img: Backbone,
        flipped: false,
      },
      {
        id: 6,
        name: "Ember",
        img: Ember,
        flipped: false,
      },
      {
        id: 7,
        name: "Ember",
        img: Ember,
        flipped: false,
      },
      {
        id: 8,
        name: "React",
        img: ReactBadge,
        flipped: false,
      },
      {
        id: 9,
        name: "React",
        img: ReactBadge,
        flipped: false,
      },
      {
        id: 10,
        name: "Vue",
        img: Vue,
        flipped: false,
      },
      {
        id: 11,
        name: "Vue",
        img: Vue,
        flipped: false,
      },
    ],
  };

  componentDidMount() {
    const { cards } = this.state;

    const shuffledCards = cards.map((card) => {
      return {
        ...card,
        order: Math.floor(Math.random() * 12),
      };
    });

    this.setState({
      ...this.state,
      cards: [...shuffledCards],
    });
  }

  startGameHandler = () => {
    this.setState({
      ...this.state,
      gameIsRunning: !this.state.gameIsRunning,
    });
  };

  turnHandler = () => {
    this.setState({
      ...this.state,
      playerTwoTurn: !this.state.playerTwoTurn,
    });
  };

  playerHandler = (playerNumber) => {
    if (this.state.players === 2 && playerNumber === -1) {
      this.setState({
        ...this.state,
        players: this.state.players - 1,
      });
    }
    if (this.state.players === 1 && playerNumber === 1) {
      this.setState({
        ...this.state,
        players: this.state.players + 1,
      });
    }
  };

  difficultyHandler = (difficulty) => {
    const oldState = { ...this.state };
    let newDif = oldState.difficulty + difficulty;
    if (newDif <= 3 && newDif >= 0) {
      this.setState({
        ...this.state,
        difficulty: newDif,
      });
    }
  };

  scoreHandler = (score) => {
    this.setState({
      ...this.state,
      score: score,
    });
  };

  checkMatch = async () => {};

  flipHandler = (id) => {
    const state = { ...this.state };

    console.log(state);

    if (state.cards[id].flipped) {
      console.log("RETURN");

      return;
    }

    if (state.firstCard === null) {
      console.log("FIRST");

      state.cards[id].flipped = true;
      state.firstCard = { ...state.cards[id] };

      return this.setState({
        ...state,
      });
    }

    if (
      state.firstCard !== null &&
      state.secondCard === null &&
      id !== state.firstCard.id
    ) {
      console.log("SECOND");

      state.cards[id].flipped = true;
      state.secondCard = { ...state.cards[id] };

      // checkMatch

      if (state.firstCard.name === state.secondCard.name) {
        // clean first and secound, score + 1
        state.firstCard = null;
        state.secondCard = null;
        console.log("MATCH");

        state.score.playerOne += 1;
      } else {
        // set flipped to false
        console.log("DONT MATCH");

        state.cards[state.firstCard.id].flipped = false;
        state.cards[state.secondCard.id].flipped = false;

        state.firstCard = null;
        state.secondCard = null;
      }
    }

    this.setState({
      ...state,
    });
  };

  render() {
    const { gameIsRunning, players, difficulty, cards } = this.state;
    const gameVariant = () => {
      return players >= 2 ? (
        <Game
          difficulty={difficulty}
          TwoPlayers={true}
          turn={this.turnHandler}
          score={this.scoreHandler}
          cards={cards}
        />
      ) : (
        <Game
          cards={cards}
          difficulty={difficulty}
          TwoPlayers={false}
          score={this.scoreHandler}
        />
      );
    };
    return (
      <div className="App">
        {gameIsRunning ? (
          <Game
            flipHandler={this.flipHandler}
            cards={cards}
            difficulty={difficulty}
            TwoPlayers={false}
            score={this.scoreHandler}
          />
        ) : (
          <Start
            startGame={this.startGameHandler}
            setPlayers={this.playerHandler}
            setDifficulty={this.difficultyHandler}
            players={players}
            difficulty={difficulty}
          />
        )}
      </div>
    );
  }
}

export default App;
