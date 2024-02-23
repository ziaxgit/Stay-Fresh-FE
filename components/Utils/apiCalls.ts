import axios from "axios";

export const getAllItemsByHomeId = () => {
  return axios
    .get("https://stay-fresh.onrender.com/api/homes/1/items")
    .then((data) => {
      return data;
    });
};

export const postItemByHomeId = (newItem: object) => {
  return axios
    .post("https://stay-fresh.onrender.com/api/homes/1/items", newItem)
    .then(({ data }) => {
      return data;
    });
};

export const deleteItem = (item_id: number) => {
  return axios.delete(
    `https://stay-fresh.onrender.com/api/items/${item_id}` ).then((response)=>{return response});
}
