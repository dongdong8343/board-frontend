import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { editTodo } from "~/api/todoAPI";
import ResultComponent from "../common/resultComponent";

interface TodoEditProps {
  tno: string;
  title: string;
  writer: string;
  content: string;
}

type EditTodoArgs = {
  tno: string;
  form: TodoEdit;
};

function TodoEditComponent({ tno, title, writer, content }: TodoEditProps) {
  const navigate = useNavigate();
  const query = useQueryClient();

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);

  const updateMutaion = useMutation({
    mutationFn: ({ tno, form }: EditTodoArgs) => editTodo(tno, form),
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["todos"] });
      query.invalidateQueries({ queryKey: ["tno"] });
      console.log("등록 성공", data);
    },
    onError: (error) => {
      console.log("등록 실패", error);
    },
  });

  const handleEdit = () => {
    const data = {
      editedTitle,
      editedContent,
    };

    console.log(data);

    updateMutaion.mutate({
      tno: String(tno),
      form: data,
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <div className="mb-4">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full text-3xl font-bold text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500 pb-2"
        />
        <p className="text-sm text-gray-500 mt-1">글 번호: #{tno}</p>
      </div>

      <div className="mb-6">
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
          className="w-full text-base text-gray-700 border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 min-h-[180px] leading-relaxed"
        />
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-blue-600 font-medium">작성자: {writer}</p>

        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
          >
            ✏️ 수정
          </button>
        </div>
      </div>
      {updateMutaion.data && (
        <ResultComponent
          msg={"M"}
          closeFn={() => {
            navigate(`/todo/list`);
          }}
        />
      )}
    </div>
  );
}

export default TodoEditComponent;
