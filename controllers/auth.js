import httpStatusCodes from 'http-status-codes'
import User from '../models/user'
import { BadRequestError } from '../errors'
import knex from 'knex'
import knexConfig from '../knexfile'
import queryPromise from '../db/promises'

const kenxConnect = knex(knexConfig.development)

const register = async (req, res) => {
    const userData = req.body
    let user
    try {
        user = new User(userData.userName, userData.userEmail, userData.userPassword)
    }
    catch(error) {
        throw new BadRequestError('Credentials not valid')
    }
    if(!user.isValid()) {
        throw new BadRequestError('Credentials not Valid')
    }
    console.log(user.parseToJson())
    await queryPromise(kenxConnect().insert(user.parseToJson()).into('msuser'))
    res.status(httpStatusCodes.CREATED).json(user.parseToJson())
}

const login = (req, res) => {
    res.send('Login Success')
}

export {
    register, 
    login
}