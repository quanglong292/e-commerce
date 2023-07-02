export default (price = 0) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "VND",
  }).format(price);
