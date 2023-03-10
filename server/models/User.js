// Usermodels in lucid chart
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String, 
            required: true,
            min: 2,
            max: 33,
        }, 
        lastName: {
            type: String, 
            required: true,
            min: 2,
            max: 33,
        }, 
        email: {
            type: String, 
            required: true,
            max: 33,
            // you cannot have duplicate emails add unique is true 
            unique: true
        }, 
        password: {
            type: String, 
            required: true,
            min: 7,
        },
        picturePath: {
            type: String, 
            default: "",
        },
        friends: {
            type: Array, 
            default: []
        },
        viewedProfile: Number,
        location: String,
        occupation: String,
        impressions: Number, 
    },  { timestamps: true }
    );

    const User = mongoose.model("User", UserSchema)
    export default User;
