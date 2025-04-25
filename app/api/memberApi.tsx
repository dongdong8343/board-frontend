import axios from "axios";

const host = "http://localhost:8080/api/v1/members";

export async function postSignup(form: Signup) {
  console.log("회원가입 시도");
  console.log(form);

  const res = await axios.post(`${host}/signup`, form);

  console.log(res.data);

  return res.data;
}
