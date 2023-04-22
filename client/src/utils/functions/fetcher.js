const BASE_URL_DEV = import.meta.env.VITE_BASE_URL;
const BASE_URL_PROD = import.meta.env.VITE_BASE_URL_2;
let BASE_URL_2 = import.meta.env.PROD
  ? "https://e-commerce-production-67aa.up.railway.app/"
  : BASE_URL_DEV;

export default async function (requestParams, body) {
  const [urlPath, method] = requestParams;
  const searchParam = method === "GET" && body ? ("?" + new URLSearchParams(body)) : "";

  const data = await fetch(BASE_URL_2 + urlPath + searchParam, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: method !== "GET" ? JSON.stringify(body) : undefined,
  }).then((res) => res.json());

  return data;
}
