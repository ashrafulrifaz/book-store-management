import { NavLink } from "react-router-dom";
import Logo from '../assets/logo.png'

const Header = () => {
    return (
        <div className="header">
            <img src={Logo} className="logo" alt="" />
            <div>
                <ul>
                    <NavLink className="nav-item" to={'/'}>Home</NavLink>
                    <NavLink className="nav-item" to={'/add-book'}>Add Book</NavLink>
                    <NavLink className="nav-item" to={'/pre-orders'}>Pre-Orders</NavLink>
                    <NavLink className="nav-item" to={'/customers'}>Customers</NavLink>
                    <a className="header-btn">Log Out</a>
                </ul>
            </div>  
        </div>
    );
};

export default Header;