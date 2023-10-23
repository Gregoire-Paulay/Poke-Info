import { useParams } from "react-router-dom";

const Pokemon = (): JSX.Element => {
  const { name } = useParams();

  return <div className="container">Details of {name}</div>;
};

export default Pokemon;
