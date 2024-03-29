import {useState} from 'react'
import { useFurnitureContext } from '../hooks/useFurnitureContext'
import './formStyles.css'
const ItemForm = () =>{
    const {dispatch} = useFurnitureContext()
    const [showForm, setShowForm] = useState(false);
    const [desc,setDesc] = useState('')
    const [location, setLocation] = useState('')
    const [pic, setPic] = useState('')
    const [room, setRoom] = useState('')
    const [duration, setDuration] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const handleSubmit = async (e) => {
        e.preventDefault();
        const item = { desc, location, pic, room, duration };
        const response = await fetch('/api/furniture', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
    
        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
    
        if (response.ok) {
            setError(null);
            setDesc('');
            setLocation('');
            setPic('');
            setRoom('');
            setDuration('');
            setEmptyFields([])
            dispatch({ type: 'CREATE_ITEM', payload: json });
        }
    };
    const handleToggleForm = () =>{
        setShowForm(!showForm)
    }
    return(
           <div className={`allEncompassing`}>
      <button className="newItemButton" onClick={handleToggleForm}>
        {showForm ? 'Hide' : 'New Item'}
      </button>
            <form className ={`create text-center ${showForm ? 'form-visible' : 'form-hidden'}`} onSubmit={handleSubmit}>
            <h3>Add a new Furniture Piece</h3>
            <label>Item Description</label>
            <input 
            type='text'
            onChange={(e)=>setDesc(e.target.value)}
            value={desc}
            className={emptyFields.includes('Description') ? 'error':''}
            />
             <label>Current Location of Item</label>
            <input 
            type='text'
            onChange={(e)=>setLocation(e.target.value)}
            value={location}
            className={emptyFields.includes('Location') ? 'error':''}
            />
            <label>Optional Picture</label>
            <input 
            accept="image/*"
            type='file'
            alt={desc}
            onChange={(e)=>setPic(e.target.value)}
            value={pic}
            />
            <label>Which room does it belong to?</label>
            <input 
            type='text'
            onChange={(e)=>setRoom(e.target.value)}
            value={room}
            className={emptyFields.includes('Room') ? 'error':''}
            />
            <label>How long will it be at this location?</label>
            <input 
            type='number'
            onChange={(e)=>setDuration(e.target.value)}
            value={duration}
            className={emptyFields.includes('Duration') ? 'error':''}
            />

            <button className=" text-white px-2 my-2 submitButton">Add item!</button>
            {error && <div className="error">{error}</div>}


        </form>
            
        </div>
        
    )

}
export default ItemForm