import { IBasePokemon } from "../types/pokemon.types";
import Button from "./Button";

type Props = {
  onNext: React.MouseEventHandler<HTMLButtonElement>;
  onPrevious: React.MouseEventHandler<HTMLButtonElement>;
  data: IBasePokemon;
  limit: number;
  pageNumber: number;
};

function Pagination({
  onNext,
  onPrevious,
  data: { count, next, previous },
  limit,
  pageNumber,
}: Props) {
  return (
    <nav
      className="bg-white py-3 flex items-center justify-between border-t border-gray-200"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">{limit * (pageNumber - 1) || "1"}</span>{" "}
          to <span className="font-medium">{limit * pageNumber}</span> of{" "}
          <span className="font-medium">{count}</span> results
        </p>
      </div>
      <div className="flex-1 flex justify-between sm:justify-end space-x-4">
        <Button disabled={!previous} onClick={onPrevious}>
          Previous
        </Button>
        <Button disabled={!next} onClick={onNext}>
          Next
        </Button>
      </div>
    </nav>
  );
}

export default Pagination;
