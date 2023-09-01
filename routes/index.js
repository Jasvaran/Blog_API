import express from 'express'
import * as userController from '../controllers/userController'
import UserModel from '../models/user'
import PostsModel from '../models/posts'
import asyncHandler from 'express-async-handler'
const router = express.Router()

router.get('/', (req, res) => {
    return res.json({
        message: "Hello",
        user: req.user
    })
})



router.get('/user', userController.findUsers_GET)


router.post('/user', userController.createUser_GET)


router.post('/user/login', userController.logIn_POST)



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