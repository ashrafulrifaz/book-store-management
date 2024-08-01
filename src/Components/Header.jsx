import { NavLink } from "react-router-dom";

const Header = () => {
    return (
        <div className="header">
            <h2 className="logo">Logo Here</h2>
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