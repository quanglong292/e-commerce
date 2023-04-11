const BASE_URL = import.meta.env.VITE_BASE_URL;

export default async function (requestParams, body) {
  const [urlPath, method] = requestParams;
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
