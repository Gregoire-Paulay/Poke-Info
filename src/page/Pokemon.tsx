import axios from "axios";
import { ZodError, z } from "zod";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

// Function
import Upperfirst from "../assets/function/Upperfirst";

// Type
const pokemonSchema = z.object({
  abilities: z.array(
    z.object({ ability: z.object({ name: z.string(), url: z.string() }) })
  ),
  height: z.number(),
  weight: z.number(),
  id: z.number(),
  name: z.string(),
  sprites: z.object({
    front_default: z.string(),
    front_shiny: z.string(),
    other: z.object({
      home: z.object({
        front_default: z.string(),
        front_shiny: z.string(),
      }),
      "official-artwork": z.object({
        front_default: z.string(),
        front_shiny: z.string(),
      }),
    }),
  }),
  stats: z.array(
    z.object({
      base_stat: z.number(),
      effort: z.number(),
      stat: z.object({ name: z.string(), url: z.string() }),
    })
  ),
  types: z.array(
    z.object({
      slot: z.number(),
      type: z.object({ name: z.string(), url: z.string() }),
    })
  ),
});

type Pokemons = z.infer<typeof pokemonSchema>;

const Pokemon = (): JSX.Element => {
  const { name } = useParams();

  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Pokemons | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
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
      <div className="pokeInfo">
        <div>
          <div className="dex">
            <h1>{Upperfirst(name)}</h1>

            {data?.id &&
              (data?.id < 10 ? (
                <h2># 000{data?.id}</h2>
              ) : data?.id < 100 ? (
                <h2># 00{data?.id}</h2>
              ) : data?.id < 1000 ? (
                <h2># 0{data?.id}</h2>
              ) : (
                <h2># {data?.id}</h2>
              ))}
          </div>

          <img
            src={data?.sprites.other["official-artwork"].front_default}
            alt="sprites"
          />
        </div>

        <div>
          <section className="pokeType">
            <h3>Type</h3>
            <div>
              {data?.types.map((types) => {
                const typeId = types.type.url.split("/")[6];
                return (
                  <p
                    key={types.type.name}
                    className={types.type.name}
                    onClick={() => {
                      navigate("/PokeType/" + typeId);
                    }}
                  >
                    {Upperfirst(types.type.name)}
                  </p>
                );
              })}
            </div>
          </section>

          <section className="pokeStat">
            <h3>Base Stats</h3>
            <div>
              {data?.stats.map((stats) => {
                return (
                  <div key={stats.stat.name}>
                    <p className="statName">{Upperfirst(stats.stat.name)}</p>
                    <p>{stats.base_stat}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="pokeAbility">
            <h3>Abilities</h3>
            <div>
              {data?.abilities.map((abilities) => {
                const abilityId = abilities.ability.url.split("/")[6];
                return (
                  <p
                    key={abilities.ability.name}
                    onClick={() => {
                      navigate("/ability/" + abilityId);
                    }}
                  >
                    {Upperfirst(abilities.ability.name)}
                  </p>
                );
              })}
            </div>
          </section>

          <section className="pokeMini">
            <h3>Miniatures</h3>
            <div>
              <img
                src={data?.sprites.front_default}
                alt="sprites"
                className="miniature"
              />
              <img
                src={data?.sprites.front_shiny}
                alt="sprites"
                className="miniature"
              />
            </div>
          </section>

          <section className="pokeSize">
            <div>
              <h3>Height</h3>
              {data?.height && <p>{data.height / 10} m</p>}
            </div>
            <div>
              <h3>Weight</h3>
              {data?.weight && <p>{data.weight / 10} kg</p>}
            </div>
          </section>

          <section className="pokeEv">
            <h3>EV Yield</h3>
            <div>
              {data?.stats.map((ev) => {
                return (
                  <div key={ev.stat.name}>
                    <p>{ev.effort}</p>
                    <p className="statName">{Upperfirst(ev.stat.name)}</p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <div>
        <h2>Imagerie</h2>
        <div>
          <div>
            <h3>Official Artwork</h3>
            <img
              src={data?.sprites.other["official-artwork"].front_default}
              alt="sprites"
            />
            <img
              src={data?.sprites.other["official-artwork"].front_shiny}
              alt="sprites"
            />
          </div>

          <div>
            <h3>Home </h3>
            <img src={data?.sprites.other.home.front_default} alt="sprites" />
            <img src={data?.sprites.other.home.front_shiny} alt="sprites" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokemon;
