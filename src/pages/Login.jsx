import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/Provider";
import { toast } from "sonner";

const Login = () => {
    const {login} = useContext(AuthContext)
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

  const onSubmit = data => {
    setLoading(true)
    const email = data.email
    const password = data.password

    login(email, password)
        .then(() => {
            setLoading(false)
            navigate('/')
            toast.success('Login Success', {
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
        .then(error => console.log(error))
    setLoading(false)
  };

    return (
        <div className="login-background">
            <div className="login-container">
                <h2>Login</h2>
                <p>Login to manage your store</p>
                <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" {...register("email", { required: true })} required placeholder="Enter your email here" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" {...register("password", { required: true })} required placeholder="Enter your password here" />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;