import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRef, type FormEvent } from "react";
import { addTodo } from "~/api/todoAPI";
import ResultComponent from "../common/resultComponent";
import { useNavigate } from "react-router";

export interface TodoFormData {
  title: string;
  writer: string;
  content: string;
}

function TodoAddComponent() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const query = useQueryClient();
  const navigate = useNavigate();

  const mutaion = useMutation({
    mutationFn: addTodo,
    onSuccess: (data) => {
      query.invalidateQueries({ queryKey: ["todos"] });
      console.log("등록 성공", data);
    },
    onError: (error) => {
      console.log("등록 실패", error);
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = formRef.current;

    if (!form) {
      return;
    } else {
      const formData = new FormData(form);

      const data: TodoAdd = {
        title: formData.get("title") as string,
        writer: formData.get("writer") as string,
        content: formData.get("content") as string,
      };

      mutaion.mutate(data);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-8">
          Todo 작성
        </h2>

        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="writer"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              작성자
            </label>
            <input
              type="text"
              id="writer"
              name="writer"
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              내용
            </label>
            <textarea
              id="content"
              name="content"
              rows={5}
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-md transition"
            >
              등록
            </button>
          </div>
        </form>

        {mutaion.data && (
          <ResultComponent
            msg={"등록 완료"}
            closeFn={() => {
              navigate("/todo/list");
            }}
          />
        )}
      </div>
    </div>
  );
}

export default TodoAddComponent;
