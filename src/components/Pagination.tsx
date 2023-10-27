interface Props {
  count: number | undefined;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  limit: number;
}

const Pagination = ({
  count,
  offset,
  setOffset,
  limit,
}: Props): JSX.Element => {
  return (
    <div>
      {offset ? (
        <button
          onClick={() => {
            setOffset((prevState) => prevState - limit);
          }}
        >
          previous
        </button>
      ) : null}

      {count &&
        (offset / limit >= Math.floor(count / limit) ? null : (
          <button
            onClick={() => {
              setOffset((prevState) => prevState + limit);
            }}
          >
            next
          </button>
        ))}

      <p>
        {offset / limit + 1} / {count && Math.round(count / limit)}
      </p>
    </div>
  );
};

export default Pagination;
