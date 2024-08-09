import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";

const PrivateRoute = ({children}) => {
   const {user, isLoading} = useContext(AuthContext)

   if(isLoading){
      return <div className="flex items-center justify-center h-screen">
         <div className="loader"></div>
      </div>
   }

   if(user?.email){
      return children
   } else {
      return <Navigate to="/login"></Navigate>
   }
};

export default PrivateRoute;