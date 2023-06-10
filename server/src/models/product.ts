import { model, Schema } from "mongoose";

// Relations
import { ComunitySchema } from "./comunity";
import { CategorySchema } from "./category";
import { CategoryGroupSchema } from "./categoryGroup";

export const ProductSchema = new Schema({
    id: String,
    name: String,
    shortName: String,
    group: [String],
    category: [String],
    brand: String,
    price: Number,
    available: Boolean,
    stocks: [{
        name: String,
        value: String,
    }],
    size: [String],
    subType: [{
        name: String,
        value: [String],
        stock: Number,
    }],
    detailImages: [{
        name: String,
        value: String,
    }],
    bannerImage: String,
    description: String,
    fields: String,
    saleInfo: {
        salePrice: Number
    },
})

export default model('Product', ProductSchema); 