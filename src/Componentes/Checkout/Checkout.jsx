/*VERSION SIMPLE
import { useState, useContext } from "react";
import { CarritoContext } from "../../Context/CarritoContext";
import { db } from "../../Service/config";
import { collection, addDoc } from "firebase/firestore";

const Checkout = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const[telefono, setTelefono] = useState("");
    const [email, setEmail] = useState ("");
    const [emailConfirmacion,setEmailConfirmacion] = useState ("");
    const [error, setError] = useState ("");
    const [ordenId, setOrdenId] = useState("");

    const {carrito, vaciarCarrito, total, totalCantidad} = useContext (CarritoContext);

    //Funciones y validaciones:

    const manejadorFormulario = (event) => {
        event.preventDefault();

        //Verificamos que los campos esten completos:
        if(!nombre|| !apellido || !telefono || !email || !emailConfirmacion) {
            setError("¡Por favor completa todos los campos!");
            return;
        }

        //Validamos que los campos del email coincidan:
        if(email !== emailConfirmacion) {
            setError ("¡Los campos del email no coinciden!");
            return;
        }

        //1) Creamos un objeto con todos los datos de la orden de compra:

        const orden ={
            items: carrito.map(producto => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad
            })),
            total: total,
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email
        };

        //2) Guardar la orden en la base de datos:
        addDoc(collection(db, "ordenes"), orden)
            .then(docRef => {
                setOrdenId(docRef.id);
                vaciarCarrito();
            })
            .catch(error => {
                console.log ("Error al crear la orden", error);
                setError("Se produjo un error al crear la orden");
            })
    }

    return (
        <div>
            <h2>Checkout</h2>

            <form onSubmit={manejadorFormulario}>
                {
                    carrito.map(producto => (
                        <div key={producto.item.id}>
                            <p>{producto.item.nombre} x {producto.cantidad}</p>
                            <p>{producto.item.precio}</p>
                            <hr />
                        </div>
                    ))
                }
                <div>
                    <label htmlFor="">Nombre</label>
                    <input type="text" onChange={(e)=> setNombre(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="">Apellido</label>
                    <input type="text" onChange={(e)=> setApellido(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="">Telefono</label>
                    <input type="number" onChange={(e)=> setTelefono(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="">Email</label>
                    <input type="email" onChange={(e)=> setEmail(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="">Confirm Email</label>
                    <input type="email" onChange={(e)=> setEmailConfirmacion(e.target.value)}/>
                </div>

                {
                    error && <p style={{color:"red"}}>{error}</p>
                }

                <button type="submit">Confirmar Compra</button>

                {
                    ordenId && (
                        <strong>¡Gracias por tu compra! Tu numero de orden es: {ordenId}</strong>
                    )
                }

            </form>
        </div>
    )
}
*/

//Version con descuento de stock:
import { useState, useContext, useEffect } from "react";
import { CarritoContext } from "../../Context/CarritoContext";
import { db } from "../../Service/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import "../Checkout/Checkout.css"

const Checkout = () => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const[telefono, setTelefono] = useState("");
    const [email, setEmail] = useState ("");
    const [emailConfirmacion,setEmailConfirmacion] = useState ("");
    const [error, setError] = useState ("");
    const [ordenId, setOrdenId] = useState("");

    const {carrito, vaciarCarrito, total, totalCantidad} = useContext (CarritoContext);

    //Funciones y validaciones:

    const manejadorFormulario = (event) => {
        event.preventDefault();

        //Verificamos que los campos esten completos:
        if(!nombre|| !apellido || !telefono || !email || !emailConfirmacion) {
            setError("¡Por favor completa todos los campos!");
            return;
        } else {
            setError("");
        }

        //Validamos que los campos del email coincidan:
        if(email !== emailConfirmacion) {
            setError ("¡Los campos del email no coinciden!");
            return;
        } else {
            setError("");
        }

        //1) Creamos un objeto con todos los datos de la orden de compra:

        const orden ={
            items: carrito.map(producto => ({
                id: producto.item.id,
                nombre: producto.item.nombre,
                cantidad: producto.cantidad
            })),
            total: total,
            fecha: new Date(),
            nombre,
            apellido,
            telefono,
            email
        };

        //////////////////////////////////////

        //Vamos a modificar el codigo para que ejecute varias promesas en paralelo, por un lado que actualice el stock de productos y por el otro lado que genere una orden de compra.
        //Vamos a usar para lograr esto: promise.All

        Promise.all(
            orden.items.map(async (productoOrden) => {
                const productoRef = doc(db, "inventario", productoOrden.id);
                //Por cada producto en la colleccion "inventario" obtengo una referencia, y a partir de esa referencia obtengo el DOC.
                const productoDoc = await getDoc(productoRef);
                const stockActual = productoDoc.data().stock;
                //Data es un metodo que me permite acceder a la informacion del documento.
                await updateDoc ( productoRef, {
                    stock: stockActual - productoOrden.cantidad
                })
                //Modifico el stock y subo la orden actualizada.
            })
        )
        .then(() => {
            //Guardamos la orden en la base de datos:
            addDoc(collection(db, "ordenes"), orden)
            .then(docRef => {
                setOrdenId(docRef.id);
                vaciarCarrito();
            })
            .catch( error => {
                console.log("Error al crear la orden", error);
                setError("Se produjo un error al crear la orden")
            })
        })
        .catch((error) => {
            console.log("No se pudo actualizar el stock", error);
            setError("No se puede actualizar el stock")
        })
    }

    return (
        <div className="tituloCheckout">
            <h2>FINALIZAR COMPRA!</h2>

        <div className="formulario">
            <form onSubmit={manejadorFormulario}>
                {
                    carrito.map(producto => (
                        <div key={producto.item.id}>
                            <p>{producto.item.nombre} x {producto.cantidad}</p>
                            <p>{producto.item.precio}</p>
                            <hr />
                        </div>
                    ))
                }
                <div>
                    <label htmlFor="">Nombre:</label>
                    <input className="input1" type="text" onChange={(e)=> setNombre(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="">Apellido:</label>
                    <input className="input2" type="text" onChange={(e)=> setApellido(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="">Telefono:</label>
                    <input className="input3" type="number" onChange={(e)=> setTelefono(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="">Email:</label>
                    <input className="input4" type="email" onChange={(e)=> setEmail(e.target.value)}/>
                </div>

                <div>
                    <label htmlFor="">Confirm Email:</label> 
                    <input className="input5" type="email" onChange={(e)=> setEmailConfirmacion(e.target.value)}/>
                </div>

                {
                    error && <p style={{color:"red"}}>{error}</p>
                }

                <button type="submit">Confirmar Compra</button>

                {
                    ordenId && (
                        <strong>¡Gracias por tu compra! Tu numero de orden es: {ordenId}</strong>
                    )
                }

            </form>
        </div>
        </div>
    )
}

export default Checkout