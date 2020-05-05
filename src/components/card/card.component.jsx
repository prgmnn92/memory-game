import React from 'react';

import badge from '../../assets/js-badge.svg';

import './card.styles.scss';

const Card = ({ card, flipHandler }) => {
	return (
		<div
			className={card.flipped ? 'card flip' : 'card'}
			onClick={() => flipHandler(card.id)}
			style={{
				order: card.order
			}}
		>
			<img className="front-face" src={card.img} alt={card.name} />
			<img className="back-face" src={badge} alt="JS-Badge" />
		</div>
	);
};

export default Card;
