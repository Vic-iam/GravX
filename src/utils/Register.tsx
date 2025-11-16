import React, { useState } from "react";
import style from "./Style/Register.module.css";
import Aurora from "../components/Aurora";
import { Link } from "react-router";

const Register = () => {
    const [form, setForm] = useState({
        nombre: '',
        email: '',
        password: ''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
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
                        <input name="nombre" placeholder="Escribe tu nombre" onChange={handleChange} />

                        <label>Correo electronico</label>
                        <input name="email" placeholder="Escribe tu correo electronico" onChange={handleChange} />

                        <label>Contraseña</label>
                        <input name="passoword" placeholder="Escribe tu contrasena" onChange={handleChange}/>

                        <div className={style.btnAdmin}>
                            <button type="submit">Registrate</button>
                        </div>
                    </div>

                    <div className={style.linea}></div>

                    <div className={style.adminLogin}>
                        <p>Ya estás registrado?</p>
                        <Link to="/Login">Inicia sesión</Link>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Register;
