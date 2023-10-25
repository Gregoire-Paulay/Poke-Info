import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Components
import Pagination from "../components/Pagination";

type Pokemons = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

const Home = (): JSX.Element => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Pokemons | null>(null);
  const [offset, setOffset] = useState<number>(0);
  let limit: number = 50;

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(new Error("An error occured !!!"));
      }
    };
    fetchData();
  }, [offset]);

  if (error) return <div> Error: {error.message}</div>;
  if (isLoading) return <div>Loading....</div>;

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
