import { useState } from "react";

interface ResultComponentProps {
  msg: string;
  closeFn: () => void;
}

export default function ResultComponent({
  msg,
  closeFn,
}: ResultComponentProps) {
  const [showFlag, setShowFlag] = useState(!!msg);

  function getMsg() {
    if (msg === "D") return "✅ 삭제가 완료되었습니다.";
    if (msg === "M") return "✏️ 수정이 완료되었습니다.";
    return msg;
  }

  if (!showFlag) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-50"
      style={{ backgroundColor: "rgba(169, 169, 169, 0.7)" }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-96 max-w-full p-6 text-center space-y-6 animate-fadeIn">
        <p className="text-lg font-semibold text-gray-800">{getMsg()}</p>

        <button
          onClick={() => {
            setShowFlag(false);
            closeFn();
          }}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
