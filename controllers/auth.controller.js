const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../Models/User');

const { generateJWT } = require('../helpers/JWT');

const createNewUser = async (req, resp = response) => { 
    const { name, email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if (user) { 
            return resp.status(400).json({
                ok: false,
                message: 'User has already exist'
            })
        }
        user = new User({ name, email, password });

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();
        
        // ? generating a JWT 
        const token = await generateJWT(user._id, user.name);
        
        resp.status(201).json({
            ok: true,
            message: 'User has been created success',
            user: {
                user_id: user.user_id,
                name: user.name,
                email: user.email,
                token
            }
        });

    } catch (error) {
        return resp.status(500).json({
            ok: false,
            message:'Please communicate with a system propider'
        })
    }
 
}

const loginWithEmailAndPassword = async (req, resp = response) => { 

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) { 
            return resp.status(400).json({
                ok: false,
                message: 'Error, please check your credentials'
            })
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) { 
            return resp.status(400).json({
                ok: false,
                message:'Error, please check your credentials'
            })
        }

        // ? generating a JWT 
        const token = await generateJWT(user._id, user.name);
        resp.json({
            ok: true,
            userCrendentials: {
                user_id: user._id,
                email,
                token
            }
        }); 
    } catch (error) {

          return resp.status(500).json({
            ok: false,
            message:'Please communicate with a system propider'
        })
    }

   
   
}

const revalidateToken = async (req, resp = response) => { 

    try {
        const { user_id, name } = req
        if (user_id) { 
            // ? revalidate old  JWT 
            const token = await generateJWT(user_id, name); 
            return resp.status(200).json({
                ok: true,
                message:'This is your new token',
                token
            });
        }
        return resp.status(400).json({
            ok: false,
            message: "we could'nt renew token",
        });
    
   } catch (error) {
       return resp.status(500).json({
           ok: false,
           message: 'Please, Comunicate with a system provider'
     })
   }

}


module.exports = { createNewUser, loginWithEmailAndPassword, revalidateToken };