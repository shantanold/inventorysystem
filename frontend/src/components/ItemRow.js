import { useFurnitureContext } from "../hooks/useFurnitureContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
const ItemRow = ({item}) => {
    const {dispatch} = useFurnitureContext()
    const handleClick = async() =>{
        const response = await fetch('/api/furniture/' + item._id, {
            method:'DELETE'
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:'DELETE_ITEM', payload:json})
        }
    }
    
    return (
        <tr>
             <td>{item.desc}</td>
              <td>{item.location}</td>
              <td>
                {item.pic!=='' ? (<img
                 src={item.pic} 
                 alt="itemspic" 
                 style={{ maxWidth: '300px', maxHeight: '150px' }}/>):
                 (<p></p>)}
                
              </td>
              <td>{item.room}</td>
              <td>{item.duration} days</td>
              <td className="delete-button"><span className="icon" onClick={handleClick}><FontAwesomeIcon icon={faTrash} /></span></td>
        </tr>
    )
}
export default ItemRow