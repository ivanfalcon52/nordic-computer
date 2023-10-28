import './Item.css';
import { Link } from 'react-router-dom';

const Item = ({id, nombre, precio, imagen}) => {
  return (
    <div className='cardProducto'>
      <img src={imagen} alt={nombre}/>
      <h3>{nombre}</h3>
      <p>Precio: {precio} </p>
      <p> ID: {id} </p>
      <Link className='detail' to={`/item/${id}`}>Ver Detalles</Link>
    </div>
  )
}

export default Item