import React, { Component } from "react";

const Card = (props) => {
  return (
    <div
      onClick={() => props.onClick(props.card.id)}
      className="card grid-item"
      style={{ background: props.color }}
    >
      <h2>{props.card.id}</h2>
    </div>
  );
};

export default Card;
