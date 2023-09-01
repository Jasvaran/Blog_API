import UserModel from "../models/user";
import asyncHandler from "express-async-handler";
import passport from "passport";


const findUsers_GET = async(req, res) => {
    try {
        const users = await UserModel.find({}).exec()
        res.send(users)

    } catch(err) {
        res.status(404).send({
            message: err.message
        })
    }
}

const createUser_GET = async(req, res) => {
    try {
        const newUser = new UserModel({
            username: req.body.username,
            password: req.body.password
        })
        await newUser.save()
        res.send(newUser)
    } catch(err) {
        res.status(500).send({
            message: err.message,
            info: "something went wrong creating a user"
        })
    }
}

const logIn_POST = async(req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/user',
        failureRedirect: '/test'
    })(req, res, next)
}



export {
    findUsers_GET,
    createUser_GET,
    logIn_POST

}