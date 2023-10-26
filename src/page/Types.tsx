import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

// Function
import Upperfirst from "../assets/function/Upperfirst";

//Image
import TableTypes from "../assets/Table-des-type.jpg";

// Type
const typeSchema = z.object({
  count: z.number(),
  next: z.null(),
  previous: z.null(),
  results: z.array(
    z.object({
      name: z.string(),
      url: z.string(),
    })
  ),
});
type PokeTypes = z.infer<typeof typeSchema>;

const Types = (): JSX.Element => {
  const navigate = useNavigate();

  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<PokeTypes | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const response = await axios.get("https://pokeapi.co/api/v2/type/");
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
      <h2>Liste des différents types de pokémons</h2>
      <div>
        {data?.results.map((types) => {
          const typeId = types.url.split("/")[6];
          return (
            <p
              key={types.name}
              className={types.name}
              onClick={() => {
                navigate("/PokeType/" + typeId);
              }}
            >
              {Upperfirst(types.name)}
            </p>
          );
        })}
      </div>

      <img src={TableTypes} alt="Table des types" />
    </div>
  );
};

export default Types;
