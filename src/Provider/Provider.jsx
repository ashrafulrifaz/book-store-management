import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import auth from "../firebase.init";
import { toast } from "sonner";

export const AuthContext = createContext(null)

const Provider = ({children}) => {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
           setUser(user)
           setIsLoading(false)
        })
        
        return () => {
           unsubscribe()
        }
    }, [])
    
    const login = (email, password) => {
        setIsLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        signOut(auth)
        .then(() => {
           toast.success('Logout Successfully', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
           });
        })
    }

    const info = {user, setUser, login, signOutUser, isLoading}

    return (
        <AuthContext.Provider value={info}>
            {children}
        </AuthContext.Provider>
    );
};

export default Provider;