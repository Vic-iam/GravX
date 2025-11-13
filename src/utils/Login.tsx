import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const Login = () => {
    const { loginEmail, loginGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await loginEmail(email, password);
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>Iniciar sesión</h1>

                <input 
                    type="email" 
                    placeholder="Correo" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button>Iniciar sesión</button>

                <button type="button" onClick={loginGoogle}>
                    Iniciar con Google
                </button>
            </form>
        </>
    );
};

export default Login;
