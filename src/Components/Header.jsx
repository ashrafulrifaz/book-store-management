import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/logo.png'
import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";

const Header = () => {
    const {signOutUser} = useContext(AuthContext)
    const {setShowLoading} = useContext(AuthContext)
    const location = useLocation();    

    const handleSignOut = () => {
        signOutUser()
    }

    const navItems = [
        {
            name: 'Home',
            path: '/',
        },
        {
            name: 'Add Book',
            path: '/add-book',
        },
        {
            name: 'Pre-Orders',
            path: '/pre-orders',
        },
        {
            name: 'Customers',
            path: '/customers',
        },
    ]

    const handleNavItem = () => {
        const timeOut = setTimeout(() => {
            setShowLoading(false)
        }, 1000)

        return () => clearTimeout(timeOut)
    }

    return (
        <div className="header">
            <Link to="/">
                <img src={Logo} className="logo" alt="" />
            </Link>
            <div>
                <ul>
                    {
                        navItems?.map((item, idx) => (
                            <Link key={idx} className={`nav-item ${item.path === location.pathname ? 'active_nav' : ''}`} to={item?.path} onClick={() => handleNavItem()}>{item?.name}</Link>
                        ))
                    }
                    <a className="header-btn" onClick={handleSignOut}>Log Out</a>
                </ul>
            </div>  
        </div>
    );
};

export default Header;