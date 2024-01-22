import ItemRow from "./ItemRow";
import "./tableStyles.css"
import { FaSort } from "react-icons/fa";
const ItemDetails = ({ items }) => {
    console.log(items)
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
              <td className="">Description <FaSort onClick={handleDescSort} className="inline-block"/></td>
              <td>Location <FaSort onClick={handleLocationSort} className="inline-block"/></td>
              <td>Picture </td>
              <td>Room <FaSort onClick={handleRoomSort} className="inline-block"/></td>
              <td>Duration <FaSort onClick={handleDurationSort} className="inline-block"/></td>
          </tr>
          {items && items.map((item)=>(
              <ItemRow item={item}/>
                ))}
         
       </table>
      </div>
    );
  };
  
  export default ItemDetails;
  