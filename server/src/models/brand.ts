import mongoose from "mongoose";

// Relations
import { ProductSchema } from "./product";
import { CategorySchema } from "./category";

export const BrandSchema = new mongoose.Schema({
    id: String,
    name: String,
    image: String,
    description: String,
    categories: [CategorySchema],
    stock: {
        available: Number,
        sold: Number,
    },
    products: [ProductSchema],
    fields: String
})

export default mongoose.model('Brand', BrandSchema);