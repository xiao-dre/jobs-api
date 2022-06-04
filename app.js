import express from 'express'
import dotenv from 'dotenv'
import notFound from './middleware/not-found.js'
import customErrorHandler from './middleware/custom-error-handler.js'
import authRouter from './routes/auth'
import jobsRouter from './routes/jobs'

dotenv.config()

const app = express()

const port = process.env.PORT

app.use(express.json())

// Connects

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)

app.use(notFound)
app.use(customErrorHandler)

const startServer = async() => {
    try {
        app.listen(port, () => {
            console.log(`Server Listening on Port ${port}`)
        })
    }
    catch(error) {
        throw error
    }
}

startServer()