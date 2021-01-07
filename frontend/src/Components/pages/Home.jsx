import React,{useState,useContext} from 'react';
import Events from '../events/Events';
import EventContext from '../../context/event/eventContext'

function Home() {
   
  const eventContext = useContext(EventContext);
  const { filterEvent, clearFilter } = eventContext;
  
  const [Search, setSearch] = useState('');

 
    
  const handleSearch = (e) => {

    setSearch(e.target.value);

    if (e.target.value === '') {
      clearFilter();
    }
    else
      filterEvent(e.target.value);
    
  }

  return (
     
    <div style={{ display: "flex", flexDirection: "column" }} >
      
      {(<input type="text" name="Search" value={Search} placeholder="Search" id=""
        onChange={handleSearch} />)}
      
      <Events
      page={'Home'} />
              
    </div>
      
    );
}

export default Home;
  