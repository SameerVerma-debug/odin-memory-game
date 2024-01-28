import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = "https://pokeapi.co/api/v2/pokemon";
const imageUrl =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon";

export const usePokemon = () => {
  const [pokemonCards, setPokemonCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      const pokemonList = [];

      const fetchData = async () => {
        try {
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
          setPokemonCards(pokemonList);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      setTimeout(() => {
        fetchData();
      },500)
      
    }

    return () => {
      ignore = true;
    };
  }, []);

  return [pokemonCards,setPokemonCards,error,loading];
};
