import { useForm } from "react-hook-form";

const Login = () => {
    const { register, handleSubmit } = useForm();

    const email = import.meta.env.VITE_ADMIN_EMAIL;
    const password = import.meta.env.VITE_ADMIN_PASSWORD;

  const onSubmit = data => {
    if(email === data.email && password === data.password){
        console.log('login success');
    } else {
        console.log('login failed');
    }
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