import { Outlet } from "react-router-dom";
import Header from "../Components/Header";
import { useContext } from "react";
import { AuthContext } from "../Provider/Provider";

const Layout = () => {
    const {showLoading} = useContext(AuthContext)

    return (
        <div className="bg-baground min-h-screen">
            <div className={`${showLoading ? 'block' : 'hidden'}`}>
                <div className="flex items-center justify-center h-screen">
                    <div className="loader"></div>
                </div>
            </div>
            <div className="max-w-[1200px] mx-auto">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;