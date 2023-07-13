export default (price = 0) =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "VND",
  }).format(price);
