import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";
import "../styles/game.css";
import trophy from "../images/trophy.png";
import pokeball from "../images/pokeball.png";
import click from "../sound/click.wav";
import error from "../sound/error.wav";

const apiUrl = "https://pokeapi.co/api/v2/pokemon";
const imageUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
const clickedCards = new Set();

export const Game = () => {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [score, setScore] = useState(0);
  const [hasClickedMoreThanOnce, setHasClickedMoreThanOnce] = useState(false);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const pokemonList = [];

      const fetchData = async () => {
        const res = await axios.get(apiUrl);
        const pokemons = res.data.results;
        pokemons.forEach((pokemon, index) => {
          const image = `${imageUrl}/${index + 1}.png`;
          pokemonList.push({
            id: index + 1,
            name: pokemon.name,
            imageUrl: image,
          });
        });
        //Important to be here but dont know why
        setPokemonCards(pokemonList);
      };
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, []);

  //Shuffling cards by just rotating array by a random number
  const onClick = (id) => {
    if (clickedCards.has(id)) {
      clickedCards.clear();
      setScore(0);
      setHasClickedMoreThanOnce(true);
      new Audio(error).play();
      return;
    }

    clickedCards.add(id);
    const newScore = score + 1;
    const newHighScore = newScore > highScore ? newScore : highScore;

    const noOfCards = pokemonCards.length;
    const rotateBy = Math.floor(Math.random() * noOfCards) + 1;

    const rotatedCards = [];

    for (let it = 0; it < noOfCards; it++) {
      const rotatedIndex = (it + rotateBy) % noOfCards;
      rotatedCards[rotatedIndex] = pokemonCards[it];
    }

    setPokemonCards(rotatedCards);
    setScore(newScore);
    setHighScore(newHighScore);
    hasClickedMoreThanOnce && setHasClickedMoreThanOnce(false);
    new Audio(click).play();
  };

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
