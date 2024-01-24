import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "./Card";

const apiUrl = "https://pokeapi.co/api/v2/pokemon";
const imageUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";
const clickedCards = new Set();

export const Game = () => {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [score, setScore] = useState(0);
  const [hasClickedMoreThanOnce,setHasClickedMoreThanOnce] = useState(false);
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
      return;
    }

    clickedCards.add(id);
    const newScore = score + 1;
    const newHighScore = newScore > highScore ? newScore : highScore;

    const noOfCards = pokemonCards.length;
    const rotateBy = Math.floor(Math.random() * noOfCards);

    const rotatedCards = [];

    for (let it = 0; it < noOfCards; it++) {
      const rotatedIndex = (it + rotateBy) % noOfCards;
      rotatedCards[rotatedIndex] = pokemonCards[it];
    }

    setPokemonCards(rotatedCards);
    setScore(newScore);
    setHighScore(newHighScore);
    setHasClickedMoreThanOnce(false);
  };

  return (
    <div className="game-page">
      <div className="header">
        <h1>Pokemon Memory Game</h1>
        <p>
          Get points by clicking on an pokemon but don't click on any more than
          once!
        </p>
        {hasClickedMoreThanOnce && <p>You clicked a pokemon more than once</p>}
        <div>Score: {score}</div>
        <div>High Score: {highScore}</div>
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
