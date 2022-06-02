import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const port = process.env.PORT

app.get('/', (req, res) => {
    res.send('OK')
})

app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`)
})