import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/todo", "layout/todoLayout.tsx", [
    route("list", "routes/todo/todoList.tsx"),
    route("add", "routes/todo/todoAdd.tsx"),
    route(":tno", "routes/todo/todoDetail.tsx"),
    route("edit/:tno", "routes/todo/todoEdit.tsx"),
    route("signup", "routes/member/signup.tsx"),
  ]),
] satisfies RouteConfig;
