import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonmock.hackerrank.com/api/movies",
  timeout: 5000
})

export default api
