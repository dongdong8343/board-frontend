import axios from "axios";

const host = "http://localhost:8080/api/v1/todos";

export async function todoList(page: string, size: string) {
  const res = await axios.get(`${host}/list?page=${page}&size=${size}`);

  console.log("data----------------------------------");
  console.log(res.data);

  return res.data;
}
