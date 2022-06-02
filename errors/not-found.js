import CustomError from "./custom-error"

import { StatusCodes } from "http-status-codes"

class NotFoundError extends CustomError {
    constructor(message) {
        super(message), 
        this.status = StatusCodes.NOT_FOUND
    }
}

export default NotFoundError