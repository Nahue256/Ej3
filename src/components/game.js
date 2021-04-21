import React, { Component } from "react";
import Cards from "../data/data";
import Card from "./Card";
import moment from "moment";

class Game extends Component {
  state = {
    startTime: null,
    cards: Cards,
    counter: 0,
    validCards: [],
    pair: [],
    errorCounter: 0,
  };

  ShowCard = (id) => {
    var cards = this.state.cards;
    cards[id - 1].hidden = cards[id - 1].hidden === false ? true : false;
    this.setState({ cards });
  };

  IncrementCounter(id) {
    var pair = this.state.pair;
    pair.push(id);
    this.setState({ pair });
  }

  IncrementErrorCounter() {
    var errorCounter = this.state.errorCounter;
    errorCounter = errorCounter + 1;
    this.setState({ errorCounter });
  }

  CheckPair() {
    console.log("checking pair");
    if (
      this.state.cards[this.state.pair[0] - 1].color ===
      this.state.cards[this.state.pair[1] - 1].color
    ) {
      window.alert("los colores son iguales");
      this.SaveValidCards(this.state.pair[0], this.state.pair[1]);
    } else {
      window.alert("los colores no son iguales");
      this.IncrementErrorCounter();
      this.HideCards();
    }
  }

  ResetPair() {
    var pair = [];
    this.setState({ pair });
  }

  SaveValidCards(id1, id2) {
    var validCards = this.state.validCards;
    validCards.push(id1);
    validCards.push(id2);
    this.setState({ validCards });
  }

  HideCards() {
    var cards = this.state.cards;
    cards[this.state.pair[0] - 1].hidden = true;
    cards[this.state.pair[1] - 1].hidden = true;
    this.setState({ cards });
  }

  CalculateTime = () => {
    var today = new Date();
    var date =
      today.getFullYear() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getDate();
    var time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + " " + time;
    return dateTime;
  };

  SetTime = () => {
    if (this.state.startTime == null) {
      var startTime = this.state.startTime;
      startTime = this.CalculateTime();
      this.setState({ startTime });
    }
  };

  HandleClick = (id) => {
    console.log(id);
    this.SetTime();
    if (!this.state.pair.includes(id) && !this.state.validCards.includes(id)) {
      // Si el usuario clickea una carta ya clickeada o ya valida, no hace nada
      this.ShowCard(id);
      this.IncrementCounter(id);
      if (this.state.pair.length === 2) {
        this.CheckPair();
        this.ResetPair();
      }
    }
    console.log("validCards: ", this.state.validCards.length);
    if (this.state.validCards.length == 16) {
      // Si el juego termina, te muestra el tiempo pasado y los errores
      var endTime = this.CalculateTime();
      var elapsedTime = moment
        .utc(
          moment(endTime, "DD/MM/YYYY HH:mm:ss").diff(
            moment(this.state.startTime, "DD/MM/YYYY HH:mm:ss")
          )
        )
        .format("HH:mm:ss");
      window.alert(
        "Juego terminado! tiempo transcurrido: " +
          elapsedTime +
          "| Errores: " +
          this.state.errorCounter
      );
    }
  };

  GetClass(id) {
    return "card grid-item";
  }

  render() {
    return (
      <div className="grid-container" style={{ border: "1px solid #000" }}>
        {this.state.cards.map((card) => (
          <Card
            onClick={this.HandleClick}
            key={card.id}
            card={card}
            class={this.GetClass}
            color={card.hidden === true ? "black" : card.color}
          />
        ))}
      </div>
    );
  }
}

export default Game;
