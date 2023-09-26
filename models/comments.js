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
    }
})

CommentSchema.virtual('url').get(function () {
    return `/comments/${this.id}`
})

const CommentModel = mongoose.model("Comment", CommentSchema)

export default CommentModel