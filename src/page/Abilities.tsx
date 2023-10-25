import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Components
import Pagination from "../components/Pagination";

type Abilities = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

const Abilities = (): JSX.Element => {
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Abilities | null>(null);
  const [offset, setOffset] = useState<number>(0);
  let limit: number = 80;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/ability/?offset=${offset}&limit=${limit}`
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
      <h1>All Abilities</h1>

      <div>
        {data?.results.map((abilities) => {
          const abilityId = abilities.url.split("/")[6];
          return (
            <button
              key={abilities.name}
              onClick={() => {
                navigate("/Ability/" + abilityId);
              }}
            >
              {abilities.name}{" "}
            </button>
          );
        })}
      </div>

      <Pagination
        count={data?.count}
        offset={offset}
        setOffset={setOffset}
        limit={limit}
      />
    </div>
  );
};

export default Abilities;
