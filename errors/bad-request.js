import CustomError from "./custom-error"

import { StatusCodes } from 'http-status-codes'

class BadRequestError extends CustomError {
    constructor(message) {
        super(message), 
        this.status = StatusCodes.BAD_REQUEST
    }
} 

export default BadRequestError