import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  id: String,
  creator: String,
  createDate: String,
  totalPrice: Number,
  shippingOrderInfo: Object,
  user: Object,
  products: [
    {
      amount: Number,
      id: String,
      value: String,
      info: {
        name: String,
        image: String,
        price: Number,
      },
    },
  ],
  status: String,
  isWholeSale: Boolean,
});

export default mongoose.model("Carts", CartSchema);
