import { model, Schema } from "mongoose";
import { CategoryGroupSchema } from "./categoryGroup";
import { ProductSchema } from "./product";

export const CategorySchema = new Schema({
    id: String,
    name: String,
    groups: [String],
    description: String
})

export default model("Category", CategorySchema)