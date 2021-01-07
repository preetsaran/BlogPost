const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const {
    validationResult
} = require('express-validator');
const config = require('config');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    let {
        name,
        username,
        age,
        email,
        password,
        phone
    } = req.body;

    try {

        let user = new userModel({
            name,
            username,
            age,
            email,
            phone
        })

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600 * 24
        }, (err, token) => {
            if (err) throw err;
            res.status(200).json({
                token
            });
        })

    } catch (error) {

        console.log(error)
        if (error.code === 11000) {
            return res.status(400).json({
                msg: 'user already exists'
            });
        }
        res.status(500).json({
            msg: error.message
        });
    }

}

const getUser = async (req, res) => {

    let user = await userModel.findById(req.user.id).select('-password');
    res.send(user);

}


module.exports.createUser = createUser;
module.exports.getUser = getUser;