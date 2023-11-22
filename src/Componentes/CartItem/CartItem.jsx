import { useContext } from "react";
import { CarritoContext } from "../../Context/CarritoContext";
import "./CartItem.css"

const CartItem = ({item,cantidad}) => {
    const {eliminarProducto} = useContext (CarritoContext);

    return (
        <>
            <div className="carritoProds" >
            
                <h3> {item.nombre} </h3>
                <p>Cantidad: {cantidad}</p>
                <p>Precio: {item.precio}</p>
                <button onClick={()=>eliminarProducto(item.id)}>Eliminar</button>
                <br /><br />
                <hr />
            </div>
        </>
    )
}

export default CartItem