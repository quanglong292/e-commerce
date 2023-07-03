import { model, Schema } from "mongoose";

export const CategoryGroupSchema = new Schema({
    id: String,
    name: String,
    key: String, // Index
    imageUrl: String
})

export default model("CategoryGroup", CategoryGroupSchema)