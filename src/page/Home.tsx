import { useEffect, useState } from "react";
import { ZodError, z } from "zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";

// Function
import Upperfirst from "../assets/function/Upperfirst";
//Type
const pokemonSchema = z.object({
  name: z.string(),
  sprites: z.object({
    front_default: z.string(),
    other: z.object({
      ["official-artwork"]: z.object({ front_default: z.string() }),
    }),
  }),
});
type Pokemon = z.infer<typeof pokemonSchema>;

const Home = (): JSX.Element => {
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<Pokemon | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const randomNum = Math.round(Math.random() * 1000);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${randomNum}`
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
      <h2>Home</h2>

      <div>Actualités (pokepedia)</div>

      <div>
        Random Pokemon
        <button
          onClick={() => {
            navigate("/pokemon/" + data?.name);
          }}
        >
          <p>{Upperfirst(data?.name)}</p>
          <img
            src={data?.sprites.other["official-artwork"].front_default}
            alt="Sprites pokémon"
          />
        </button>
      </div>
    </div>
  );
};

export default Home;
