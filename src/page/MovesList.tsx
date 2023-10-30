import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

// Components
import Pagination from "../components/Pagination";
// Fonction
import Upperfirst from "../assets/function/Upperfirst";
//Type
const movesSchema = z.object({
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
type Moves = z.infer<typeof movesSchema>;

const MovesList = (): JSX.Element => {
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Moves | null>(null);
  const [offset, setOffset] = useState<number>(0);
  let limit: number = 922;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/move/?offset=${offset}&limit=${limit}`
        );
        // console.log(response.data);
        const responseDataParsed = movesSchema.parse(response.data);
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
      <div className="allMoves">
        <h1>List of all moves Pokémon can learn</h1>

        <div>
          {data?.results.map((moves) => {
            const moveId = moves.url.split("/")[6];
            return (
              <button
                key={moves.name}
                onClick={() => {
                  navigate("/MoveDetails/" + moveId);
                }}
              >
                {Upperfirst(moves.name)}
              </button>
            );
          })}
        </div>
      </div>

      {/* <Pagination
        count={data?.count}
        offset={offset}
        setOffset={setOffset}
        limit={limit}
      /> */}
    </div>
  );
};

export default MovesList;
