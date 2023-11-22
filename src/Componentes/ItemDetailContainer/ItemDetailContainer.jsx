import { useState, useEffect } from "react";
//import { getUnProducto } from "../../asyncmock";
import ItemDetail from "../ItemDetail/ItemDetail";
import { useParams } from "react-router-dom";
import { db } from "../../Service/config";
import {getDoc, doc} from "firebase/firestore";

const ItemDetailContainer = () => {
    const [producto, setProducto] = useState(null);

    const {idItem} = useParams();

    useEffect(() => {
        const nuevoDoc = doc(db, "inventario", idItem);

        getDoc(nuevoDoc)
        .then(res => {
            const data = res.data();
            const nuevoProducto = {id: res.id, ...data}
            setProducto (nuevoProducto);
        })
        .catch(error=> console.log(error))
    },[idItem])

    /*useEffect(() => {
        getUnProducto(idItem)
            .then(respuesta => setProducto(respuesta))
    }, [idItem])*/
    
    return (
        <div>
            <ItemDetail {...producto} />
        </div>
    )
}

export default ItemDetailContainer