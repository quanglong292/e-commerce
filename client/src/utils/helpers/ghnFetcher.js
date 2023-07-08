import handleClientError from "./handleClientError";
import cloneDeep from "lodash/cloneDeep";

const BASE_URL = import.meta.env.VITE_GHN_URL;

// const validateParams = (params) => {
//   if (!params) return;
//   const cloneParams = cloneDeep(params);
//   Object.entries(cloneParams).forEach(([key, value]) => {
//     if (!value) delete cloneParams[key];
//   });

//   return cloneParams;
// };

async function fetcher(method, body) {
  //   const searchParam =
  //     method === "GET" && body
  //       ? "?" + new URLSearchParams(validateParams(body))
  //       : "";

  try {
    const response = await fetch(BASE_URL + method, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ShopId: import.meta.env.VITE_GHN_SHOPID,
        Token: import.meta.env.VITE_GHN_TOKEN,
      },
      body: JSON.stringify(body),
    });
    const jsonData = await response.json();
    if (response.status > 400) throw { message: jsonData };
    return jsonData;
  } catch (error) {
    handleClientError(error);
    throw error;
  }
}

// Create
const createOrder = async (body) => {
  const data = await fetcher("create", { ...demoCreateBody, ...body });

  if (data?.code >= 400) throw { message: data.code_message_value };

  return data;
};

const getGHNOrder = async (order_code) => {
  // console.log({ getGHNOrder: order_code });
  if (!order_code) throw "Missing body";

  const data = await fetcher("detail", { order_code });
  if (data?.code >= 400) throw { message: data.code_message_value };

  // console.log({ getGHNOrder: order_code, data });
  return data;
};

export { fetcher, createOrder, getGHNOrder };

var demoCreateBody = {
  payment_type_id: 2,
  note: "Tintest 123",
  from_name: "Tin",
  from_phone: "0909999999",
  from_address: "123 Đường 3/2",
  from_ward_name: "Phường 5",
  from_district_name: "Quận 11",
  from_province_name: "TP Hồ Chí Minh",
  required_note: "KHONGCHOXEMHANG",
  return_name: "Tin",
  return_phone: "0909999999",
  return_address: "123 Đường 3/2",
  return_ward_name: "Phường 5",
  return_district_name: "Quận 11",
  return_province_name: "TP Hồ Chí Minh",
  client_order_code: "",
  to_name: "Độ Mixi",
  to_phone: "0909998877",
  to_address: "Streaming house",
  to_ward_name: "Phường 14",
  to_district_name: "Quận 10",
  to_province_name: "TP Hồ Chí Minh",
  cod_amount: 200000,
  content: "Theo New York Times",
  weight: 200,
  length: 1,
  width: 19,
  height: 10,
  cod_failed_amount: 2000,
  pick_station_id: 1444,
  deliver_station_id: null,
  insurance_value: 10000000,
  service_id: 0,
  service_type_id: 2,
  coupon: null,
  pick_shift: null,
  pickup_time: 1665272576,
  items: [
    {
      name: "Áo Polo",
      code: "Polo123",
      quantity: 1,
      price: 200000,
      length: 12,
      width: 12,
      height: 12,
      category: {
        level1: "Áo",
      },
    },
  ],
};
