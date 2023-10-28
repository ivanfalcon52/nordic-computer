import './ItemDetail.css'

const ItemDetail = ({id, nombre, precio, imagen}) => {
    return (
        <div className='contenedorItemPadre'>
            <div className='contenedorItem'>
                <h2>Nombre: {nombre} </h2>
                <h3>Precio: {precio} </h3>
                <h3>ID: {id} </h3>
                <img src={imagen} alt= {nombre} />
                <p>descripcion del producto</p>
            </div>
        </div>
        
    )
}

export default ItemDetail