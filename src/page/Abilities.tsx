import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/ability/?offset=${offset}&limit=80`
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

      <Pagination count={data?.count} offset={offset} setOffset={setOffset} />
    </div>
  );
};

export default Abilities;
