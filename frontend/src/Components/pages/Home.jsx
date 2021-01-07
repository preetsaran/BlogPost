import React,{useState,useContext} from 'react';
import Blogs from '../blogs/Blogs';
import BlogContext from '../../context/blog/blogContext';

function Home() {
   
  const blogContext = useContext(BlogContext);
  const { filterBlog, clearFilter } = blogContext;
  
  const [Search, setSearch] = useState('');

 
    
  const handleSearch = (e) => {

    setSearch(e.target.value);

    if (e.target.value === '') {
      clearFilter();
    }
    else
      filterBlog(e.target.value);
    
  }

  return (
     
    <div className="grid-2"   >
      
      {(<input type="text" name="Search" value={Search} placeholder="Search" id=""
        onChange={handleSearch} />)}

      <Blogs page={'Home'} />
      
    </div>
      
    );
}

export default Home;
  