import {createContext, useReducer} from 'react'

export const FurnitureContext = createContext()
export const furnitureReducer= (state,action) =>{
    switch(action.type){
        case 'SET_ITEMS':
            return {
                items: action.payload
            }
        case 'CREATE_ITEM':
            return{
                items: [action.payload, ...state.items]
            }
        case 'DELETE_ITEM':
            return{
                items: state.items.filter((i)=>i._id!==action.payload._id)
            }
        default:
            return state
        
    }
}
export const FurnitureContextProvider =({children})=>{
    const [state, dispatch] = useReducer(furnitureReducer, {
        items: null
    })

   
    return(
        <FurnitureContext.Provider value={{...state,dispatch}}>
            {children}
        </FurnitureContext.Provider>
    )
}