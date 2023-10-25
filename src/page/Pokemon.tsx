import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Function
import Upperfirst from "../assets/function/Upperfirst";

type Pokemon = {
  abilities: {
    ability: {
      name: string;
      url: string;
    };
  }[];
  height: number;
  id: any;
  name: string;
  sprites: {
    front_default: string;
    front_shiny: string;
    other: {
      home: {
        front_default: string;
        front_shiny: string;
      };
      "official-artwork": {
        front_default: string;
        front_shiny: string;
      };
    };
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  weight: number;
};

const Pokemon = (): JSX.Element => {
  const { name } = useParams();

  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Pokemon | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        // console.log(response.data);
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
      <div className="pokeInfo">
        <div>
          <div className="dex">
            <h1>{Upperfirst(name)}</h1>

            {data?.id < 10 ? (
              <h2># 000{data?.id}</h2>
            ) : data?.id < 100 ? (
              <h2># 00{data?.id}</h2>
            ) : data?.id < 1000 ? (
              <h2># 0{data?.id}</h2>
            ) : (
              <h2># {data?.id}</h2>
            )}
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
                return (
                  <p key={types.type.name} className={types.type.name}>
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
