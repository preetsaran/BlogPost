const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const { getUser, createUser } = require('../controllers/userController');
const auth = require('../middlewares/auth');

const check = [
    body('name', 'please add name').notEmpty(),
    body('username',"please enter userName").not().isEmpty(),
    body('age',"please enter age").not().isEmpty(),
    body('email', 'please enter a valid email').isEmail(),
    body('phone','enter valid phone Number').isLength({ min: 10 }),
    body('password','password must include atleast 8 characters').isLength({ min: 8 })
    ]
           
router
    .route('/')
    .get(auth,getUser)
    .post(
        check,
        createUser
    )
 
module.exports = router; 