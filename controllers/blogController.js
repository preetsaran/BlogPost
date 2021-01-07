const blogModel = require('../models/blogModel');
const {
    validationResult
} = require('express-validator');

//@route   POST /api/v1/blogs
//@desc    create blog
//@access  private
const createBlog = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        })
    }

    const {
        blogHeading,
        blogTags,
        description,
        date
    } = req.body;

    try {
        const newBlog = new blogModel({
            blogHeading,
            blogTags,
            description,
            date,
            user_id: req.user.id
        })

        const blog = await newBlog.save();

        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }

}

//@route   GET /api/v1/blogs/username
//@desc    get specific user's all blogs
//@access  private
const getUserBlogs = async (req, res) => {

    try {

        const blogs = await blogModel.find({
            user_id: req.user.id
        }).sort({
            date: -1
        });

        if (!blogs) {
            return res.status(400).json({
                'msg': `blog doesn't exists`
            })
        }

        res.status(200).json(blogs);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: error.message
        });
    }
}

//@route   GET /api/v1/blogs/bid
//@desc    get specific blog with unique blog_id
//@access  private
const getBlog = async (req, res) => {

    try {
        const blog = await blogModel.find({
            _id: req.params.eid
        });

        if (!blog) {
            return res.status(400).json({
                'msg': `blog doesn't exists`
            })
        }

        res.status(200).json({
            blog
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: error.message
        });
    }
}


//@route   GET /api/v1/blogs
//@desc    get all articles
//@access  public 
const getAllBlogs = async (req, res) => {

    try {
        const blogs = await blogModel.find().sort({
            date: -1
        });

        if (!blogs) {
            return res.status(400).json({
                'msg': `No blogs to show`
            })
        }

        res.status(200).json(blogs);

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: error.message
        });
    }

}


//@route   DELETE /api/v1/blogs/    
//@desc    DELETE blog with unique blog_id
//@access  provate 
const deleteBlog = async (req, res) => {

    try {
        let blog = await blogModel.findOneAndDelete({
            _id: req.params.bid
        });

        if (!blog) {

            return res.status(400).json({
                'msg': `blog doesn't exists`
            })
        }

        res.status(200).json({
            blog,
            'msg': `blog deleted`
        })

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: error.message
        });
    }


}

//@route   PATCH /api/v1/blogs/    
//@desc    PATCH blog with unique blog_id
//@access  private 
const updateBlog = async (req, res) => {

    try {

        let blog = await blogModel.findOneAndUpdate({
            _id: req.params.eid
        }, req.body, {
            new: true
        });

        if (!blog) {
            return res.status(400).json({
                'msg': `blog doesn't exists`
            })
        }

        res.status(200).json({
            blog,
            'msg': `blog updated`
        })

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports.createBlog = createBlog; //C
module.exports.getBlog = getBlog; //R
module.exports.getUserBlogs = getUserBlogs;
module.exports.getAllBlogs = getAllBlogs;
module.exports.updateBlog = updateBlog; //U
module.exports.deleteBlog = deleteBlog; //D