import { useState, useEffect } from "react";
import { getProductos, getProdPorCat } from "../../asyncmock";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {
    const [productos, setProductos] = useState([]);

    const {idCategoria} = useParams();

    useEffect(() => {
        
        const funcionProductos = idCategoria ? getProdPorCat : getProductos;

        funcionProductos(idCategoria)
            .then(res => setProductos(res))

        
    }, [idCategoria]);

    return (
        <>
            <h2>Computadoras Gamer</h2>
            <ItemList productos={productos} />
        </>
    )
}

export default ItemListContainer;
