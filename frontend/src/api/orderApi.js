import axios from "axios";
import { getProducts } from "./productApi";
import { getCustomers } from "./customerApi";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const orderApi = axios.create({
  baseURL: API_BASE_URL,
});

export const getOrders = async () => {
  const response =
    await orderApi.get("/orders");

  return response.data;
};

export const createOrder = async (
  order
) => {
  const response =
    await orderApi.post(
      "/orders",
      order
    );

  return response.data;
};

export const deleteOrder = async (
  id
) => {
  const response =
    await orderApi.delete(
      `/orders/${id}`
    );

  return response.data;
};

export const getOrderDetails = async (
  id
) => {
  const response =
    await orderApi.get(
      `/orders/${id}/details`
    );

  return response.data;
};