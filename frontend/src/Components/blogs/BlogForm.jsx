import React,{useState,useContext,useEffect} from 'react'
import BlogContext from '../../context/blog/blogContext'  

const BlogForm = () => {
    const [blog, setBlog] = useState({
        heading: '',
        description: '',
        tags:''
    })

    const blogContext = useContext(BlogContext);
    const { addBlog, current , clearCurrent ,updateBlog} = blogContext;
    
    
    useEffect(() => {
        
        if (current !== null) {
            setBlog(current)
        }
        else {
            setBlog({
                heading: '',
                description: '',
                tags:''
            })
        }
       
    }, [current , blogContext] )

    const onChange = (e) => {
        setBlog({ ...blog, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {

        e.preventDefault();

        if (current) {
            updateBlog(blog);
        }
        else {
            addBlog(blog);
        }
        
        clearCurrent();

    }

    const { heading,description,tags} = blog;

    return (
        <form onSubmit={onSubmit} style={{ width: "30rem" }}>

            <h2 className="text-primary">{`${current ? 'Update ' : 'Add '} blog`}</h2>
            
            <input type="text" placeholder="Heading" name="heading" value={heading}
                onChange={onChange} />
            
            <p> <textarea class="textarea" placeholder="Description" name="description" onChange={onChange}></textarea></p>
            <input type="text" placeholder="#tags" name="tags" value={tags} onChange={onChange} />
            
            <input type="submit" value={`${current ? 'Update ' : 'Add '} blog`} className="btn btn-primary btn-block" />

            {current && (<div>
                <button className="btn btn-light btn-block" onClick={clearCurrent}>Clear</button>
            </div>)}
        </form>
         
    )
}

export default BlogForm;