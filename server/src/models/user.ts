import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    id: String,
    userName: String,
    password: {
        type: String,
        required: true
    },
    avatar: String,
    info: {
        name: String,
        phone: String,
        birthDate: Date,
        mail: String,
        sex: String,
    },
    address: [
        {
            street: String,
            ward: String,
            district: String,
            city: String,
            id: String,
        }
    ],
    carts: [String],
    wishs: [String],
    orderHistory: [String],
})

export default mongoose.model('User', UserSchema);