const { response } = require("express");

const jwt = require('jsonwebtoken');

const validateJWT = (req, resp = response, next) => { 
    const token = req.header('x-token');

    if (!token) {
        return resp.status(401).json({
            ok: false,
            message: 'Any token has not  been provided'
        });
    }

    try {
        const { user_id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        
        req.user_id = user_id;
        req.name = name

        next();
    } catch (error) {
        console.log(error);
        return resp.status(401).json({
            ok: false,
            message: ' Invalid token'
        });
    }


}

module.exports = {

    validateJWT
}