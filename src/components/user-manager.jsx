import backend_api from "./backend-api"
import { useNavigate } from "react-router-dom"
import { toast_success, toast_fail } from "./toasters"
import { setAuthToken } from "./backend-api";

export const UserManager = () => {
    const navigate = useNavigate();

    const login = async(email, password) => {
        await backend_api.post("/login", {
            email, password
        }).then(response => {
            if(response.data.status === "success") {
                toast_success("Login Successfully");
                setAuthToken(response.data.token);

                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                localStorage.setItem("user_type", response.data.user_type);
                localStorage.setItem("user_id", response.data.user_id);

                navigate("/dashboard");
            } else {
                toast_fail(response.data.message);
            }
        })
    }

    const logout = async(token) => {
        await backend_api.post('/logout', {
            token,
        }).then(response => {
            if (response.data.status === "success") {
                toast_success("Logout Successfully");

                // Remove token from localStorage
                localStorage.removeItem('token');
                localStorage.removeItem('username');
                localStorage.setItem('user_type', response.data.user_type);
                localStorage.setItem('user_id', response.data.user_id);

                setAuthToken(null);

                navigate('/login');
            } else {
                toast_fail(response.data.message);
            }
        })
    }

    return { login, logout };
}