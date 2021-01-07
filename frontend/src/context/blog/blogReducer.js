import {
    GET_ALL_BLOGS,
    GET_USER_BLOGS,
    ADD_BLOG,
    DELETE_BLOG,
    UPDATE_BLOG,
    CLEAR_BLOGS,
    FILTER_BLOGS,
    CLEAR_FILTER,
    SET_CURRENT,
    CLEAR_CURRENT,
    BLOG_ERROR
} from '../types';

const BlogReducer = (state, action) => {

    switch (action.type) {

        case GET_ALL_BLOGS:
            return {
                ...state,
                allBlogs: action.payload,
                loading: false
            }

        case GET_USER_BLOGS:
            return {
                ...state,
                userBlogs: action.payload,
                    loading: false
            }

        case ADD_BLOG:
            return {
                ...state,
                userBlogs: [action.payload, ...state.userBlogs],
                loading: false
            }

        case UPDATE_BLOG:
            return {
                ...state,
                userBlogs: state.userBlogs.map((blog) => {
                        return blog._id === action.payload._id ? action.payload : blog
                    }),
                    loading: false
            }

        case DELETE_BLOG:
            return {
                ...state,
                userBlogs: state.userBlogs.filter((blog) => {
                        return blog._id !== action.payload
                    }),
                    loading: false
            }
        
        case CLEAR_BLOGS:
            return {
                ...state,
                userBlogs: null,
                    allBlogs: null,
                    current: null,
                    error: null,
            }

        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }

        case FILTER_BLOGS:
            return {
                ...state,
                filtered: state.allBlogs.filter((blog) => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return blog.tags[0].includes(regex) || blog.heading.match(regex)
                })
            }
            
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
            
        case BLOG_ERROR:
                return {
                    ...state,
                    error: action.payload,  
                        loading: false
            }

        default:
                return state;
    }
}

export default BlogReducer;