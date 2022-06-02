import { NotFoundError } from "../errors"

const notFound = async(req, res) => {
    throw new NotFoundError('Route not Found')
}

export default notFound