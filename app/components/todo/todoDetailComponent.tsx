import { useNavigate } from "react-router";

interface TodoDetailProps {
  tno: number;
  title: string;
  writer: string;
  content: string;
}

function TodoDetailComponent({ tno, title, writer, content }: TodoDetailProps) {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/todo/edit/${tno}`);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-800 border-b pb-2">
          {title}
        </h1>
        <p className="text-sm text-gray-500 mt-1">글 번호: #{tno}</p>
      </div>

      <div className="mb-6">
        <p className="text-base text-gray-600 leading-relaxed whitespace-pre-line">
          {content}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-blue-600 font-medium">작성자: {writer}</p>

        <button
          onClick={handleEdit}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          ✏️ 수정
        </button>
      </div>
    </div>
  );
}

export default TodoDetailComponent;
