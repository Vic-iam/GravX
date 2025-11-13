import Aurora from "../components/Aurora";
import style from "./Style/Login.module.css"
import React, { useState } from "react";
import { Link } from "react-router";




const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ email, password });
    };

    return (
        <>

            <section className={style.loginContainer}>

                <div className={style.auroraBg}>
                    <Aurora
                        colorStops={["#9C1107", "#0C0A09", "#9C1107"]}
                        blend={0.5}
                        amplitude={1.0}
                        speed={0.5}
                    />
                </div>

                <form onSubmit={handleSubmit}
                    className={style.loginCard}>
                    <h1>Iniciar sesion</h1>
                    <div className={style.loginIndex}>
                        <label>Nombre o correo electronico</label>
                        <input type="emailt" placeholder="Escribe tu correo electronico" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label>Contraseña <Link to="/">Olvidaste la contraseña?</Link></label>
                        <input type="password" placeholder="Escribe tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <div className={style.btnLogin}>
                            <button>Iniciar sesion</button>
                        </div>
                    </div>
                    <div className={style.linea}></div>
                    <div className={style.loginRegister}>
                        <p>Nuevo en GravX?</p>
                        <Link to="/Admin">Crear cuenta</Link>
                    </div>
                </form>


            </section>

        </>
    );
}

export default Login;