import React from "react";

import Card from "../card/card.component";
import "./card-overview.styles.scss";

const CardOverview = ({ difficulty, cards, flipHandler }) => {
  return (
    <div className="card-overview">
      {cards.map((card) => (
        <Card flipHandler={flipHandler} key={card.id} card={card} />
      ))}
    </div>
  );
};

export default CardOverview;
