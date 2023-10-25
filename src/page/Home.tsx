import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

// Components
import Pagination from "../components/Pagination";

//Types
const pokemonSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(z.object({ name: z.string(), url: z.string() })),
});
type Pokemons = z.infer<typeof pokemonSchema>;

const Home = (): JSX.Element => {
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
          `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
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
      <div>
        {data?.results.map((pokemon) => {
          const url = pokemon.url.split("/")[6];

          return (
            <button
              key={pokemon.name}
              onClick={() => {
                navigate("/pokemon/" + pokemon.name);
              }}
            >
              <div>{pokemon.name}</div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`}
                alt="Sprites pokémon"
              />
            </button>
          );
        })}

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

export default Home;
