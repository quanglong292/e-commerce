const BASE_URL_DEV = import.meta.env.VITE_BASE_URL;
const BASE_URL_PROD = import.meta.env.VITE_BASE_URL_2;

export default async function (requestParams, body) {
  const [urlPath, method] = requestParams;
  let BASE_URL = import.meta.env.PROD ? BASE_URL_PROD : BASE_URL_DEV;
  console.log("fetcher", {
    BASE_URL,
    BASE_URL_DEV,
    BASE_URL_PROD,
    isProd: import.meta.env.PROD,
    urlPath,
  });
  const data = await fetch(BASE_URL + urlPath, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
  console.log("data2", data);

  return data;
}
