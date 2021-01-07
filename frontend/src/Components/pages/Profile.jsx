import React,{useEffect,useContext,useRef} from 'react';
import Blogs from '../blogs/Blogs';
import BlogForm from '../blogs/BlogForm';
import AuthContext from '../../context/auth/authContext';

function Profile() {

  const authContext = useContext(AuthContext);
  const myRef = useRef(null);

  useEffect(() => {
    if(localStorage.token)
      authContext.loadUser();
    // eslint-disable-next-line
  }, [] )


  return (
     
    <div className="grid-2" style={{ display: "flex", flexDirection: "column" ,margin: "2rem" }} >
        
        <div style={{ display: "flex" , justifyContent:"center"}}> 

        <div>
        <BlogForm ref={myRef}/>
         </div>   
      
        </div>
          
      <Blogs myRef={myRef}
       page={'Profile'}/>
              
    </div>  
      
    );
}

export default Profile;