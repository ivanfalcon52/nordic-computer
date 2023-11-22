import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
return (
    <header>
        <Link className='linkNav'  to="/">
            <h1><img className='logoNordic' src={"../Img/logo.png"} alt="nordic logo" />
            <br/>
            Nordic Computer
            </h1>
        </Link>

        <nav>
            <ul className='navegacion'>
                <li>
                    <NavLink className='linkNav' to="categoria/2">Computadoras</NavLink>
                </li>
                
                <li>
                    <NavLink className='linkNav' to="categoria/3">PS4/PS5</NavLink>
                </li>
            </ul>
        </nav>

        <CartWidget/>
    </header>
)
}

export default NavBar