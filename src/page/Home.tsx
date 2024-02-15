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
  const [randomNum] = useState<number>(Math.round(Math.random() * 1000));

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
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
      <div className="homePage">
        <div>
          <h2>PokéNews</h2>

          <section>
            <h3>Games : </h3>
            <li>
              The epilogue of The Hidden Treasure of Area Zero DLC for pokemon
              Scarlet and Violet is out. As a means to deliver the Hidden
              Treasure of Area Zero Epilogue, an online distribution was added
              in perpituity in order to get the Mythical Pecha Berry item, which
              can be taken to Peachy's in Mossui Town to start the Mochi Mayhem
              story.
            </li>
            <li>
              The next Pokémon Café ReMix Delivery focus has been announced.
              From February 16th 2024, the special outfit Sylveon (Confectioner)
              will return to the Delivery feature
            </li>
            <li></li>
          </section>

          <section>
            <h3>Anime :</h3>
            <li>
              The animated Serie Pokemon Concierge is available to Watch on{" "}
              <a href="https://www.netflix.com/fr/title/81186864">Netflix</a>
            </li>
          </section>

          <section>
            <h3>Manga :</h3>
            <li>
              The Omega Ruby & Alpha Sapphire Arc (adventures) will be released
              in 2024.
            </li>
          </section>

          <section>
            <h3>JCC :</h3>
            <li>
              The second special expansion of the Scarlet & Violet series is
              named
              <span className="bold">
                {" "}
                Pokémon TCG: Scarlet & Violet—Paldean Fates{" "}
              </span>
              and was released on January 26, 2024
            </li>
            <li>
              The
              <span className="bold">
                {" "}
                Pokemon TCG: Scarlet & Violet - Temporal Forces{" "}
              </span>{" "}
              is the name given to the set that makes up the fifth expansion of
              cards from the Scarlet & Violet Series of the Pokémon Trading Card
              Game. It will release on March 22, 2024
            </li>
          </section>
        </div>

        <div
          className="randomPoke"
          onClick={() => {
            navigate("/pokemon/" + data?.name);
          }}
        >
          <div>
            <p>
              Random Pokemon # {""}
              {randomNum}
            </p>
            <h3>{Upperfirst(data?.name)}</h3>
          </div>

          <img
            src={data?.sprites.other["official-artwork"].front_default}
            alt="Sprites pokémon"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
