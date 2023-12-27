import { FurnitureContext } from "../context/FurnitureContext";
import { useContext } from "react";

export const useFurnitureContext = ()=>{
    //contains state and dispatch from FurnitureContext.provider
    const context = useContext(FurnitureContext)
    if(!context){
        throw Error('useFurnitureContext must be used inside a FurnitureContextProvider')
    }
    return context;// this allows us to access the furniture data in the frontend
}