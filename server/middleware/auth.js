import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const usableToken = token.replace(/["]+/g, '')

        const decodedToken = jwt.verify(usableToken, process.env.JWT_SECRET) 

        req.userId = decodedToken?.id

        next()
    }catch(err) {
        console.log({message: err.message})
    }
}

export default auth