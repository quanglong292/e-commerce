import { model, Schema } from "mongoose";

export const SettingSchema = new Schema({
    id: String,
    logo: String,
    sizeChart: String,
    jsonFields: String,
})

export default model("Setting", SettingSchema)