import CustomError from "./custom-error"

import { StatusCodes } from "http-status-codes"

class UnauthenticatedError extends CustomError {
    constructor(message) {
        super(message), 
        this.status = StatusCodes.UNAUTHORIZED
    }
}

export default UnauthenticatedError