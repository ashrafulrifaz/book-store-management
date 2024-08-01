import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

const Layout = () => {
    return (
        <div className="bg-baground">
            <div className="max-w-[1300px] mx-auto">
                <Header />
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;