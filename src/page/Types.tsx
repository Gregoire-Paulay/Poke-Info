import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ZodError, z } from "zod";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";

// Function
import Upperfirst from "../assets/function/Upperfirst";

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
      <div className="allTypes">
        <h1>Types</h1>
        <p>
          Types are properties applied to Pokémon and their moves, which affect
          the power of moves in battles. As of Generation VI, there are 18
          types. Most of the types were introduced during Generation I, but the
          Dark and Steel types were introduced in Generation II, and the Fairy
          type was introduced in Generation VI. A unique ??? type also existed
          from Generations II to IV. The types are largely based on the concept
          of classical elements in popular culture.
        </p>
        <div>
          <h2> List of all types (click for more info)</h2>
          <div className="typeList">
            {data?.results.map((types) => {
              const typeId = types.url.split("/")[6];
              return (
                <section key={types.name}>
                  {types.name !== "shadow" && types.name !== "unknown" && (
                    <p
                      className={types.name}
                      onClick={() => {
                        navigate("/PokeType/" + typeId);
                      }}
                    >
                      {Upperfirst(types.name)}
                    </p>
                  )}
                </section>
              );
            })}
          </div>
        </div>
        <div>
          <h3>Summary</h3>
          <p>
            A Pokémon may have either one or two types. For instance, Charmander
            is a Fire type, while Bulbasaur is both a Grass type and a Poison
            type. Pokémon with two types are known as dual-type Pokémon. With
            this system and there currently being 18 types, there is a total of
            324 possible ways to assign types to Pokémon, with 171 unique
            combinations, 162 of which have been used as of Generation IX.
          </p>
        </div>

        <div>
          <h3>Type Effectiveness</h3>
          <p>
            Type effectiveness greatly influences how much damage moves deal.
            <li>
              If the type of a move is super effective against a type of its
              target, the damage is doubled
            </li>
            <li>
              If the type of a move is not very effective against a type of its
              target, the damage is halved;
            </li>
            <li>
              If the type of a move has no effect against a type of its target,
              the target is completely immune to it, and the move will deal no
              damage.
            </li>
            <br />
            For targets that have multiple types, the type effectiveness of a
            move is the product of its effectiveness against each of the types:
            <li>
              If the type of a move is super effective against both of the
              opponent's types (such as a Ground-type move used against a
              Steel/Rock Pokémon), then the move does 4 times the damage.
            </li>
            <li>
              If the type of a move is not very effective against both of the
              opponent's types (such as a Fighting-type move used against a
              Psychic/Flying Pokémon), then the move only does ¼ of the damage.
            </li>
            <li>
              If the type of a move is super effective against one of the
              opponent's types but not very effective against the other (such as
              a Grass-type move used against a Water/Flying Pokémon), then the
              move deals regular damage.
            </li>
            <li>
              If the type of move is completely ineffective against one of the
              opponent's types, then the move does no damage regardless of how
              the Pokémon’s other type would be affected (as in an Electric-type
              move used against a Water/Ground Pokémon).
            </li>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Types;
