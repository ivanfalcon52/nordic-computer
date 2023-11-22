import { useContext } from "react";
import { CarritoContext } from "../../Context/CarritoContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import "./Cart.css"

const Cart = () => {
    const {carrito, vaciarCarrito, total,cantidadTotal} = useContext(CarritoContext);

    if (cantidadTotal === 0) {
        return (
            <>
            <div className="sinProd">
                <h2>No hay productos en el carrito</h2> 
                <br />  
                <img src="../Img/triste.png" alt="computadora triste" />
                <Link to="/" className="verButton">Ver Productos</Link>
            </div>
            
            </>
        )
    }

    return (
        <div>
            {
                carrito.map(productos => <CartItem key={productos.item.id}{...productos}/>)
            }
            <h3>Total: ${total}</h3>
            <h3>Cantidad Total: {cantidadTotal}</h3>
            <button onClick={() => vaciarCarrito()}> Vaciar Carrito </button>
            <Link to="/checkout">Finalizar Compra</Link>
        </div>
    )
}

export default Cart