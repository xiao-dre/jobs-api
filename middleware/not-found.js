import { NotFoundError } from '../errors/'

const notFound = async(req, res, next) => {
    next(new NotFoundError('Route not Found'))
    // throw new NotFoundError('Route not Found')
}

export default notFound