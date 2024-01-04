const ItemRow = ({item}) => {
    return (
        <tr>
             <td>{item.desc}</td>
              <td>{item.location}</td>
              <td><img src={item.pic} alt="itemspic" style={{ maxWidth: '200px', height: 'auto' }}/></td>
              <td>{item.room}</td>
              <td>{item.duration}</td>
        </tr>
    )
}
export default ItemRow