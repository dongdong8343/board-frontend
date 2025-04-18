import { Link, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Todo App</h1>
        <nav className="space-x-4">
          <Link
            to="/todo/list"
            className={`px-4 py-2 rounded-lg font-medium transition`}
          >
            목록 보기
          </Link>
          <Link
            to="/todo/add"
            className={`px-4 py-2 rounded-lg font-medium transition`}
          >
            할 일 추가
          </Link>
        </nav>
      </header>

      <main className="p-6">
        <Outlet />
      </main>
    </div>
  );
}
