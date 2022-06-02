import { CustomError } from "../errors"
import { StatusCodes } from "http-status-codes"

const customErrorHandler = async(err, req, res, next) => {
    if(err instanceof CustomError) {
        console.warn(`[-] ${err.message}`)
        console.warn(err)
        return res
            .status(err.status)
            .json({
                success: false, 
                message: err.message
            })
    }
    console.warn('[-] Unidentified Error')
    console.warn(err)
    return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            success: false, 
            message: 'Unidentified Error'
        })
}

export default customErrorHandler