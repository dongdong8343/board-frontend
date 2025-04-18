import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/todo", "layout/todoLayout.tsx", [
    route("list", "routes/todo/todoList.tsx"),
    route("add", "routes/todo/todoAdd.tsx"),
  ]),
] satisfies RouteConfig;
