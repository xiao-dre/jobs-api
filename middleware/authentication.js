import jwt from 'jsonwebtoken'

import { UnauthenticatedError } from '../errors'

const authentication = async(req, res, next) => {
    const authorization = req.headers.authorization
    if(!authorization || !authorization.startsWith('Bearer ')) {
        return next(new UnauthenticatedError('No Authorization Header'))
    }
    try {
        const token = authorization.split(' ')[1]
        const decodedToken = jwt.decode(token)
        const { userName, userPasswordHash } = decodedToken
        req.body.user = {
            userName: userName, 
            userPasswordHash: userPasswordHash
        }
        next()
    }
    catch(error) {
        return next(new UnauthenticatedError('Credentials not Valid'))
    }
}

export default authentication