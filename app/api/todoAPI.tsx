import axios from "axios";

const host = "http://localhost:8080/api/v1/todos";

export async function todoList(page: string, size: string) {
  const res = await axios.get(`${host}/list?page=${page}&size=${size}`);

  console.log(res.data);

  return res.data;
}

export async function addTodo(form: TodoAdd) {
  const res = await axios.post(`${host}/new`, form);

  console.log(res.data);

  return res.data;
}
