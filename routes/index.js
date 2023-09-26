import express from 'express'
import * as userController from '../controllers/userController'
import * as postController from '../controllers/postController'
import * as commentController from '../controllers/commentController'
import UserModel from '../models/user'
import PostsModel from '../models/posts'
import asyncHandler from 'express-async-handler'
const router = express.Router()

router.get('/checkValidation', (req, res) => {
    
    return res.send({
        message: "Hello",
        user: req.user,
        id: req.sessionID
    
    })
})

router.get('/test', (req, res) => {
    return res.json({
        message: "failed",
        error: req.flash('error')
    })
})

// USER ROUTES
router.get('/user', userController.findAllUsers_GET)


router.post('/user', userController.createUser_POST)


router.post('/user/login', userController.logIn_POST)

router.post('/user/logout', (req, res, next) => {
    req.logout((err) => {
        if (err){
            return next(err)
        }
        res.redirect('/checkValidation')
    })
})




// POSTS ROUTES //

// GET request for list of all posts
router.get('/posts', postController.findAllPosts_GET)

// POST request for creating a post
router.post('/posts', postController.createPost_POST)
    
// GET request for finding ONE post
router.get('/posts/:id', postController.findOnePost_GET)

// PUT request for updating post
router.put('/posts/:id/', postController.updatePost_PUT)

// DELETE request for deleting post
router.delete('/posts/:id', postController.deletePost_DELETE)



//---------- COMMENT ROUTES---------- //

/* POST request for creating a comment */
router.post('/comments', commentController.createComment_POST)

/* GET request for list of all comments */
router.get('/comments', commentController.findAllComments_GET)

/* GET request for a single comment */
router.get('/comments/:id', commentController.findOneComment_GET)

/* PUT request for updating a comment */
router.put('/comments/:id', commentController.updateComment_PUT)

/* DELETE request for deleting a comment */
router.delete('/comments/:id', commentController.deleteComment_DELETE)

export default {
    router
}