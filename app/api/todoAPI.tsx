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

export async function getTodo(tno: string | undefined) {
  const res = await axios.get(`${host}/${tno}`);

  console.log(res.data);

  return res.data;
}

export async function editTodo(tno: string | undefined, form: TodoEdit) {
  const res = await axios.patch(`${host}/${tno}`, form);

  console.log(res.data);

  return res.data;
}

export async function deleteTodo(tno: number | undefined) {
  const res = await axios.delete(`${host}/${tno}`);

  console.log(res.data);

  return res.data;
}
