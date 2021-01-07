import React, {
    useReducer
} from 'react';
import axios from 'axios';
import BlogContext from './blogContext';
import BlogReducer from './blogReducer';

import {
    GET_ALL_BLOGS,
    GET_USER_BLOGS,
    ADD_BLOG,
    DELETE_BLOG,
    UPDATE_BLOG,
    FILTER_BLOGS,
    CLEAR_FILTER,
    CLEAR_BLOGS,
    SET_CURRENT,
    CLEAR_CURRENT,
    BLOG_ERROR
} from '../types';

const BlogState = (props) => {

    const initialState = {
        userBlogs: null,
        allBlogs: null,
        current: null,
        filtered: null,
        error: null,
        token: localStorage.getItem('token')
    }

    const [state, dispatch] = useReducer(BlogReducer, initialState);

    const getAllBlogs = async () => {

        try {
            const res = await axios.get('/api/v1/blogs');
            dispatch({
                type: GET_ALL_BLOGS,
                payload: res.data
            });
        } catch (error) {
            dispatch({
                type: BLOG_ERROR,
                payload: error.response.msg
            })
        }

    }

    const getUserBlogs = async () => {

        console.log('userblogs')
        try {
            const res = await axios.get('/api/v1/blogs/username');
            dispatch({
                type: GET_USER_BLOGS,
                payload: res.data
            });
        } catch (error) {

            console.log(error.message)

            dispatch({
                type: BLOG_ERROR,
                payload: error.message
            })
        }
    }

    const addBlog = async (blog) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/v1/blogs', blog, config);
            //not sending token locally bcoz it is set globally hrough our setAuthToken file.
            console.log(res);

            dispatch({
                type: ADD_BLOG,
                payload: res.data
            })

        } catch (error) {

            console.log(error)
            dispatch({
                type: BLOG_ERROR,
                payload: error.response.msg
            })
        }

    }

    const deleteBlog = async (id) => {

        try {
            let res = await axios.delete(`/api/v1/blogs/${id}`);

            dispatch({
                type: DELETE_BLOG,
                payload: id
            })

            return res;
        } catch (error) {
            dispatch({
                type: BLOG_ERROR,
                payload: error.response.msg
            })
            return error.response.msg;
        }

    }

    const updateBlog = async (blog) => {

        try {
            console.log('update')
            
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const res = await axios.patch(`/api/v1/blogs/${blog._id}`, blog, config);

            dispatch({
                type: UPDATE_BLOG,
                payload: res.data.blog
            })

        } catch (error) {

            console.log(error);
            dispatch({
                type: BLOG_ERROR,
                payload: error.response.msg
            })
        }
    }


    const clearBlogs = () => {
        dispatch({
            type: CLEAR_BLOGS
        })
    }

    const setCurrent = (blog) => {
        dispatch({
            type: SET_CURRENT,
            payload: blog
        })
    }

    const clearCurrent = () => {
        dispatch({
            type: CLEAR_CURRENT
        })
    }

    const filterBlog = (text) => {
        dispatch({
            type: FILTER_BLOGS,
            payload: text
        })
    }

    const clearFilter = () => {
        dispatch({
            type: CLEAR_FILTER
        })
    }

    return ( <BlogContext.Provider value = {
            {
                allBlogs: state.allBlogs,
                userBlogs: state.userBlogs,
                current: state.current,
                filtered: state.filtered,
                error: state.error,
                getAllBlogs,
                getUserBlogs,
                addBlog,
                deleteBlog,
                clearBlogs,
                setCurrent,
                clearCurrent,
                updateBlog,
                filterBlog,
                clearFilter
            }
        } >
        {
            props.children
        } </BlogContext.Provider> 
    );
}

export default BlogState;