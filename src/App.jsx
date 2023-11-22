import React from 'react';
import NavBar from './Componentes/NavBar/NavBar';
import ItemListContainer from './Componentes/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './Componentes/ItemDetailContainer/ItemDetailContainer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {CarritoProvider} from './Context/CarritoContext';
import Cart from './Componentes/Cart/Cart';
import Checkout from './Componentes/Checkout/Checkout';



const App = () => {
return (
  <>
    
    
    <BrowserRouter>
      <CarritoProvider>
        <NavBar/>
        <Routes>
          <Route path='/' element={<ItemListContainer/>} />
          <Route path='/categoria/:idCategoria' element={<ItemListContainer/>} />
          <Route path='/item/:idItem' element={<ItemDetailContainer/>}/>
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout/>} />
          <Route path='*' element={<h2>Sitio en construccion</h2>} />
        </Routes>
      </CarritoProvider>  
    </BrowserRouter>

  </>
)
}

export default App
