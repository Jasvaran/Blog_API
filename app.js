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



const app = express();

async function main(){
    await mongoose.connect(process.env.DB_URL)
    console.log('Database Connection Successfull')

}
main().catch(err => console.log(err))


mongoose.connection.on('error', err => {
    console.log(err)
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('combined'))
app.use(cookieParser())
app.use('/', router.router)

app.listen(process.env.DB_PORT, () => {
    console.log(`Server listening on port ${process.env.DB_PORT}`)
})