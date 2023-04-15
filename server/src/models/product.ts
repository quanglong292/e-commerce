import { model, Schema } from "mongoose";

// Relations
import { ComunitySchema } from "./comunity";
import { CategorySchema } from "./category";
import { CategoryGroupSchema } from "./categoryGroup";

export const ProductSchema = new Schema({
    id: Schema.Types.UUID,
    name: String,
    shortName: String,
    group: Schema.Types.UUID,
    category: Schema.Types.UUID,
    brand: String,
    price: Number,
    available: Boolean,
    stock: {
        sold: Number,
        amount: Number,
    },
    size: [String],
    subType: [{
        name: String,
        value: [String],
        stock: Number,
    }],
    detailImages: [String],
    bannerImage: String,
    description: String,
    fields: String
})

export default model('Product', ProductSchema);