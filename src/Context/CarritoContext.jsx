//1) voy a importar useState y useContext, esto me permite crear un contexto que almacenara toda la logica de mi carrillo de compras.
import { Children } from "react";
import { useState, createContext } from "react";

//2) creamos el contexto.

export const CarritoContext = createContext({
    carrito: [],
    total: 0,
    cantidadTotal: 0
});

//El valor inicial es un objeto, con la propiedad carrito, que es un array vacio, total y cantidadTotal.

export const CarritoProvider = ({children}) => {
    //Creamos el estado para el carrito, total y cantidadTotal.
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [cantidadTotal, setCantidadTotal] = useState(0);

    //4) Agregamos algunas funciones auxiliares para la logica del carrito:
    const agregarAlCarrito = (item, cantidad) => {
        const productoExistente = carrito.find(prod => prod.item.id === item.id);

        if (!productoExistente) {
            setCarrito(prev => [...prev, { item, cantidad }]);
            setCantidadTotal(prev => prev + cantidad);
            setTotal(prev => prev + (item.precio * cantidad)); //calcula el valor total de todos los productos

            //La sintaxis: prev => {item, cantidad} se utiliza para crear un nuevo array a partir del estado anterior del carrito y agregar un nuevo objeto que representa el producto agregado.
        } else {
            const carritoActualizado = carrito.map(prod => {
                if (prod.item.id === item.id) {
                    return { ...prod, cantidad: prod.cantidad + cantidad };
                } else {
                    return prod;
                }
            })
            setCarrito(carritoActualizado);
            setCantidadTotal(prev => prev + cantidad);
            setTotal(prev => prev + (item.precio * cantidad));
        }
    }

    //Funcion para eliminar producto.

    const eliminarProducto = (id) => {
        const productoEliminado = carrito.find (prod => prod.item.id === id);
        const carritoActualizado = carrito.filter(prod => prod.item.id == id);

        setCarrito (carritoActualizado);
        setCantidadTotal (prev => prev - productoEliminado.cantidad);
        setTotal (prev => prev - (productoEliminado.item.precio * productoEliminado.cantidad));
    }

    //Funcion para vaciar el carrito:

    const vaciarCarrito = () => {
        setCarrito([]);
        setCantidadTotal([]);
        setTotal(0);
    }

    return (
        <CarritoContext.Provider value={{carrito, total, cantidadTotal, agregarAlCarrito,eliminarProducto, vaciarCarrito}}>
            {children}
        </CarritoContext.Provider>
    )
}

export default CarritoProvider

//En el value enviamos el valor actual del carrito, los items, el total de la compra y las funciones de agregar, eliminar y vaciar carrito.

//Children: usamos esta propuedad especial para representar a todos aquellos componentes que puedan necesitar el carrito y sus funciones.