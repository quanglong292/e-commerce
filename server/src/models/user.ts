import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    id: String,
    userName: String,
    password: {
        type: String,
        required: true
    },
    info: {
        name: String,
        phone: String,
        avatar: String,
        birthDate: Date,
        mail: String,
    },
    carts: [String],
    wishs: [String],
    orderHistory: [String],
})

export default mongoose.model('User', UserSchema);