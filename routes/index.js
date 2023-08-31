import express from 'express'
import * as userController from '../controllers/userController'
import UserModel from '../models/user'
import PostsModel from '../models/posts'
import asyncHandler from 'express-async-handler'
const router = express.Router()

router.get('/', (req, res) => {
    return res.json({
        message: "Hello"
    })
})



router.get('/user', async(req, res, next) => {
    try {
        const user = await UserModel.find({}).exec()
        res.send(user)
    } catch (err) {
        res.status(500).send({
            message: err.message
        })
    }
})


router.post('/user', async(req, res, next) => {
    try {
        const newUser = new UserModel({
            username: req.body.username,
            password: req.body.password
        })
        await newUser.save()
            .then(data => {
                res.send(data)
            })
    } catch(err) {
        res.status(400).send({
            mesage: err.mesage
        })
    }
})


router.get('/posts', async(req, res, next) => {
    try {
        const posts = await PostsModel.find({}).exec()
        res.send(user)

    } catch(err){
        res.status(404).send({
            message: err.message
        })
    }
})

    




export default {
    router
}