import React from 'react';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

const NavBar = () => {
return (
    <header>
        <h1>Nordic Computer</h1>

        <nav>
            <ul className='navegacion'>
                <li>Computadoras</li>
                <li>Ps4/PS5</li>
            </ul>
        </nav>

        <CartWidget/>
    </header>
)
}

export default NavBar