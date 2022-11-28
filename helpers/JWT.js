const jwt = require('jsonwebtoken');

const generateJWT = (user_id, name ) => { 

    return new Promise((resolve, reject) => {
        
        const payload = { user_id, name }
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn:'1h'
        }, (err, token) => { 
            if (err) { 
                console.log(err);
                reject("We could't generate a token")
            }
            resolve(token);
        })
    })
}
module.exports = { generateJWT } 