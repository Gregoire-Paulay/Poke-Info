interface Props {
  count: number | undefined;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({ count, offset, setOffset }: Props): JSX.Element => {
  return (
    <div>
      {offset ? (
        <button
          onClick={() => {
            setOffset(offset - 50);
          }}
        >
          previous
        </button>
      ) : null}

      {offset / 50 >= Math.round(count / 50) ? null : (
        <button
          onClick={() => {
            setOffset(offset + 50);
          }}
        >
          next
        </button>
      )}

      <p>
        {offset / 50} / {count && Math.round(count / 50)}
      </p>
    </div>
  );
};

export default Pagination;
