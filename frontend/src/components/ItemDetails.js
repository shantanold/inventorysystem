import ItemRow from "./ItemRow";
import "./tableStyles.css";
import { FaSort } from "react-icons/fa";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useFurnitureContext } from "../context/FurnitureContext";

const ItemDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const {state, dispatch} = useFurnitureContext();
  const {items, sortBy} = state;
  const fetchData = async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const response = await axios.get(`/api/furniture?sortBy=${sortBy}`);
      dispatch({ type: 'SET_ITEMS', payload: response.data });
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false); // Set loading to false after fetching data
    }
  };

  useEffect(() => {
    if(sortBy){
      fetchData();
    }
  }, [sortBy]);

  const handleSort = (sortByValue) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortByValue });
  }

  return (
    <div>
      <table className="styled-table">
        <tr>
          <td className="">Description <button onClick={() => handleSort('desc')}><FaSort className="inline-block" /></button></td>
          <td>Location <button onClick={() => handleSort('location')}><FaSort className="inline-block" /></button></td>
          <td>Picture </td>
          <td>Room <button onClick={() => handleSort('room')}><FaSort className="inline-block" /></button></td>
          <td>Duration <button onClick={() => handleSort('duration')} className="inline-block"><FaSort /></button></td>
          <td>Date Added<button onClick={() => handleSort('createdAt')} className="inline-block"><FaSort /></button></td>
        </tr>
        {items && items.map((item) => (
          <ItemRow item={item} key={item.id} />
        ))}
      </table>
    </div>
  );
};

export default ItemDetails;
