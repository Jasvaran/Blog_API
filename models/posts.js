import mongoose from "mongoose";

const Schema = mongoose.Schema

const PostsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
})

PostsSchema.virtual("url").get(function () {
    return `/posts/${this.id}`
})

const PostsModel = mongoose.model("Posts", PostsSchema)

export default PostsModel