import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getTodo } from "~/api/todoAPI";
import TodoDetailComponent from "~/components/todo/todoDetailComponent";

function TodoDetail() {
  const { tno } = useParams<{ tno: string }>();

  const query = useQuery({
    queryKey: ["tno", tno],
    queryFn: () => getTodo(tno),
    staleTime: 10 * 60 * 1000,
  });

  const { isFetching, data, error } = query;

  return (
    <div>
      {isFetching && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">Something went wrong</p>}

      {data && (
        <TodoDetailComponent
          tno={data.tno}
          content={data.content}
          title={data.title}
          writer={data.writer}
        />
      )}
    </div>
  );
}

export default TodoDetail;
