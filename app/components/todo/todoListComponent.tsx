import { useNavigate } from "react-router";

interface TodoItem {
  tno: number;
  title: string;
  writer: string;
  regDate: string;
}

interface TodoListProps {
  dtoList: TodoItem[];
}

function TodoListComponent({ dtoList }: TodoListProps) {
  const navigate = useNavigate();

  const handleClick = (tno: number) => {
    navigate(`/todo/${tno}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 gap-4">
        {dtoList &&
          dtoList.map((item) => (
            <div
              key={item.tno}
              onClick={() => handleClick(item.tno)}
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
    </div>
  );
}

export default TodoListComponent;
