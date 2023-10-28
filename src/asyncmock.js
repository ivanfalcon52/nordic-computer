const misProductos = [
    {
        id: "1",
        nombre: "PC Gamer Ryzen 3",
        precio: 200000,
        imagen: "https://i.ytimg.com/vi/GOlYVHLwPgI/maxresdefault.jpg",
        idCat: "2"
        },
        {
        id: "2",
        nombre: "PC Gamer I5",
        precio: 300000,
        imagen:"https://i.ytimg.com/vi/Vr0gNRylBVs/maxresdefault.jpg",
        idCat:"2"
        },
        {
        id:"3",
        nombre: "PS4 1TB SLIM",
        precio: 400000,
        imagen: "https://tribugamer.com/wp-content/uploads/2017/02/PlayStation-4.jpg",
        idCat:"3"
        },
        {
        id:"4",
        nombre: "PS5 800GB CON LECTORA",
        precio: 500000,
        imagen: "https://i.blogs.es/834064/ps5-nuevo-modelo-consume-menos-energia-y-tuvo-una-importante-reduccion-de-componentes-para-hacer-mas-barata-la-consola/1366_2000.jpeg",
        idCat:"3"
        },
]

export const getProductos = () => {
    return new Promise ((resolve)=> {setTimeout( () => {
            resolve (misProductos);
        }, 500)
    })
}

/*Actividad n3 Detalle del Producto*/

export const getUnProducto = (id) => {
    return new Promise (resolve => {
        setTimeout (() => {
            const producto = misProductos.find(item => item.id === id);
            resolve (producto);
        }, 100)
    })
}



export const getProdPorCat = (idCategoria) => {
    return new Promise (resolve => {
        setTimeout(() => {
            const productosCategoria = misProductos.filter (item => item.idCat === idCategoria)
            resolve (productosCategoria);
        },100)
    })
}