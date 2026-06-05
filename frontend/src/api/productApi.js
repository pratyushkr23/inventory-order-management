import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const productApi = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async () => {
  const response =
    await productApi.get("/products");

  return response.data;
};

export const createProduct = async (
  product
) => {
  const response =
    await productApi.post(
      "/products",
      product
    );

  return response.data;
};

export const deleteProduct = async (
  id
) => {
  const response =
    await productApi.delete(
      `/products/${id}`
    );

  return response.data;
};

export const getProductById = async (
  id
) => {
  const response =
    await productApi.get(
      `/products/${id}`
    );

  return response.data;
};

export const updateProduct = async (
  id,
  product
) => {
  const response =
    await productApi.put(
      `/products/${id}`,
      product
    );

  return response.data;
};