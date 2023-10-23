import CommentModel from "../models/comments";
import UserModel from "../models/user";


const findAllComments_GET = async(req, res) => {
    try {
        const comments = await CommentModel.find({})
            .populate("user")
            .exec()
        
        console.log(comments)
        res.send(comments)
        
    } catch (error) {
        res.status(500).send({
            message: error.message,
            info: "Something went wrong trying to retrieve list of comments"
        })
    }
}



const findOneComment_GET = async(req, res) => {
    try {
        const comment = await CommentModel.findById(req.params.id).exec()
        res.send(comment)
    } catch (error) {
        res.status(404).send({
            message: error.message
        })
    }
}

const createComment_POST = async(req, res) => {
    try {

        const currentUser = await UserModel.findById(req.user.id)

        const newComment = new CommentModel({
            text: req.body.text,
            timestamp: new Date(Date.now()),
            user: currentUser._id,
            post: req.body.postId
        })
        await newComment.save()
        res.send(newComment)
    } catch (error) {
        res.status(500).send({
            message: error.message,
            info: "Something went wrong creating comment'"
        })
    }
}

const updateComment_PUT = async(req, res) => {
    try {

        const currentUser = await UserModel.findById(req.user.id)

        const updatedComment = new CommentModel({
            text: req.body.text,
            timestamp: new Date(Date.now()),
            user: currentUser._id,
            _id: req.params.id
        })
        const update = await CommentModel.findByIdAndUpdate(req.params.id, updatedComment, {returnDocument: "after"}).exec()
        res.send(update)
    } catch (error) {
        res.status(500).send({
            message: error.message,
            info: "Comment update failed"
        })
    }
}

const deleteComment_DELETE = async(req, res) => {
    try {
        const currentComment = await CommentModel.findByIdAndDelete(req.params.id)
        res.send({message: "Comment deleted successfully"})

    } catch (error) {
        res.status(500).send({
            message: error.message,
            info: "Comment deletion failed"
        })
    }
}

export {
    findAllComments_GET,
    findOneComment_GET,
    createComment_POST,
    updateComment_PUT,
    deleteComment_DELETE
}