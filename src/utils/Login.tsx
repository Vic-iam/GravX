import Aurora from "../components/Aurora";
import style from "./Style/Login.module.css";
import { useState } from "react";
import { Link, } from "react-router";

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

                <form onSubmit={handleSubmit} className={style.loginCard}>
                    <h1>Iniciar sesión</h1>

                    <div className={style.loginIndex}>
                            <label>Correo electrónico</label>
                            <input value={email} placeholder="Escribe tu correo electronico" onChange={(e) => setEmail(e.target.value)}  />

                            <label>Contraseña </label>
                            <input type="password" placeholder="Escribe tu contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <div className={style.btnLogin}>
                            <button>Iniciar sesión</button>
                        </div>
                    </div>

                    <div className={style.linea}></div>

                    <div className={style.loginRegister}>
                        <p>Nuevo en GravX?</p>
                        <Link to="/Register">Crear cuenta</Link>
                    </div>
                </form>
            </section>
        </>
    );
};

export default Login;
