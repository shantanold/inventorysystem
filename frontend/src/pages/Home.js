import {useEffect} from 'react'
import { useFurnitureContext } from '../hooks/useFurnitureContext'
import "../index.css"
import ItemDetails from '../components/ItemDetails'
import ItemForm from '../components/ItemForm'

const Home = () =>{
    const {items, dispatch} = useFurnitureContext()
    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response = await fetch('/api/furniture')
            const json = await response.json()
            if(response.ok){
                dispatch({type:'SET_ITEMS',payload: json})
            }
        }
        fetchWorkouts()
    }, [dispatch])
    return (
        <div className='home'>
            <div className='items'>
                <ItemDetails  items={items}/>
            
            </div>
        <ItemForm/>
        </div>
    )
}
export default Home