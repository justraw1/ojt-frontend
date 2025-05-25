import { UserManager } from "../components/user-manager"
import { useState } from "react"
import { ToastContainer } from 'react-toastify'
import '../css/login.css'

export default function Login() {
    const { login } = UserManager();
    const [loader, setLoader] = useState("Login");
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    //Function for Login event
    const handleLogin = async(event) => {
        event.preventDefault();
        setLoader("Logging In");
        await login(state.email, state.password);
        setState((prevState) => ({
            ...prevState,
            password: '',
        }));
        setLoader("Login");
    };

    //Function for password and email change event
    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }));
    };

    return (
        <div className="login-page container-fluid d-flex justify-content-center align-items-center vw-100 vh-100">
            <ToastContainer />
            <div className="card p-4 login-form flex">
                <div>
                    <h1 className="text-center mb-4">Login</h1>
                    <form onSubmit={ handleLogin } className="d-flex flex-column" style={{ flex: 1 }}>
                        <div className="mb-3">
                            <input type="email"
                                   name="email"
                                   className="form-control" 
                                   placeholder="Email"
                                   value={ state.email }
                                   onChange={ handleChange }
                                   autoComplete="off"
                                   required />
                        </div>
                        <div className="mb-3">
                            <input type="password"
                                   name="password"
                                   className="form-control" 
                                   placeholder="Password"
                                   value={ state.password }
                                   onChange={ handleChange }
                                   required />
                        </div>
                        <div className="mt-5">
                            <button 
                                type="submit" 
                                className="btn btn-primary w-100"
                                disabled={ loader === "Logging In" }>
                                    <span>{ loader }</span>
                                </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}