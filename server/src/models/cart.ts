import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    id: String,
    creator: String,
    createDate: String,
    totalPrice: Number,
    products: [String],

})

export default mongoose.model('Carts', CartSchema);