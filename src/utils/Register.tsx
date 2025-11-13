import React, { useState } from "react";
import { useAuth } from "../Context/AuthContext";

const Register = () => {
    const { registerEmail } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await registerEmail(email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Registrarse</h1>

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

            <button>Registrarse</button>
        </form>
    );
};

export default Register;
