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
              Detective Pikachu Returns, sequel to the 3DS game Detective
              Pikachu is out.
            </li>
            <li>
              The latest Pokémon Scarlet & Violet Mass Outbreak event has begun.
              This event causes Mass Outbreaks of Phantump, Drifloon, Mimikyu
              and Greavard to spawn throughout both Paldea and Kitakami with the
              Pokémon having a chance of having the Crafty Mark. This event runs
              until 23:59 UTC on October 31st 2023.
            </li>
            <li>
              The latest Tera Raid Battle event is now live in Pokémon Scarlet &
              Violet. This event has Mismagius appearing in 5 Star Raid Battles
              with a variety of rewards including larger amounts of Rare Candy.
              This event runs until October 31st at 23:59 UTC.
            </li>
          </section>

          <section>
            <h3>Anime :</h3>
            <li>
              A dessert has gone missing! Can Detective Pikachu’s electrifying
              logic save the day—and Tim’s flan? 🍮🔎
              <br />
              Find out in this animated short,
              <a href="https://pkmn.news/46HbqyY">
                “Detective Pikachu and the Mystery of the Missing Flan”!
              </a>
            </li>
          </section>

          <section>
            <h3>Manga :</h3>
            <li>
              The volume 6 of the Sword & Shield arc of the Pokémon Adventures
              manga series was released on October 12, 2023.
            </li>
          </section>

          <section>
            <h3>JCC :</h3>
            <li>
              The fourth expansion of cards from the Scarlet & Violet Series of
              the pokémon Trading Car Game named
              <span className="bold">
                {" "}
                Pokémon TCG: Scarlet & Violet—Paradox Rift{" "}
              </span>
              will be realeased on November 3, 2023.
            </li>
            <li>
              The first special expansion released during the Scarlet & Violet
              Series that focuses only on the first 151 Pokémon to ever be
              introduced{" "}
              <span className="bold"> Pokémon TCG: Scarlet & Violet—151 </span>{" "}
              was released on September 22, 2023.
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
