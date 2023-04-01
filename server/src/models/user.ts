import mongoose from "mongoose";

// Relations

export const UserSchema = new mongoose.Schema({
    id: String,
    userName: String,
    password: String,
    info: {
        name: String,
        phone: String,
        avatar: String
    },
    totalCart: Number,
})

export default mongoose.model('User', UserSchema);