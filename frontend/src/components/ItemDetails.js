import ItemRow from "./ItemRow";
import "./tableStyles.css"
import { FaSort } from "react-icons/fa";
import {useState, useEffect} from 'react';
import axios from 'axios'
const ItemDetails = ({ items }) => {
   const [data, setData] = useState([]);
   const [sortBy, setSortBy]=useState('')
    const fetchData = async () => {
      try {
          const response = await axios.get(`/api/furniture?sortBy=${sortBy}`);
          console.log(response.data)
          console.log(sortBy)
          setData(response.data);
      } catch (error) {
          console.error(error);
      }
  };
  useEffect(()=>{
    
    fetchData();
  }, [sortBy]);
  const handleSort= (sortByValue)=>{
    setSortBy(sortByValue);
  }

    const handleDescSort = async() =>{
      const response = await fetch('/api/furniture/desc', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if(response.ok){
      console.log("response was ok, sorting by description")
      console.log(response)
      
    }
    else{
      console.log('response was not ok, womp womp')
    }
    }
    const handleLocationSort = async() =>{
      const response = await fetch('/api/furniture/location', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    }
    const handleDurationSort = async() =>{
      const response = await fetch('/api/furniture/duration', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    }
    const handleRoomSort = async() =>{
      const response = await fetch('/api/furniture/room', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    }
    return (
       
      <div>
       <table className="styled-table">
          <tr>
              <td className="">Description <button onClick={() => handleSort('desc')}><FaSort  className="inline-block"/></button></td>
              <td>Location <button onClick={()=>handleSort('location')}><FaSort  className="inline-block"/></button></td>
              <td>Picture </td>
              <td>Room <button onClick={()=>handleSort('room')}><FaSort  className="inline-block"/></button></td>
              <td>Duration <button onClick={()=>handleSort('location')} className="inline-block"><FaSort/></button></td>
          </tr>
          {items && items.map((item)=>(
              <ItemRow item={item}/>
                ))}
         
       </table>
      </div>
    );
  };
  
  export default ItemDetails;
  