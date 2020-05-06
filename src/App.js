import React from "react";

import CardOverview from "./components/card-overview/card-overview.component";
import StartMenu from "./components/start-menu/start-menu.component";

import { cards } from "./data";

import "./App.scss";

class App extends React.Component {
  state = {
    gameIsRunning: false,
    gameIsOver: false,
    playerTwoTurn: false,
    score: {
      playerOne: 0,
      playerTwo: 0,
    },
    players: 1, // 1 || 2
    difficulty: 1, // 0 = Easy, 1 = Normal, 2 = Hard
    firstCard: null,
    secondCard: null,

    cards: cards,
  };

  componentDidMount() {
    const { cards } = this.state;

    const shuffledCards = cards.map((card) => {
      return {
        ...card,
        order: Math.floor(Math.random() * cards.length),
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

  resetGameStats = () => {
    const { cards } = this.state;

    const shuffledCards = cards.map((card) => {
      return {
        ...card,
        order: Math.floor(Math.random() * cards.length),
        flipped: false,
      };
    });

    this.setState({
      ...this.state,
      gameIsRunning: false,
      playerTwoTurn: false,
      score: {
        playerOne: 0,
        playerTwo: 0,
      },
      players: 1, // 1 || 2
      difficulty: 1, // 0 = Easy, 1 = Normal, 2 = Hard
      firstCard: null,
      secondCard: null,
      gameIsOver: false,
      cards: [...shuffledCards],
    });
  };

  playerHandler = (playerNumber) => {
    if (
      this.state.players + playerNumber < 1 ||
      this.state.players + playerNumber > 2
    )
      return;
    this.setState({
      ...this.state,
      players: this.state.players + playerNumber,
    });
  };

  difficultyHandler = (difficulty) => {
    if (
      this.state.difficulty + difficulty < 0 ||
      this.state.difficulty + difficulty > 2
    )
      return;
    this.setState({
      ...this.state,
      difficulty: this.state.difficulty + difficulty,
    });
  };

  resetFirstAndSecondCard = () => {
    const state = { ...this.state };

    state.firstCard = null;
    state.secondCard = null;

    this.setState({
      ...state,
    });
  };

  checkWinner = (scorePlayerOne, scorePlayerTwo) => {
    let total = scorePlayerOne + scorePlayerTwo;
    let checkSum =
      this.state.difficulty === 0
        ? this.state.cards.length / 6 // 3
        : this.state.difficulty === 1
        ? this.state.cards.length / 3 // 6
        : this.state.cards.length / 2; // 9

    if (total === checkSum) {
      return true;
    }
    return false;
  };

  flipHandler = (id) => {
    const state = { ...this.state };
    if (state.cards[id].flipped) return;

    if (state.firstCard === null) {
      state.cards[id].flipped = true;
      return this.setState({
        ...state,
        firstCard: { ...state.cards[id] },
      });
    }

    if (
      state.firstCard !== null &&
      state.secondCard === null &&
      id !== state.firstCard.id
    ) {
      state.cards[id].flipped = true;
      state.secondCard = { ...state.cards[id] };
    }

    // checkMatch
    if (state.firstCard.name === state.secondCard.name) {
      // clean first and secound, score + 1
      if (this.state.playerTwoTurn) {
        state.score.playerTwo += 1;
      } else {
        state.score.playerOne += 1;
      }
    } else {
      // set flipped to false
      setTimeout(() => {
        state.cards[state.firstCard.id].flipped = false;
        state.cards[state.secondCard.id].flipped = false;
        // if (state.players === 2) state.playerTwoTurn = !state.playerTwoTurn;

        this.setState({
          ...state,
          playerTwoTurn:
            state.players === 2 ? !state.playerTwoTurn : state.playerTwoTurn,
          firstCard: null,
          secondCard: null,
        });
      }, 750);
    }

    this.setState({
      ...state,
      firstCard: null,
      secondCard: null,
      gameIsOver: this.checkWinner(
        state.score.playerOne,
        state.score.playerTwo
      ),
    });
  };

  render() {
    const {
      gameIsRunning,
      players,
      difficulty,
      cards,
      score,
      gameIsOver,
    } = this.state;

    let cardValue =
      difficulty === 0
        ? cards.length - 12
        : difficulty === 1
        ? cards.length - 6
        : cards.length;

    let evaluateWinner = () => {
      if (players === 1) return <h1>You finished the game!</h1>;
      if (score.playerOne === score.playerTwo) return <h1>It´s a draw!</h1>;
      if (score.playerOne > score.playerTwo) return <h1>Player one won!</h1>;
      if (score.playerTwo > score.playerOne) return <h1>Player two won!</h1>;
    };

    return (
      <div className="App">
        {gameIsRunning ? (
          gameIsOver ? (
            <React.Fragment>
              {evaluateWinner()}
              <p>Go back to</p>
              <button onClick={this.resetGameStats}>Main Menu</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className={players === 2 ? "score" : "score hide"}>
                <h1 className="player-one">Player One: {score.playerOne}</h1>
                <h4>
                  {!this.state.playerTwoTurn
                    ? "Player One, it`s your turn!"
                    : "Player Two, it`s your turn!"}
                </h4>
                <h1 className="player-two">Player Two: {score.playerTwo}</h1>
              </div>
              <CardOverview
                flipHandler={this.flipHandler}
                cards={cards.slice(0, cardValue)}
                difficulty={difficulty}
              />
            </React.Fragment>
          )
        ) : (
          <StartMenu
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
