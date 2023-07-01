import { model, Schema } from "mongoose";

export const CategoryGroupSchema = new Schema({
    id: String,
    name: String,
    key: String, // Index
})

export default model("CategoryGroup", CategoryGroupSchema)