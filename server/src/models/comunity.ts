import { model, Schema } from "mongoose";

const ThreadComment = new Schema({
    id: {
        type: String,
        require: true
    },
    parentId: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    content: String,
    like: Number,
    disLike: Number,
    date: String,
})

const ThreadCommentModel = model("ThreadComment", ThreadComment)

const ComunitySchema = new Schema({
    id: {
        type: String,
        require: true
    },
    userId: {
        type: String,
        require: true
    },
    productId: {
        type: String,
        require: true
    },
    isBought: Boolean,
    content: String,
    rating: Number,
    images: [String],
    videoUrl: String,
    like: Number,
    disLike: Number,
    date: String,
})

export default model("Comunity", ComunitySchema)
export { ThreadComment, ThreadCommentModel, ComunitySchema }