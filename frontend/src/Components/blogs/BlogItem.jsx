import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import blogContext from '../../context/blog/blogContext';
import AlertContext from '../../context/alert/alertContext';

const BlogItem = ({ blog , page ,myRef}) => {

    const { date, description, heading, tags , _id } = blog;
    const BlogContext = useContext(blogContext);
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const { deleteBlog , setCurrent , clearCurrent } = BlogContext;
    
    const handleDelete = async () => {
        
        let res = await deleteBlog(_id);

        if(res.data.msg)
            setAlert(res.data.msg, 'success');
        else
            setAlert(res, 'danger');
        
        clearCurrent();
        
    }

    const handleEdit = () => {
        myRef.current.scrollIntoView()  
        setCurrent(blog);
    }

    return (
        
        <div className='card bg-light'>
            <h1 className="text-primary text-left">
                {heading}
            </h1>  
            
            <div className='article-content'>

                <div>
                    <i className="fa fa-calendar" ></i>{date.split('T')[0]}
                </div> 
                <ul className="list">
                    {description && (<li>
                        {description}
                    </li>)}
                </ul>
            
                <span className='badge badge-success'>
                    #{tags}
                </span>
                    
                { page === 'Profile' &&
                    (<p className="updates">
                        <button className="btn btn-dark btn-sm" onClick={handleEdit}>Edit</button>
                        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
                    </p>)
                }

            </div>  
            
        </div>
        
    ) 
}

// blogItem.propTypes = {
//     blog:PropTypes.object.isRequired
// }

export default BlogItem;