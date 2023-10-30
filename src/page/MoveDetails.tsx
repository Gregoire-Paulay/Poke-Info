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
  pp: z.number().nullable(),
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
      <div className="moveDetails">
        <div>
          <h1>{Upperfirst(data?.name)} (move)</h1>
          {data?.effect_entries.map((description) => {
            return (
              <p key={description.effect}>
                Description:{" "}
                {description.language.name === "en" && description.effect}
              </p>
            );
          })}

          <section>
            <h2>Move details</h2>
            <div className="moveDescription">
              {data?.type.name !== "shadow" ? (
                <div className="moveType">
                  <p>Type</p>
                  <p
                    className={data?.type.name}
                    onClick={() => {
                      navigate("/PokeType/" + data?.type.name);
                    }}
                  >
                    {Upperfirst(data?.type.name)}
                  </p>
                </div>
              ) : undefined}

              <div>
                <p>Category</p>
                <p> {Upperfirst(data?.damage_class.name)}</p>
              </div>
              <div>
                <p>PP</p>
                <p>{data?.pp === null ? "⏤" : data?.pp}</p>
              </div>
              <div>
                <p>Power</p>
                <p>{data?.power === null ? "⏤" : data?.power}</p>
              </div>
              <div>
                <p>Accuracy</p>
                <p>{data?.accuracy === null ? "⏤" : data?.accuracy} %</p>
              </div>
              <div>
                <p>Target</p>
                <p>{Upperfirst(data?.target.name)}</p>
              </div>
              <div>
                <p>Priority</p>
                <p>{data?.priority}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="pokeLearn">
          <h2>Pokemons who can learn the {data?.name} ability</h2>
          <div>
            {data?.learned_by_pokemon.map((pokemon) => {
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
        </div>
      </div>
    </div>
  );
};

export default MoveDetails;
