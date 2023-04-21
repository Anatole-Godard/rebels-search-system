import {useEffect, useState} from "react";
import {useUser} from "../hooks/UseAuth";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Loader} from "../components/Loader";
import styles from "./Entity.module.scss";

const baseApiUrl = import.meta.env.VITE_NODE_API_URL;

export const Starships = () => {
    const {id} = useParams();
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        fetchStarships()
    }, []);

    const {token, setToken} = useUser();
    const fetchStarships = async () => {
        const config = {
            headers: {"Authorization": `Bearer ${token}`}
        };
        const res: any = await axios.get(`${baseApiUrl}/starwars/starships/${id}`,
            config
        ).catch(() => {
            setToken(null);
        });
        setData(res.data);
    }
    return (
        <div className={styles.container}>
            {!data ?
                <Loader/> :
                <>
                    <div className={styles.cardInfo}>
                        <div><h1>{data.name}</h1>
                            <div className={styles.cardInfoContent}>
                                <p>Modèle : <span>{data.model}</span></p>
                                <p>Fabricant : <span>{data.manufacturer}</span></p>
                                <p>Longueur : <span>{data.length}</span></p>
                                <p>Capacité de cargo : <span>{data.cargo_capacity}</span></p>
                                <p>Capacité de passagers : <span>{data.passengers}</span></p>
                                <p>Équipage : <span>{data.crew}</span></p>
                                <p>Vitesse maximale atmosphérique : <span>{data.max_atmosphering_speed}</span></p>
                                <p>Autonomie : <span>{data.consumables}</span></p>
                                <p>Classe de l'hyperdrive : <span>{data.hyperdrive_rating}</span></p>
                                <p>Coût : <span>{data.cost_in_credits}</span></p>
                            </div>
                        </div>
                        <div className={styles.back} onClick={() => {
                            window.history.back();
                        }}>
                            <span>Retour</span>
                        </div>
                    </div>
                </>}
        </div>
    )
};