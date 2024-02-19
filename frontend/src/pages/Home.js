import {useEffect, useState} from 'react'
import { useFurnitureContext } from '../hooks/useFurnitureContext'
import "../index.css"
import ItemDetails from '../components/ItemDetails'
import ItemForm from '../components/ItemForm'
import { useSearchParams } from 'react-router-dom';

const Home = () =>{
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [searchParams] = useSearchParams();
    const {items, dispatch} = useFurnitureContext()
    useEffect(()=>{
        const loginSuccess = searchParams.get('loginSuccess') === "true";
        if(loginSuccess){
            console.log("useEffect, login was successful")
            setShowSuccessMessage(true);
            const timeOut = setTimeout(()=>{
                setShowSuccessMessage(false);
            }, 5000);
            return () => clearTimeout(timeOut);
        }
        const fetchWorkouts = async()=>{
            const response = await fetch('/api/furniture')
            const json = await response.json()
            if(response.ok){
                dispatch({type:'SET_ITEMS',payload: json})
            }
        }
        fetchWorkouts()
    }, [dispatch, searchParams])
    return (
        
        <div className='home'>
             
            <div className='items'>
                {showSuccessMessage && (
                 <div className="success-message">Login successful!</div>)
             }
                <ItemDetails  items={items}/>
            
            </div>
        <ItemForm/>
        </div>
    )
}
export default Home