import httpStatusCodes from 'http-status-codes'
import User from '../models/user'
import { BadRequestError, UnauthenticatedError } from '../errors'
import knex from 'knex'
import knexConfig from '../knexfile'
import queryPromise from '../db/promises'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

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
    const token = jwt.sign({userName: user.userName, userPasswordHash: user.userPasswordHash}, process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(httpStatusCodes.CREATED).json({token: token})
}

const login = async (req, res) => {
    const { userName, userPassword } = req.body
    const userPasswordHash = crypto.createHash('sha256').update(userPassword, 'utf-8').digest('hex')
    const result = await queryPromise(kenxConnect().select('userName').where({userName: userName, userPasswordHash: userPasswordHash}).from('msuser'))
    if(result == []) {
        throw new UnauthenticatedError('Username or/and Password Invalid')
    }
    const token = jwt.sign({userName: userName, userPasswordHash: userPasswordHash}, process.env.JWT_SECRET, {expiresIn: '30d'})
    res.status(httpStatusCodes.ACCEPTED).json({token: token})
}

export {
    register, 
    login
}