const express = require('express');
const auth = require('../middlewares/auth');
const {
    body
} = require('express-validator');
const {
    createBlog,
    getAllBlogs,
    getUserBlogs,
    getBlog,
    deleteBlog,
    updateBlog
} = require('../controllers/blogController');
const check = [
    body('heading', 'heading is required').notEmpty(),
    body('description', 'blogType is required').notEmpty(),
    body('tags', 'location is required').notEmpty()
]

const router = express.Router();

router
    .route('/')
    .get(getAllBlogs)
    .post([auth, check], createBlog)

router
    .route('/username')
    .get(auth, getUserBlogs)

router
    .route('/:bid')
    .get(auth, getBlog)
    .delete(auth, deleteBlog)
    .patch(auth, updateBlog)

module.exports = router;