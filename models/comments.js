import { Timestamp } from "mongodb";
import mongoose from "mongoose";

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    text: {
        type: String,
        minLength: 1,
        required: true
    },
    timestamp: {
        type: Date,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    // Comments have a relationship with each individual post
    post: {
        type: Schema.Types.ObjectId,
        ref: "Post"
    }

})

CommentSchema.virtual('url').get(function () {
    return `/comments/${this.id}`
})

const CommentModel = mongoose.model("Comment", CommentSchema)

export default CommentModel