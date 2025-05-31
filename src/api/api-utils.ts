import axios from "axios";
import { endpoints } from "./index";

export const getAssets = async () => {
  const url = endpoints.getAssets;
  return axiosRequest("get", url);
};

const axiosRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string
) => {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const config = {
      method,
      url,
      headers,
    };

    console.log("Request config:", {
      method,
      url,
    });

    const response = await axios(config);
    console.log("Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Ошибка при выполнении запроса:", error);
    throw error;
  }
};