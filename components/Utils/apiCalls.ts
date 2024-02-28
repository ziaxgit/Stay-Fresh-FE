import axios from "axios";

export const getAllItemsByHomeId = (status: string) => {
  return axios
    .get("https://stay-fresh.onrender.com/api/homes/1/items", {
      params: { item_status: status },
    })
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

export const getRecipes = (ingreds: string) => {
  return axios
    .get("https://api.edamam.com/api/recipes/v2", {
      params: {
        type: "public",
        q: ingreds,
        app_id: process.env.EXPO_PUBLIC_EDAMAM_APP_ID,
        app_key: process.env.EXPO_PUBLIC_EDAMAM_APP_KEY,
      },
    })
    .then((response) => {
      return response.data;
    });
};
