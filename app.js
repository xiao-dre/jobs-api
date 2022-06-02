import express from 'express'
import dotenv from 'dotenv'
import notFound from './middleware/not-found.js'

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
    res.send('OK')
})

app.use(notFound)
app.c

app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`)
})