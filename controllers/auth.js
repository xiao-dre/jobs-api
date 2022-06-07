import httpStatusCodes from 'http-status-codes'
import User from '../models/user'
import { BadRequestError } from '../errors'

const register = (req, res) => {
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
    res.status(httpStatusCodes.CREATED).json(user.parseToJson())
}

const login = (req, res) => {
    res.send('Login Success')
}

export {
    register, 
    login
}