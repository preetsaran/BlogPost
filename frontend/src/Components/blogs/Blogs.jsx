import React, {useContext , Fragment ,useEffect}from 'react'
import blogContext from '../../context/blog/blogContext';
import BlogItem from './BlogItem';
import { CSSTransition,TransitionGroup} from 'react-transition-group';
import Spinner from '../layouts/spinner';

const Blogs = ({page,myRef}) => {
  
    const BlogContext = useContext(blogContext);
    let { allBlogs, userBlogs, filtered, getAllBlogs, getUserBlogs , loading } = BlogContext;


    useEffect(() => {
        if (page === 'Home')
            getAllBlogs();
        else if (page === 'Profile')
            getUserBlogs();
        // eslint-disable-next-line
    }, [] )
    
    
    let npage = (page === 'Home') ? 'Home' : 'Profile';
    
    let blogs = (page === 'Home') ? allBlogs : userBlogs;
    
    return (

        <div className='Blogs'>

            {blogs !== null  &&  !loading ? (<TransitionGroup>
            { filtered ? filtered.map((blog) => {
                return (
                    <CSSTransition key={blog._id} timeout={500} classNames="item">
                    <BlogItem
                            blog={blog}
                            page={npage}
                            myRef={myRef}
                        >           
                        </BlogItem>
                    </CSSTransition>)
            }) :
            blogs.map((blog) => {
                return (
                    <CSSTransition key={blog._id} timeout={500} classNames="item">
                        <BlogItem
                            blog={blog}
                            page={npage}
                            myRef={myRef}
                        >
                        </BlogItem>
                    </CSSTransition>)
            })}
            </TransitionGroup>) : <Spinner/>}
        </div>
    )
}

export default Blogs; 