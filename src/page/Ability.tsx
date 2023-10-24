import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Ability = {
  effect_entries: {
    effect: string;
    language: {
      name: string;
      url: string;
    };
  }[];
  id: number;
  name: string;
  pokemon: {
    is_hidden: boolean;
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

const Ability = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Ability | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/ability/${id}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(new Error("An error occured !!!"));
      }
    };
    fetchData();
  }, []);

  if (error) return <div> Error: {error.message}</div>;
  if (isLoading) return <div>Loading....</div>;

  return (
    <div className="container">
      <h2>{data?.name}</h2>

      {data?.effect_entries.map((ability) => {
        return (
          <p key={ability.effect}>
            {ability.language.name === "en" && ability.effect}
          </p>
        );
      })}

      <div>
        {data?.pokemon.map((pokemon) => {
          const url = pokemon.pokemon.url.split("/")[6];
          return (
            <button
              key={pokemon.pokemon.name}
              onClick={() => {
                navigate("/pokemon/" + pokemon.pokemon.name);
              }}
            >
              <p>{pokemon.pokemon.name}</p>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`}
                alt="Sprites pokémon"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Ability;
