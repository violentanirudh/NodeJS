const { verifyJWT } = require('../services/auth')

const handleUserValidation = () => {

    return async (req, res, next) => {
        
        req.user = null

        if (!req.cookies.user)
            return next()
        
        const token = await verifyJWT(req.cookies.user)
        if (!token)
            return next()
            
        req.user = token
        return next()
    }
}

const handleAuthorization = (roles = []) => {
    return (req, res, next) => {
        if (!req.user) 
            return res.status(401).redirect('/signin')
        
        if (!roles.includes(req.user.roles))
            return res.status(401).json('UnAuthorized')

        return next()
    } 
}

module.exports = {
    handleUserValidation,
    handleAuthorization
}