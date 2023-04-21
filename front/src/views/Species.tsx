import {useEffect, useState} from "react";
import {useUser} from "../hooks/UseAuth";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Loader} from "../components/Loader";
import styles from "./Entity.module.scss";

const baseApiUrl = import.meta.env.VITE_NODE_API_URL;

export const Species = () => {
    const {id} = useParams();
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        fetchSpecies()
    }, []);

    const {token, setToken} = useUser();
    const fetchSpecies = async () => {
        const config = {
            headers: {"Authorization": `Bearer ${token}`}
        };
        const res: any = await axios.get(`${baseApiUrl}/starwars/species/${id}`,
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
                                <p>Hauteur : <span>{data.average_height}</span></p>
                                <p>Durée de vie moyenne : <span>{data.average_lifespan}</span></p>
                                <p>Classification : <span>{data.classification}</span></p>
                                <p>Designation : <span>{data.designation}</span></p>
                                <p>Couleurs des yeux : <span>{data.eye_colors}</span></p>
                                <p>Couleurs des cheveux : <span>{data.hair_colors}</span></p>
                                <p>Langue : <span>{data.language}</span></p>
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