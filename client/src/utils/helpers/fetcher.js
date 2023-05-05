import useToken from "../composables/useToken";
import handleClientError from "./handleClientError";

const BASE_URL_DEV = import.meta.env.VITE_BASE_URL;
const BASE_URL_PROD = import.meta.env.VITE_BASE_URL_PROD;
const BASE_URL = import.meta.env.PROD ? BASE_URL_PROD : BASE_URL_DEV;

export default async function (requestParams, body) {
  const [urlPath, method] = requestParams;
  const searchParam =
    method === "GET" && body ? "?" + new URLSearchParams(body) : "";

  try {
    const data = await fetch(BASE_URL + urlPath + searchParam, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: useToken().token,
      },
      body: method !== "GET" ? JSON.stringify(body) : undefined,
    }).then((res) => res.json());

    return data;
  } catch (error) {
    handleClientError(error);
  }
}
