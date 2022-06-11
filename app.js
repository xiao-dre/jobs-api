import express from 'express'
import dotenv from 'dotenv'
import notFound from './middleware/not-found.js'
import customErrorHandler from './middleware/custom-error-handler.js'
import authRouter from './routes/auth'
import jobsRouter from './routes/jobs'
import authentication from './middleware/authentication.js'

import helmet from 'helmet'
import cors from 'cors'
import rateLimiter from 'express-rate-limit'

dotenv.config()

const app = express()

const port = process.env.PORT

app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100
}))
app.use(express.json())
app.use(helmet())
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('JOBS API')
})
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', authentication, jobsRouter)

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