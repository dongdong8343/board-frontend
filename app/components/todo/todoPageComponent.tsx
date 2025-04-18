import { Link } from "react-router";

interface PaginationProps {
  page: number;
  start: number;
  end: number;
  prev: boolean;
  next: boolean;
  total: number;
  size: number;
}

function Pagination({
  page,
  start,
  end,
  prev,
  next,
  total,
  size,
}: PaginationProps) {
  const totalPages = Math.ceil(total / size);

  const pageNumbers = [];
  for (let i = start; i <= end; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-8 text-sm">
      <Link
        to={`?page=1&size=${size}`}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        ⏮
      </Link>

      {prev && (
        <Link
          to={`?page=${start - 1}&size=${size}`}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          ◀
        </Link>
      )}

      {pageNumbers.map((num) => (
        <Link
          key={num}
          to={`?page=${num}&size=${size}`}
          className={`px-3 py-1 border rounded ${
            num === page
              ? "bg-blue-500 text-white"
              : "hover:bg-gray-100 text-gray-700"
          }`}
        >
          {num}
        </Link>
      ))}

      {next && (
        <Link
          to={`?page=${end + 1}&size=${size}`}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          ▶
        </Link>
      )}

      {/* Last page */}
      <Link
        to={`?page=${totalPages}&size=${size}`}
        className="px-3 py-1 border rounded hover:bg-gray-100"
      >
        ⏭
      </Link>
    </div>
  );
}

export default Pagination;
