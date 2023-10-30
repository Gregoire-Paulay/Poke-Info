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
    <div className="pagination">
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
        <p>
          {offset / limit + 1} / {count && Math.round(count / limit)}
        </p>
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
      </div>

      <div>
        <label htmlFor="number">Go to page</label>
        <input
          type="number"
          id="number"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const page: number = Number(event.target.value) - 1;
            if (page >= 1 && page <= 17) {
              setOffset(Number(limit * page));
            }
          }}
        />
      </div>
    </div>
  );
};

export default Pagination;
