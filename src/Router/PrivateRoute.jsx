import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";

const PrivateRoute = ({children}) => {
   const {user, isLoading} = useContext(AuthContext)

   if(isLoading){
      return <h2>loading</h2>
   }

   if(user){
      return children
   } else {
      return <Navigate to="/login"></Navigate>
   }
};

export default PrivateRoute;