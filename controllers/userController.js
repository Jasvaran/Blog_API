import UserModel from "../models/user";
import asyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import passport from "passport";
import bcryptjs from 'bcryptjs'


const findAllUsers_GET = async(req, res) => {
    try {
        const users = await UserModel.find({}).exec()
        res.send(users)

    } catch(err) {
        res.status(404).send({
            message: err.message
        })
    }
}

const createUser_POST = [

    body('username')
        .trim()
        .isLength({min: 1})
        .withMessage('(Username cannot be blank)')
        .escape(),
    body('password')
        .trim()
        .isLength({min: 6})
        .withMessage('(Password Must be atleast 6 characters)')
        .escape(),

    async(req, res, next) => {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            res.status(400).send({
                errors: errors.array()
            })
            return
        }

        try {
            const newUser = new UserModel({
                username: req.body.username,
                password: req.body.password
            })

            bcryptjs.hash(req.body.password, 10, async(err, hashedPassword) => {
                if (err) {
                    next(err)
                }
                newUser.password = hashedPassword
                await newUser.save()
                res.send(newUser)
            })

        } catch(err) {
            res.status(500).send({
                message: err.message,
                info: "something went wrong creating a user"
            })
        }
    }
]








const logIn_POST = async(req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/checkValidation',
        failureRedirect: '/test',
        failureFlash: true,
    })(req, res, next)
}



export {
    findAllUsers_GET,
    createUser_POST,
    logIn_POST

}