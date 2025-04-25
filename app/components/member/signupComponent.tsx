import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { postSignup } from "~/api/memberApi";
import ResultComponent from "../common/resultComponent";
import { useNavigate } from "react-router";

type FormData = {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const [form, setForm] = useState<FormData>({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const mutaion = useMutation({
    mutationFn: postSignup,
    onSuccess: (data) => {
      console.log("회원가입 성공", data);
    },
    onError: (error) => {
      setError("회원가입에 실패했습니다.");
      console.log("회원가입 실패", error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }
    setError(null);
    console.log("회원가입 정보:", form);

    const data = {
      email: form.email,
      nickname: form.nickname,
      password: form.password,
    };

    mutaion.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          회원가입
        </h2>

        {error && (
          <div className="text-red-500 bg-red-100 p-2 rounded text-sm text-center">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="이메일"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="text"
            name="nickname"
            value={form.nickname}
            onChange={handleChange}
            placeholder="닉네임"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="비밀번호"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="비밀번호 확인"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition"
        >
          가입하기
        </button>
      </form>

      {mutaion.data && (
        <ResultComponent
          msg={"🎉 회원가입을 축하합니다!"}
          closeFn={() => {
            navigate(`/todo/list`);
          }}
        />
      )}
    </div>
  );
}
