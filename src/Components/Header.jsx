import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/logo.png'
import BarsIcon from '../assets/icons/bars.png'
import CrossIcon from '../assets/icons/cross-small.png'
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/Provider";

const Header = () => {
    const {signOutUser} = useContext(AuthContext)
    const {setShowLoading} = useContext(AuthContext)
    const [showMenu, setShowMenu] = useState(false)
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
        setShowMenu(false)
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
            <div className="hidden lg:block header_container">
                <ul>
                    {
                        navItems?.map((item, idx) => (
                            <Link key={idx} className={`nav-item ${item.path === location.pathname ? 'active_nav' : ''}`} to={item?.path} onClick={() => handleNavItem()}>{item?.name}</Link>
                        ))
                    }
                    <a className="header-btn" onClick={handleSignOut}>Log Out</a>
                </ul>
            </div>  

            {/* RESPONSIVE MENU */}
            <div className="lg:hidden">
                <div className="action_btn z-20" onClick={() => setShowMenu(!showMenu)}>
                    <img src={BarsIcon} className={`m-1.5 ${!showMenu ? 'block' : 'hidden'}`} alt="" />
                    <img src={CrossIcon} className={`m-1.5 ${!showMenu ? 'hidden' : 'block'}`} alt="" />
                </div>
                <div className={`ham_container ${!showMenu ? '!-top-80' : '!top-16'}`}>
                    <ul className="grid px-4">
                        {
                            navItems?.map((item, idx) => (
                                <Link key={idx} className={`ham_menu_item ${item.path === location.pathname ? 'text-primary' : ''}`} to={item?.path} onClick={() => handleNavItem()}>{item?.name}</Link>
                            ))
                        }
                        <a onClick={handleSignOut} className="py-2.5 font-primary font-semibold">Log Out</a>
                    </ul>
                    {/* <div className="h-full"></div> */}
                </div>
            </div>
        </div>
    );
};

export default Header;