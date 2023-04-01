import { model, Schema } from "mongoose";

export const CategoryGroupSchema = new Schema({
    id: String,
    name: String,
})

export default model("CategoryGroup", CategoryGroupSchema)