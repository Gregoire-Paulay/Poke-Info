import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

// Components
import Pagination from "../components/Pagination";
// Function
import Upperfirst from "../assets/function/Upperfirst";
//Types
const pokemonSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(z.object({ name: z.string(), url: z.string() })),
});
type Pokemons = z.infer<typeof pokemonSchema>;

const PokemonList = (): JSX.Element => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Pokemons | null>(null);
  const [offset, setOffset] = useState<number>(0);
  let limit: number = 60;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/?offset=${offset}&limit=${limit}`
        );
        // console.log(response.data);
        const responseDataParsed = pokemonSchema.parse(response.data);
        setData(responseDataParsed);
        setIsLoading(false);
      } catch (error) {
        if (error instanceof ZodError) {
          setError(new Error("Erreur de validation Zod"));
        } else {
          setError(new Error("An error occured !!!"));
        }
      }
    };
    fetchData();
  }, [offset]);

  if (error)
    return (
      <div className="container">
        <div className="error">Error: {error.message}</div>
      </div>
    );
  if (isLoading)
    return (
      <div className="container">
        <div className="loading">
          <HashLoader size={150} color="#6890f0" />
        </div>
      </div>
    );

  return (
    <div className="container">
      <div className="pokeList">
        <h1>List of all Pokemons</h1>
        <div>
          {data?.results.map((pokemon) => {
            const url = pokemon.url.split("/")[6];

            return (
              <button
                className="pokeButton"
                key={pokemon.name}
                onClick={() => {
                  navigate("/pokemon/" + pokemon.name);
                }}
              >
                <p>{Upperfirst(pokemon.name)}</p>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`}
                  alt="Sprites pokémon"
                />
              </button>
            );
          })}
        </div>

        <Pagination
          count={data?.count}
          offset={offset}
          setOffset={setOffset}
          limit={limit}
        />
      </div>
    </div>
  );
};

export default PokemonList;
