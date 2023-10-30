import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

// Components
// import Pagination from "../components/Pagination";

// Fonction
import Upperfirst from "../assets/function/Upperfirst";

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
  const [offset] = useState<number>(0);
  let limit: number = 363;

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
      <div className="allAbilities">
        <h1>Pokemon Abilities</h1>
        <p>
          list of all abilities that pokemon can have(click on ability to learn
          more about them)
        </p>
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
                {Upperfirst(abilities.name)}
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

export default Abilities;
