import PostsModel from "../models/posts";
import UserModel from "../models/user";
import fs from 'node:fs'
import path from 'node:path'


const findAllPosts_GET = async(req, res, next) => {
    try {
        const posts = await PostsModel.find({}).exec()
        res.send(posts)

    } catch(err){
        res.status(500).send({
            message: err.message,
            additional_msg: "Something went wrong while getting a list of all posts"
        })
    }
}

const createPost_POST = async(req, res, next) => {
    try {
        console.log('req.file ------->',req.file)
        const currentUser = await UserModel.findById(req.user.id)

        const directoryVar = path.resolve(__dirname, '..')

        if (!req.file){
            throw new Error("Must upload image")
        }
        
        const newPost = new PostsModel({
            title: req.body.title,
            text: req.body.text,
            user: currentUser._id,
            blogpic: {
                data: fs.readFileSync(path.join(directoryVar + '/uploads/' + req.file.filename)),
                contentType: req.file.mimetype
            }

        })
        await newPost.save()
        return res.send(newPost)

    } catch (error) {
        res.status(500).send({
            message: error.message,
            info: "Something went wrong creating post"
        })
    }
}

const findOnePost_GET = async(req, res, next) => {
    try {
        const post = await PostsModel.findById(req.params.id)
        res.send(post)
    } catch (error) {
        return res.status(404).send({
            message: error.message,
            info: "Something went wrong finding post"
            
        })
    }
}

const updatePost_PUT = async(req, res, next) => {
    try {
        const currentUser = await UserModel.findById(req.user.id)
        const post = new PostsModel({
            title: req.body.title,
            text: req.body.text,
            user: currentUser._id,
            _id: req.params.id
        })

        const updatedPost = await PostsModel.findByIdAndUpdate(req.params.id, post, {returnDocument: "after"}).exec()
        res.send(updatedPost)

    } catch (err) {
        res.status(500).send({
            message: err.message,
            info: "Post update failed"
        })
    }
}

const deletePost_DELETE = async(req, res, next) => {
    try {
        const currentPost = await PostsModel.findByIdAndRemove(req.params.id).exec()
        res.send({message: "Post deleted successfully"})

    } catch (error) {
        return res.status(500).send({
            message: error.message
        })
    }
}



export {
    findAllPosts_GET,
    createPost_POST,
    findOnePost_GET,
    updatePost_PUT,
    deletePost_DELETE
}