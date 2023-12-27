const ItemDetails = ({item})=>{
    return (
        <div className = "item-details">
            <h4>{item.desc}</h4>
            <p><strong>Location:</strong>{item.location}</p>
            <p><strong>Picture:</strong><img src={item.pic}/></p>
            <p><strong>Room:</strong>{item.room}</p>
            <br></br>
            <hr></hr>
        </div>
    )
}
export default ItemDetails