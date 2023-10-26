import axios from "axios";
import { ZodError, z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

// Function
import Upperfirst from "../assets/function/Upperfirst";
//Type
const moveSchema = z.object({
  accuracy: z.number().nullable(),
  damage_class: z.object({ name: z.string(), url: z.string() }),
  effect_entries: z.array(
    z.object({
      effect: z.string(),
      language: z.object({ name: z.string(), url: z.string() }),
      short_effect: z.string(),
    })
  ),
  learned_by_pokemon: z.array(z.object({ name: z.string(), url: z.string() })),
  name: z.string(),
  power: z.number().nullable(),
  pp: z.number(),
  priority: z.number(),
  target: z.object({ name: z.string(), url: z.string() }),
  type: z.object({ name: z.string(), url: z.string() }),
});
type Move = z.infer<typeof moveSchema>;

const MoveDetails = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Move | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/move/${id}`
        );
        // console.log(response.data);
        const responseDataParsed = moveSchema.parse(response.data);
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
      <div>
        <h2>{Upperfirst(data?.name)}</h2>
        {data?.effect_entries.map((description) => {
          return (
            <p key={description.effect}>
              {description.language.name === "en" && description.effect}
            </p>
          );
        })}

        <p
          className={data?.type.name}
          onClick={() => {
            navigate("/PokeType/" + data?.type.name);
          }}
        >
          Type : {Upperfirst(data?.type.name)}
        </p>
        <p>Category : {Upperfirst(data?.damage_class.name)}</p>
        <p>PP : {data?.pp}</p>
        <p>Power : {data?.power === null ? "⏤" : data?.power}</p>
        <p>Accuracy : {data?.accuracy === null ? "⏤" : data?.accuracy} %</p>
        <p>Target : {Upperfirst(data?.target.name)}</p>
        <p>Priority : {data?.priority}</p>

        <div>
          {data?.learned_by_pokemon.map((pokemon) => {
            const url = pokemon.url.split("/")[6];
            return (
              <button
                key={pokemon.name}
                onClick={() => {
                  navigate("/pokemon/" + pokemon.name);
                }}
              >
                <div>{Upperfirst(pokemon.name)}</div>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${url}.png`}
                  alt="Sprites pokémon"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MoveDetails;
