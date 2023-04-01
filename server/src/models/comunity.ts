import { model, Schema } from "mongoose";

const CommentSchema = new Schema({
    id: String,
    content: String,
    rating: Number,
    images: Image,
    videoUrl: String,
})

export const ComunitySchema = new Schema({
    id: String,
    comments: [CommentSchema],
    rate: {
        total: Number,
        medium: Number,
        highest: Number,
    }
})

export default model("Comunity", ComunitySchema)