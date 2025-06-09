import { UserManager } from "../components/user-manager"
import { useState } from "react"
import { ToastContainer } from 'react-toastify'

export default function Register() {
    const { register } = UserManager();
    const [loader, setLoader] = useState("Register");
    const [state, setState] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (event) => {
        const field = event.target.name;
        setState((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }));
    };

    const handleRegister = async(event) => {
        event.preventDefault();
        setLoader("Creating Account...");
        await register(state.username, state.email, state.password);
        setState((prevState) => ({
            ...prevState,
            username: '',
            password: '',
            email: '',
        }));
        setLoader("Register");
    };

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
            <ToastContainer />
            <div className="card p-4" style={{ width: '25rem', minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                    <h1 className="text-center mb-4">Register</h1>
                    <form onSubmit={ handleRegister } className="d-flex flex-column" style={{ flex: 1 }}>
                        <div className="mb-3">
                            <input 
                                type="text" 
                                className="form-control"
                                name="username"
                                value={ state.username }
                                onChange={ handleChange } 
                                placeholder="Name"
                                required />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="text" 
                                className="form-control"
                                name="email"
                                value={ state.email }
                                onChange={ handleChange } 
                                placeholder="Email" 
                                required />
                        </div>
                        <div className="mb-3">
                            <input 
                                type="password" 
                                className="form-control"
                                name="password"
                                value={ state.password }
                                onChange={ handleChange } 
                                placeholder="Password" 
                                required />
                        </div>
                        <div className="text-center">Already have an account?? <a href="/login">Login Now</a></div>
                        <div className="mt-5">
                            <button type="submit" className="btn btn-primary w-100">{ loader }</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}