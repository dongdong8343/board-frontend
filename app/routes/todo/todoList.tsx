import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { todoList } from "~/api/todoAPI";

function TodoListPage() {
  const [searchParams] = useSearchParams();

  const pageStr = searchParams.get("page") || "1";
  const sizeStr = searchParams.get("size") || "10";

  const query = useQuery({
    queryKey: ["todos", pageStr, sizeStr],
    queryFn: () => todoList(pageStr, sizeStr),
    staleTime: 10 * 60 * 1000,
  });

  const { isFetching, data, error } = query;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Todo List Page</h1>

      {isFetching && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Something went wrong</p>}

      <div className="grid grid-cols-1 gap-4">
        {data?.dtoList.map((item) => (
          <div
            key={item.tno}
            className="p-4 border rounded-xl shadow-md hover:shadow-lg transition-shadow bg-white"
          >
            <h2 className="text-xl font-semibold text-blue-600">
              {item.title}
            </h2>
            <p className="text-gray-700">작성자: {item.writer}</p>
            <p className="text-gray-500 text-sm">
              등록일: {new Date(item.regDate).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between items-center text-sm text-gray-600">
        <span>총 {data?.total}건</span>
        <span>
          페이지 {data?.page} / {Math.ceil(data?.total / data?.size)}
        </span>
      </div>
    </div>
  );
}

export default TodoListPage;
