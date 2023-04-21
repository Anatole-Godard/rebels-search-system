import React, {useState} from "react";
import {useUser} from "../hooks/UseAuth";
import axios from "axios";
import styles from "./Login.module.scss";
import {useNavigate} from "react-router-dom";

const baseApiUrl = import.meta.env.VITE_NODE_API_URL
export const Login = () => {
    const {setToken} = useUser();
    const navigate = useNavigate();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [error, setError] = useState<string | null>(null);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (username && password) {
            axios.post(`${baseApiUrl}/login`, {username, password}).then((response) => {
                setToken(response.data?.result?.token);
                setError(null);
                navigate("/home")
            }).catch(() => {
                setError("Identifiants incorrects");
            })
        } else {
            setError("Veuillez remplir tous les champs");
        }
    }

    return (
        <div className={styles.container}>
            <h1>Connexion</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="username">Nom d'utilisateur</label>
                    <input id="username" name="username"
                           type="username"
                           className={error !== null && !username ? styles.inputError : ""}
                           autoComplete="username"
                           autoFocus
                           onChange={handleEmailChange}
                           value={username}
                    ></input>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={error !== null && !password ? styles.inputError : ""}
                        autoComplete="password"
                        onChange={handlePasswordChange}
                        value={password}
                    ></input>
                </div>
                {error !== null && <div className={styles.error}>{error}</div>}
                <button className={styles.button} type="submit">
                    Se connecter
                </button>
            </form>
        </div>
    );
}