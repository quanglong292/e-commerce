import { model, Schema } from "mongoose";

// Relations
import { ComunitySchema } from "./comunity";
import { CategorySchema } from "./category";
import { CategoryGroupSchema } from "./categoryGroup";

export const ProductSchema = new Schema({
    id: String,
    group: CategoryGroupSchema,
    category: CategorySchema,
    type: String,
    name: String,
    brand: {
        name: String,
        image: Image,
    },
    price: Number,
    available: Boolean,
    stock: {
        available: Number,
        sold: Number
    },
    comunity: ComunitySchema,
    fields: String
})

export default model('Product', ProductSchema);