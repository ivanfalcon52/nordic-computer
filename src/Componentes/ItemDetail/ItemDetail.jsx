import { useState } from 'react';
import Contador from '../Contador/Contador';
import { Link } from 'react-router-dom';
import './ItemDetail.css'

//para crear el carrito: importamos CarritoContext:
import { CarritoContext } from '../../Context/CarritoContext';
//Importo el Hook useContext:
import { useContext } from 'react';

const ItemDetail = ({id, nombre, stock, precio, imagen}) => {
    //Creamos un estado local con la cantidad de productos agregados.
    const [agregarCantidad, setAgregarCantidad] = useState(0);

    //Funcion para crear carrito.
    const {agregarAlCarrito} = useContext(CarritoContext);
    //Funcion para crear carrito.


    //Creamos un funcion manejadores de la cantidad:

    const manejadorCantidad = (cantidad) => {
        setAgregarCantidad(cantidad);
        //console.log("Productos agregados: " + cantidad);

        //para el carrito: podemos crear el objeto con el item y la cantidad:
        const item = {id,nombre,precio};
        agregarAlCarrito(item,cantidad)
    }

    return (
        <div className='contenedorItemPadre'>
            <div className='contenedorItem'>
                <h2>{nombre} </h2>
                <img src={imagen} alt= {nombre} />
                <h3>Precio: ${precio} </h3>
                <h3>ID: {id} </h3>
                <p className='descripcion'>descripcion del producto</p>

                {
                    agregarCantidad > 0 ? (<Link to="/cart" className='finButton'>Terminar Compra</Link>) : (<Contador inicial={1} stock={stock} funcionAgregar={manejadorCantidad}/>)
                }
            </div>
        </div>
    )
}

export default ItemDetail