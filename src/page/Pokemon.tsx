import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

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

  const Upperfirst = (name: any) => {
    let newName = "";
    for (let i = 0; i < name.length; i++) {
      if (i === 0) {
        newName += name[i].toUpperCase();
      } else {
        newName += name[i];
      }
    }
    return newName;
  };

  if (error) return <div> Error: {error.message}</div>;
  if (isLoading) return <div>Loading....</div>;

  return (
    <div className="container">
      <div className="pokeInfo">
        <div>
          <div className="dex">
            <h1>{Upperfirst(name)}</h1>
            <div>
              <img src={data?.sprites.front_default} alt="sprites" />
              <img src={data?.sprites.front_shiny} alt="sprites" />
            </div>
            {data?.id < 10 ? (
              <p># 000{data?.id}</p>
            ) : data?.id < 100 ? (
              <p># 00{data?.id}</p>
            ) : data?.id < 1000 ? (
              <p># 0{data?.id}</p>
            ) : (
              <p># {data?.id}</p>
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
                    {types.type.name}
                  </p>
                );
              })}
            </div>
          </section>

          <section>
            <h3>Base Stats</h3>
            {data?.stats.map((stats) => {
              return (
                <div key={stats.stat.name}>
                  <span>{stats.stat.name}</span>
                  <span>{stats.base_stat}</span>
                </div>
              );
            })}
          </section>

          <section>
            <h3>Abilities</h3>
            {data?.abilities.map((abilities) => {
              const abilityId = abilities.ability.url.split("/")[6];
              return (
                <div
                  key={abilities.ability.name}
                  onClick={() => {
                    navigate("/ability/" + abilityId);
                  }}
                >
                  <span>{abilities.ability.name}</span>
                </div>
              );
            })}
          </section>

          <section>
            <h3>Divers</h3>
            <p>height: {data?.height}</p>
            <p>weight: {data?.weight}</p>
          </section>

          <section>
            <h3>Ev Yield</h3>
            <div>
              {data?.stats.map((ev) => {
                return (
                  <div key={ev.stat.name}>
                    <p>{ev.effort}</p>
                    <p>{ev.stat.name}</p>
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
