import axios from "axios";
import { ZodError, z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

// Function
import Upperfirst from "../assets/function/Upperfirst";

// Type
const typeSchema = z.object({
  id: z.number(),
  name: z.string(),
  damage_relations: z.object({
    double_damage_from: z.array(
      z.object({ name: z.string(), url: z.string() })
    ),
    double_damage_to: z.array(z.object({ name: z.string(), url: z.string() })),
    half_damage_from: z.array(z.object({ name: z.string(), url: z.string() })),
    half_damage_to: z.array(z.object({ name: z.string(), url: z.string() })),
    no_damage_from: z.array(z.object({ name: z.string(), url: z.string() })),
    no_damage_to: z.array(z.object({ name: z.string(), url: z.string() })),
  }),
  moves: z.array(z.object({ name: z.string(), url: z.string() })),
  pokemon: z.array(
    z.object({
      pokemon: z.object({ name: z.string(), url: z.string() }),
      slot: z.number(),
    })
  ),
});
type TypeDetails = z.infer<typeof typeSchema>;

const PokeType = (): JSX.Element => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<TypeDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/type/${id}`
        );
        // console.log(response.data);
        const responseDataParsed = typeSchema.parse(response.data);
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
  }, [id]);

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
      <div className="typeDetails">
        <h1 className={data?.name}>{Upperfirst(data?.name)}</h1>

        <div>
          <h2>Battle properties</h2>
          <div>
            <section className="properties">
              <h2>Offensive properties of {data?.name}-types moves</h2>
              <div>
                <div>
                  <h4>Super effective (x 2)</h4>
                  <div className="effect">
                    {data?.damage_relations.double_damage_to.map((type) => {
                      const typeId = type.url.split("/")[6];
                      return (
                        <p
                          key={type.name}
                          className={type.name}
                          onClick={() => {
                            navigate("/PokeType/" + typeId);
                          }}
                        >
                          {Upperfirst(type.name)}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4>Not very effective (x 0.5)</h4>
                  <div className="effect">
                    {data?.damage_relations.half_damage_to.map((type) => {
                      const typeId = type.url.split("/")[6];
                      return (
                        <p
                          key={type.name}
                          className={type.name}
                          onClick={() => {
                            navigate("/PokeType/" + typeId);
                          }}
                        >
                          {Upperfirst(type.name)}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4>No effect (x 0)</h4>
                  <div className="effect">
                    {data?.damage_relations.no_damage_to.map((type) => {
                      const typeId = type.url.split("/")[6];
                      return (
                        <p
                          key={type.name}
                          className={type.name}
                          onClick={() => {
                            navigate("/PokeType/" + typeId);
                          }}
                        >
                          {Upperfirst(type.name)}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="properties">
              <h2>Defensive properties of {data?.name}-types Pokémon</h2>
              <div>
                <div>
                  <h4>Weak to (x 2)</h4>
                  <div className="effect">
                    {data?.damage_relations.double_damage_from.map((type) => {
                      const typeId = type.url.split("/")[6];
                      return (
                        <p
                          key={type.name}
                          className={type.name}
                          onClick={() => {
                            navigate("/PokeType/" + typeId);
                          }}
                        >
                          {Upperfirst(type.name)}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4>Resists (x 0.5)</h4>
                  <div className="effect">
                    {data?.damage_relations.half_damage_from.map((type) => {
                      const typeId = type.url.split("/")[6];
                      return (
                        <p
                          key={type.name}
                          className={type.name}
                          onClick={() => {
                            navigate("/PokeType/" + typeId);
                          }}
                        >
                          {Upperfirst(type.name)}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <h4>Immune to (x 0)</h4>
                  <div className="effect">
                    {data?.damage_relations.no_damage_from.map((type) => {
                      const typeId = type.url.split("/")[6];
                      return (
                        <p
                          key={type.name}
                          className={type.name}
                          onClick={() => {
                            navigate("/PokeType/" + typeId);
                          }}
                        >
                          {Upperfirst(type.name)}
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="pokeList">
          <h2>List of {data?.name} type pokémon</h2>
          <div>
            {data?.pokemon.map((pokemon) => {
              const url = pokemon.pokemon.url.split("/")[6];

              return (
                <button
                  key={pokemon.pokemon.name}
                  className="pokeButton"
                  onClick={() => {
                    navigate("/pokemon/" + pokemon.pokemon.name);
                  }}
                >
                  <p>{Upperfirst(pokemon.pokemon.name)}</p>

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

export default PokeType;
