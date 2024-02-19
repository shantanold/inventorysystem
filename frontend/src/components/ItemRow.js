import { useFurnitureContext } from "../hooks/useFurnitureContext"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from "react";
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import "./tableStyles.css";
const ItemRow = ({item}) => {
    const {dispatch} = useFurnitureContext()
    const previousHues = [];

    const handleClick = async() =>{
        const response = await fetch('/api/furniture/' + item._id, {
            method:'DELETE'
        })
        const json = await response.json()
        if(response.ok){
            dispatch({type:'DELETE_ITEM', payload:json})
        }
        console.log(json);
    }
    const getLocationColor = (location) => {
        // Generate a hash based on location string
        let hash = 0;
        for (let i = 0; i < location.length; i++) {
            hash = location.charCodeAt(i) + ((hash << 5) - hash);
        }
        // Use hash to generate hue value (0-360)
        let hue = Math.abs(hash % 360);
        
        // Define a minimum hue distance to ensure distinct colors
        const minHueDistance = 30; // Adjust as needed
        
        // Adjust hue if it's too close to previous hues
        if (previousHues.length > 0) {
            let distance = Math.min(...previousHues.map(prevHue => Math.abs(hue - prevHue)));
            if (distance < minHueDistance) {
                hue = (hue + minHueDistance) % 360;
            }
        }
    
        // Store current hue for future checks
        previousHues.push(hue);
    
        // Convert hue to HSL color format
        return `hsl(${hue}, 65%, 75%)`; // Adjust saturation and lightness as needed
    };
    const formatDate = (dateString) =>{
        const dateObj = new Date(dateString);
        const formattedDate = dateObj.toLocaleDateString('en-US', { 
            month: '2-digit', 
            day: '2-digit', 
            year: 'numeric' 
        });
        return formattedDate;
    }
    
    
    
    return (
        <tr style={{ backgroundColor: getLocationColor(item.location) }}>
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
              <td>{formatDate(item.createdAt)}</td>
              <td className="delete-button"><span className="icon" onClick={handleClick}><FontAwesomeIcon icon={faTrash} /></span></td>
        </tr>
    )
}
export default ItemRow