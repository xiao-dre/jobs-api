import httpStatusCodes from 'http-status-codes'
import User from '../models/user'
import { BadRequestError } from '../errors'
import knex from 'knex'
import knexConfig from '../knexfile'
import queryPromise from '../db/promises'
import jwt from 'jsonwebtoken'

const kenxConnect = knex(knexConfig.development)

const register = async (req, res, next) => {
    const { userName, userEmail, userPassword } = req.body
    let user
    try {
        user = new User(userName, userEmail, userPassword)
    }
    catch(error) {
        return next(new BadRequestError('Credentials not valid'))
    }
    if(!user.isValid()) {
        return next(new BadRequestError('Credentials not Valid'))
    }
    try {
        await queryPromise(kenxConnect().insert(user.parseToJson()).into('msuser'))
    }
    catch(error) {
        return next(new BadRequestError('Username has been used'))
    }
    const token = jwt.sign({userID: user.userID, userPasswordHash: user.userPasswordHash}, process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(httpStatusCodes.CREATED).json({token: token})
}

const login = (req, res) => {
    res.send('Login Success')
}

export {
    register, 
    login
}