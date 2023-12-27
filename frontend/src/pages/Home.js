import {useEffect, useState} from 'react'
import ItemDetails from '../components/ItemDetails'
import ItemForm from '../components/ItemForm'
const Home = () =>{
    const [items, setItems] = useState(null)
    useEffect(()=>{
        const fetchWorkouts = async()=>{
            const response = await fetch('/api/furniture')
            const json = await response.json()
            console.log(json)
            if(response.ok){
                setItems(json)
            }
        }
        fetchWorkouts()
    }, [])
    return (
        <div className='home'>
            <div className='items'>
            {items && items.map((item)=>(
                <ItemDetails key={item._id} item={item}/>
            ))}
            </div>
        <ItemForm/>
        </div>
    )
}
export default Home