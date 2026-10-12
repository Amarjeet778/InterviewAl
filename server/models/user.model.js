import mongoose from "mongoose";


const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    credits: {
        type: Number,
        default: 100,
    },

}, { timestamps: true });

const User = mongoose.model("User", Userschema);

export default User;