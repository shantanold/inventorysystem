import {createContext, useReducer, useContext } from 'react'

export const FurnitureContext = createContext()
const initialState={
    items:[]
}
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
        case 'SET_SORT_BY':
            return {
                ...state,
                sortBy: action.payload // Update the sorting criteria
            }
        default:
            return state
        
    }
}
export const FurnitureContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(furnitureReducer, initialState);
  
    return (
      <FurnitureContext.Provider value={{ state, dispatch }}>
        {children}
      </FurnitureContext.Provider>
    );
  };
  export const useFurnitureContext = () => {
    return useContext(FurnitureContext);
  };