import { useState } from "react";
import { Card } from "./Card";
import "../styles/game.css";
import trophy from "../images/trophy.png";
import pokeball from "../images/pokeball.png";
import clickSound from "../sound/click.wav";
import errorSound from "../sound/error.wav";
import { usePokemon } from "../hooks/usePokemon";
import { Loading } from "./Loading";

const clickedCards = new Set();

export const Game = () => {
  const [score, setScore] = useState(0);
  const [hasClickedMoreThanOnce, setHasClickedMoreThanOnce] = useState(false);
  const [highScore, setHighScore] = useState(0);

  const [pokemonCards, setPokemonCards, error, loading] = usePokemon();

  //Shuffling cards by just rotating array by a random number
  const shuffleCards = () => {
    const rotatedCards = [];
    const noOfCards = pokemonCards.length;
    const rotateBy = Math.floor(Math.random() * noOfCards) + 1;

    for (let it = 0; it < noOfCards; it++) {
      const rotatedIndex = (it + rotateBy) % noOfCards;
      rotatedCards[rotatedIndex] = pokemonCards[it];
    }
    return rotatedCards;
  };

  const onClick = (id) => {
    if (clickedCards.has(id)) {
      clickedCards.clear();
      setScore(0);
      setHasClickedMoreThanOnce(true);
      new Audio(errorSound).play();
      return;
    }

    clickedCards.add(id);
    const newScore = score + 1;
    const newHighScore = newScore > highScore ? newScore : highScore;
    const rotatedCards = shuffleCards();

    setPokemonCards(rotatedCards);
    setScore(newScore);
    setHighScore(newHighScore);
    hasClickedMoreThanOnce && setHasClickedMoreThanOnce(false);
    new Audio(clickSound).play();
  };

  if (error) {
    return <h1>Something Went Wrong!</h1>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="game-page">
      <div className="header">
        <div className="header-text">
          <div className="game-name-logo">
            <img className="game-logo" src={pokeball} />
            <h1> Pokemon Memory Game</h1>
          </div>

          {hasClickedMoreThanOnce && (
            <p className="error">
              You clicked on a pokemon more than once
              <br />
              Click on any pokemon to restart
            </p>
          )}
        </div>
        <div className="header-score">
          <p>Score: {score}</p>
          <p>
            High Score: <img className="trophy-logo" src={trophy} /> {highScore}
          </p>
        </div>
        <p
          style={{ textAlign: "center" }}
        >{`${score}/${pokemonCards.length}`}</p>
      </div>
      <div className="cards">
        {pokemonCards.map((pokemon) => {
          return (
            <Card
              key={pokemon.id}
              id={pokemon.id}
              name={pokemon.name}
              imageUrl={pokemon.imageUrl}
              onClick={onClick}
            />
          );
        })}
      </div>
    </div>
  );
};
