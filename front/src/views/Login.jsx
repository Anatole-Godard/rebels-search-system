import {useState} from "react";
import {useUser} from "../hooks/UseAuth";
import axios from "axios";
import "./login.css"
import {useNavigate} from "react-router-dom";

const baseApiUrl = process.env.REACT_APP_NODE_API_URL
export const Login = () => {
    const {setToken} = useUser();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(null);

    const handleEmailChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (event) => {
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
        <div className="container">
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Nom d'utilisateur</label>
                    <input id="username" name="username"
                           type="username"
                           className={error !== null && !username ? "input-error" : ""}
                           autoComplete="username"
                           autoFocus
                           onChange={handleEmailChange}
                           value={username}
                    ></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className={error !== null && !password ? "input-error" : ""}
                        autoComplete="password"
                        onChange={handlePasswordChange}
                        value={password}
                    ></input>
                </div>
                {error !== null && <div className="error">{error}</div>}
                <button className="submit" type="submit">
                    Se connecter
                </button>
            </form>
        </div>
    );
}