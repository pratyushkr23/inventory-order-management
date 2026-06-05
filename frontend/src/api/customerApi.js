import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL;

export const customerApi = axios.create({
  baseURL: API_BASE_URL,
});

export const getCustomers = async () => {
  const response =
    await customerApi.get("/customers");

  return response.data;
};

export const createCustomer = async (
  customer
) => {
  const response =
    await customerApi.post(
      "/customers",
      customer
    );

  return response.data;
};

export const deleteCustomer = async (
  id
) => {
  const response =
    await customerApi.delete(
      `/customers/${id}`
    );

  return response.data;
};