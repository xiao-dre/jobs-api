import express from 'express'
import dotenv from 'dotenv'
import notFound from './middleware/not-found.js'
import customErrorHandler from './middleware/custom-error-handler.js'

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())

app.get('/', (req, res) => {
    res.send('OK')
})

app.use(notFound)
app.use(customErrorHandler)

app.listen(port, () => {
    console.log(`Server Listening on Port ${port}`)
})