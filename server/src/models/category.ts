import { model, Schema } from "mongoose";
import { CategoryGroupSchema } from "./categoryGroup";
import { ProductSchema } from "./product";

export const CategorySchema = new Schema({
    id: String,
    name: String,
    group: [CategoryGroupSchema.id],
    products: [ProductSchema],
})

export default model("Category", CategorySchema)