import mongoose, { SchemaType } from "mongoose";

const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: {
        type: String,
        minLength: 1,
        maxLength: 30,
        required: true,
    },
    password: {
        type: String,
        minLength: 6,
        maxLength: 30,
        required: true
    },
})

UserSchema.virtual('url').get(function (){
    return `/user/${this.id}`
})

const UserModel = mongoose.model("User", UserSchema)

export default UserModel