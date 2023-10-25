import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

// Components
import Pagination from "../components/Pagination";

//Type
const abilitiesSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});
type PokeAbilities = z.infer<typeof abilitiesSchema>;

const Abilities = (): JSX.Element => {
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<PokeAbilities | null>(null);
  const [offset, setOffset] = useState<number>(0);
  let limit: number = 80;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/ability/?offset=${offset}&limit=${limit}`
        );
        // console.log(response.data);
        const responseDataParsed = abilitiesSchema.parse(response.data);
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
  }, [offset]);

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
              {abilities.name}
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
