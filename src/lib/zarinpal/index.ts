import axios from "axios";

const zarinpal = axios.create({
  baseURL: "https://sandbox.zarinpal.com/pg/v4",
  headers: {
    accept: "application/json",
    "content-type": "application/json",
  },
});
export default zarinpal;
