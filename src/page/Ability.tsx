import axios from "axios";
import { ZodError, z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

// Type
const abilitySchema = z.object({
  effect_entries: z.array(
    z.object({
      effect: z.string(),
      language: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
  id: z.number(),
  name: z.string(),
  pokemon: z.array(
    z.object({
      is_hidden: z.boolean(),
      pokemon: z.object({
        name: z.string(),
        url: z.string(),
      }),
    })
  ),
});
type AbilityDetails = z.infer<typeof abilitySchema>;

const Ability = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<AbilityDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/ability/${id}`
        );
        // console.log(response.data);
        const responseDataParsed = abilitySchema.parse(response.data);
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
  }, []);

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
