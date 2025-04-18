import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router";
import { todoList } from "~/api/todoAPI";
import TodoListComponent from "~/components/todo/todoListComponent";
import Pagination from "~/components/todo/todoPageComponent";

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
      <h1 className="text-4xl font-bold mb-6">Todo List</h1>

      {isFetching && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Something went wrong</p>}

      <TodoListComponent dtoList={data?.dtoList} />
      {data && (
        <Pagination
          page={Number(data.page)}
          start={Number(data.start)}
          end={Number(data.end)}
          prev={data.prev}
          next={data.next}
          total={data.total}
          size={data.size}
        />
      )}
    </div>
  );
}

export default TodoListPage;
