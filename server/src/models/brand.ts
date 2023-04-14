import {model, Schema} from "mongoose";

// Relations
import { CategorySchema } from "./category";

export const BrandSchema = new Schema({
    id: String,
    name: String,
    image: String,
    description: String,
    categories: [String],
    stock: {
        available: Number,
        sold: Number,
    },
    fields: String
})

export default model('Brand', BrandSchema);