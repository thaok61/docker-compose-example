import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const token = cookies.get("token");
var authorization = "";

if (token != null) {
  authorization = token;
}

export default axios.create({
  baseURL: "http://172.20.0.3:5001",
  // baseURL: "http://localhost:8696",
  headers: {
    "Content-Type": "application/json",
    "x-auth-token": authorization,
  },
});
