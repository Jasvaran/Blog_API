import 'dotenv/config';
import  express from 'express';
import cors from 'cors'
import debug from 'debug'
import createHttpError from 'http-errors';
import path from 'path'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import router from './routes';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy
import UserModel from './models/user';
import bcryptjs from 'bcryptjs'
import flash from 'connect-flash'


const app = express();

// console.log(path.resolve(__dirname, '..'))
mongoose.set("strictQuery", false)
async function main(){
    await mongoose.connect(process.env.DB_URL, {useUnifiedTopology: true, useNewUrlParser: true})
    console.log('Database Connection Successfull')

}
main().catch(err => console.log(err))


mongoose.connection.on('error', err => {
    console.log(err)
})


app.use(session({secret: 'cats', resave: false, saveUninitialized: true}))

// this function will be called when we use passport.authenticate() later
passport.use(
    new LocalStrategy(async(username, password, done) => {
       try {
           const user = await UserModel.findOne({username: username});
           
           if (!user) {
               return done(null, false, { message: "incorrect username" })
           };

           bcryptjs.compare(password, user.password, function(err, res){
            if (res){
                console.log("log in works")
                return done(null, user)
            } else {
                return done(null, false, {message: "Incorrect password"})
            }
           })
           
       } catch (err){
           return done(err)
       }
   })
)

// passport will use some data to create a cookie to make sure our user is logged in and stays logged in
passport.serializeUser(function(user, done){
   done(null, user.id)
})

passport.deserializeUser(async function(id, done){
   try {
       const user = await UserModel.findById(id)
       done(null, user)
   } catch (err) {
       done(err)
   }
})


app.use(passport.initialize())
app.use(passport.session())

app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174', 'https://blog-api-9r0h.onrender.com','http://localhost:3000','https://jasvaran.github.io/Blog_Front'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'))
app.use(cookieParser())
app.use(flash()) // middleware for getting error during passport.authenticate()

app.use('/', router.router)







app.listen(process.env.DB_PORT, () => {
    console.log(`Server listening on port ${process.env.DB_PORT}`)
})