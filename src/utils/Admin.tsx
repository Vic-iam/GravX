import React, { useState } from "react";
import style from "./Style/Admin.module.css"
import Aurora from "../components/Aurora";
import { Link } from "react-router";

const Admin = () => {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <>
            <section className={style.adminContainer}>

                <div className={style.auroraBg}>
                    <Aurora
                        colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={0.5}
                    />
                </div>

                <form onSubmit={handleSubmit} className={style.adminCard}>
                    <h1>Registrate</h1>
                    <div className={style.adminIndex}>
                        <label>Nombre</label>
                        <input type="text" placeholder="Escribe tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                        <label>Apellido</label>
                        <input type="text" placeholder="Escribe tu apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                        <label>Correo electronico</label>
                        <input type="text" placeholder="Escribe tu correo electronico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label>Contraseña</label>
                        <input type="text" placeholder="Escribe tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <div className={style.btnAdmin}>
                            <button>Registrate</button>
                        </div>
                    </div>
                    <div className={style.linea}></div>
                    <div className={style.adminLogin}>
                        <p>Ya estas registrado?</p>
                        <Link to="/Login">Inicia sesion</Link>
                    </div>
                </form>
            </section>

        </>
    );
}

export default Admin;