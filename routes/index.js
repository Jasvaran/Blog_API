import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
    return res.json({
        message: "Hello"
    })
})



router.get('/users', (req, res) => {
    return res.json()
})

export default {
    router
}