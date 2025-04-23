import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { getTodo } from "~/api/todoAPI";
import TodoEditComponent from "~/components/todo/todoEditComponent";

function todoEdit() {
  const { tno } = useParams<{ tno: string }>();

  const query = useQuery({
    queryKey: ["todo", tno],
    queryFn: () => getTodo(tno),
    staleTime: 10 * 60 * 1000,
  });

  const { isFetching, data, error } = query;

  return (
    <div>
      {data && (
        <TodoEditComponent
          tno={data.tno}
          content={data.content}
          title={data.title}
          writer={data.writer}
        />
      )}
    </div>
  );
}

export default todoEdit;
