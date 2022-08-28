import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

type Props = {
  rows?: number;
  columns?: number;
};

function CardsSkeleton({ rows = 5, columns = 4 }: Props) {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array(rows)
        .fill('')
        .map(() =>
          Array(columns)
            .fill('')
            .map((_, i) => (
              <li key={i}>
                <Skeleton />
              </li>
            ))
        )}
    </ul>
  );
}

export default CardsSkeleton;
