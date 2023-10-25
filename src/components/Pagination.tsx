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
            setOffset(offset - limit);
          }}
        >
          previous
        </button>
      ) : null}

      {count &&
        (offset / limit >= Math.floor(count / limit) ? null : (
          <button
            onClick={() => {
              setOffset(offset + limit);
            }}
          >
            next
          </button>
        ))}

      <p>
        {offset / limit} / {count && Math.round(count / limit)}
      </p>
    </div>
  );
};

export default Pagination;
