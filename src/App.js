import React from 'react';

import Game from './pages/game/game.component';
import Start from './pages/start/start.component';

import Angular from './assets/angular.svg';
import Vue from './assets/vue.svg';
import Ember from './assets/ember.svg';
import Aurelia from './assets/aurelia.svg';
import Backbone from './assets/backbone.svg';
import ReactBadge from './assets/react.svg';

import './App.scss';

class App extends React.Component {
	state = {
		gameIsRunning: false,
		playerTwoTurn: false,
		score: {
			playerOne: 0,
			playerTwo: 0
		},
		players: 1, // 1 || 2
		difficulty: 1, // 0 = Easy, 1 = Normal, 2 = Hard
		firstCard: null,
		secondCard: null,
		cards: [
			{
				id: 0,
				name: 'Angular',
				img: Angular,
				flipped: false
			},
			{
				id: 1,
				name: 'Angular',
				img: Angular,
				flipped: false
			},
			{
				id: 2,
				name: 'Aurelia',
				img: Aurelia,
				flipped: false
			},
			{
				id: 3,
				name: 'Aurelia',
				img: Aurelia,
				flipped: false
			},
			{
				id: 4,
				name: 'Backbone',
				img: Backbone,
				flipped: false
			},
			{
				id: 5,
				name: 'Backbone',
				img: Backbone,
				flipped: false
			},
			{
				id: 6,
				name: 'Ember',
				img: Ember,
				flipped: false
			},
			{
				id: 7,
				name: 'Ember',
				img: Ember,
				flipped: false
			},
			{
				id: 8,
				name: 'React',
				img: ReactBadge,
				flipped: false
			},
			{
				id: 9,
				name: 'React',
				img: ReactBadge,
				flipped: false
			},
			{
				id: 10,
				name: 'Vue',
				img: Vue,
				flipped: false
			},
			{
				id: 11,
				name: 'Vue',
				img: Vue,
				flipped: false
			}
		]
	};

	componentDidMount() {
		const { cards } = this.state;

		const shuffledCards = cards.map((card) => {
			return {
				...card,
				order: Math.floor(Math.random() * cards.length)
			};
		});

		this.setState({
			...this.state,
			cards: [ ...shuffledCards ]
		});
	}

	startGameHandler = () => {
		this.setState({
			...this.state,
			gameIsRunning: !this.state.gameIsRunning
		});
	};

	playerHandler = (playerNumber) => {
		if (this.state.players + playerNumber < 1 || this.state.players + playerNumber > 2) return;
		this.setState({
			...this.state,
			players: this.state.players + playerNumber
		});
	};

	difficultyHandler = (difficulty) => {
		if (this.state.difficulty + difficulty < 0 || this.state.difficulty + difficulty > 2) return;
		this.setState({
			...this.state,
			difficulty: this.state.difficulty + difficulty
		});
	};

	resetFirstAndSecondCard = () => {
		const state = { ...this.state };

		state.firstCard = null;
		state.secondCard = null;

		this.setState({
			...state
		});
	};

	flipHandler = (id) => {
		const state = { ...this.state };

		if (state.cards[id].flipped) {
			return;
		}

		if (state.firstCard === null) {
			state.cards[id].flipped = true;
			state.firstCard = { ...state.cards[id] };
			return this.setState({
				...state
			});
		}

		if (state.firstCard !== null && state.secondCard === null && id !== state.firstCard.id) {
			state.cards[id].flipped = true;
			state.secondCard = { ...state.cards[id] };
		}

		// checkMatch
		if (state.firstCard.name === state.secondCard.name) {
			// clean first and secound, score + 1
			state.firstCard = null;
			state.secondCard = null;
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
				state.playerTwoTurn = !state.playerTwoTurn;
				state.firstCard = null;
				state.secondCard = null;

				this.setState({
					...state
				});
			}, 750);
		}

		this.setState({
			...state
		});
	};

	render() {
		const { gameIsRunning, players, difficulty, cards, score } = this.state;

		let cardValue = difficulty === 0 ? cards.length / 2 : difficulty === 1 ? cards.length / 3 : -cards.length;

		return (
			<div className="App">
				{gameIsRunning ? (
					<React.Fragment>
						<div className={players === 2 ? 'score' : 'score hide'}>
							<h1 className="player-one">Player One: {score.playerOne}</h1>
							<h4>
								{!this.state.playerTwoTurn ? (
									'Player One, it`s your turn!'
								) : (
									'Player Two, it`s your turn!'
								)}
							</h4>
							<h1 className="player-two">Player Two: {score.playerTwo}</h1>
						</div>
						<Game
							flipHandler={this.flipHandler}
							cards={cards.slice(0, -cardValue)}
							difficulty={difficulty}
						/>
					</React.Fragment>
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
