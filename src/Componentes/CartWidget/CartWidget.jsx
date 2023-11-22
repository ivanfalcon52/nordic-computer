import { useContext } from 'react';
import { CarritoContext } from '../../Context/CarritoContext';
import { Link } from 'react-router-dom';
import './CartWidget.css'

const CartWidget = () => {
    const {cantidadTotal} = useContext (CarritoContext); 

    return (
        <div>
            <Link to="/cart">
                <img className='imgCarrito' src="../Img/Carrito.png" alt="Carrito de compras" />
                {
                    cantidadTotal > 0 && <span>{cantidadTotal}</span>
                }
            </Link>



            
        
        </div>
    )
}

export default CartWidget
