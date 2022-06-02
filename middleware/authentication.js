import jwt from 'jsonwebtoken'

import { UnauthenticatedError } from '../errors'

const authentication = async(req, res, next) => {
    const authorization = req.headers.authorization
    if(!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthenticatedError('No Authorization Header')
    }
    try {
        const token = authorization.split(' ')[1]
        const decodedToken = jwt.decode(token)
        const { username, password } = decodedToken
        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
        req.body.user = {
            username: username, 
            password: hashedPassword
        }
        next()
    }
    catch(error) {
        throw new UnauthenticatedError('Credentials not Valid')
    }
}

export default authentication