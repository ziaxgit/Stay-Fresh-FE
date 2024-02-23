import axios from "axios";

export const getAllItemsByHomeId = () => {
  return axios
    .get("https://stay-fresh.onrender.com/api/homes/1/items")
    .then((data) => {
      return data;
    });
};
