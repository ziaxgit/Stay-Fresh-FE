import axios from "axios";

export const getAllItemsByHomeId = () => {
  return axios
    .get("https://stay-fresh.onrender.com/api/homes/1/items")
    .then((data) => {
      return data;
    });
};

export const postItemByHomeId = (newItem: object) => {
  console.log("====================================");
  console.log(newItem, "<<< newItem");
  console.log("====================================");
  return axios
    .post("https://stay-fresh.onrender.com/api/homes/1/items", newItem)
    .then(({ data }) => {
      return data;
    });
};

export const getUserNameByHomeId = () => {
  return axios
    .get("https://stay-fresh.onrender.com/api/users")
    .then(({ data }) => {
      return data;
    });
};
export const deleteItem = (item_id: number) => {
  return axios
    .delete(`https://stay-fresh.onrender.com/api/items/${item_id}`)
    .then((response) => {
      return response;
    });
};

export const getHomeName = () => {
  return axios
    .get("https://stay-fresh.onrender.com/api/homes")
    .then(({ data }) => {
      return data;
    });
};

export const patchItemById = (item_id: number, updatedItem: object) => {
  return axios
    .patch(`https://stay-fresh.onrender.com/api/items/${item_id}`, updatedItem)
    .then((response) => {
      return response.data;
    });
};
