import { model, Schema } from "mongoose";

export const SaleSchema = new Schema({
    id: String,
    title: String,
    products: [String],
    description: String,
    startDate: String,
    endDate: String,
    value: Number,
    isEndDate: Boolean
})

export default model("Sale", SaleSchema)