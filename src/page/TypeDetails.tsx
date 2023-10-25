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
      <h1 className={data?.name}>{Upperfirst(data?.name)}</h1>

      <div>
        <section className="offensive">
          <h2>Offensive properties of {data?.name}-types moves</h2>

          <div>
            <h3>Super effective (x 2)</h3>
            <div>
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
            <h3>Not very effective (x 0.5)</h3>
            <div>
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
            <h3>No effect (x 0)</h3>
            <div>
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
        </section>

        <section className="defensive">
          <h2>Defensive properties of {data?.name}-types Pokémon</h2>
          <div>
            <h3>Weak to (x 2)</h3>
            <div>
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
            <h3>Resists (x 0.5)</h3>
            <div>
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
            <h3>Immune to (x 0)</h3>
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
        </section>
      </div>
    </div>
  );
};

export default PokeType;
