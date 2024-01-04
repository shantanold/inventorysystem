import ItemRow from "./ItemRow";
import "./tableStyles.css"
const ItemDetails = ({ items }) => {
    console.log(items)
    return (
       
      <div>
       <table className="styled-table">
          <tr>
              <td>Description</td>
              <td>Location</td>
              <td>Picture</td>
              <td>Room</td>
              <td>Duration</td>
          </tr>
          {items && items.map((item)=>(
              <ItemRow item={item}/>  
                ))}
         
       </table>
      </div>
    );
  };
  
  export default ItemDetails;
  