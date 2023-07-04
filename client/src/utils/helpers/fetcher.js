import { notification } from "antd";
import useToken from "../composables/useToken";
import handleClientError from "./handleClientError";
import cloneDeep from "lodash/cloneDeep";

const BASE_URL_DEV = import.meta.env.VITE_BASE_URL;
const BASE_URL_PROD = import.meta.env.VITE_BASE_URL_PROD;
const BASE_URL = import.meta.env.PROD ? BASE_URL_PROD : BASE_URL_DEV;

const validateParams = (params) => {
  if (!params) return;
  const cloneParams = cloneDeep(params);
  Object.entries(cloneParams).forEach(([key, value]) => {
    if (!value) delete cloneParams[key];
  });

  return cloneParams;
};

export default async function (requestParams, body) {
  const [urlPath, method] = requestParams;
  const searchParam =
    method === "GET" && body
      ? "?" + new URLSearchParams(validateParams(body))
      : "";

  console.log({ searchParam, full: BASE_URL + urlPath + searchParam, method });

  try {
    const response = await fetch(BASE_URL + urlPath + searchParam, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: useToken().token,
      },
      body: method !== "GET" ? JSON.stringify(body) : undefined,
    });
    const jsonData = await response.json();
    if (response.status > 400) throw { message: jsonData };
    return jsonData;
  } catch (error) {
    handleClientError(error);
    throw error;
  }
}
