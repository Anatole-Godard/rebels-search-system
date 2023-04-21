import {useEffect, useState} from "react";
import {useUser} from "../hooks/UseAuth";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Loader} from "../components/Loader";
import styles from "./Entity.module.scss";

const baseApiUrl = import.meta.env.VITE_NODE_API_URL;

export const Films = () => {
    const {id} = useParams();
    const [data, setData] = useState<any | null>(null);

    useEffect(() => {
        fetchFilms()
    }, []);

    const {token, setToken} = useUser();
    const fetchFilms = async () => {
        const config = {
            headers: {"Authorization": `Bearer ${token}`}
        };
        const res: any = await axios.get(`${baseApiUrl}/starwars/films/${id}`,
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
                        <div><h1>{data.title}</h1>
                            <div className={styles.cardInfoContent}>
                                <p>Numéro d'épisode : <span>{data.episode_id}</span></p>
                                <p>Ouverture : <span>{data.opening_crawl}</span></p>
                                <p>Réalisateur : <span>{data.director}</span></p>
                                <p>Producteur : <span>{data.producer}</span></p>
                                <p>Date de sortie : <span>{data.release_date}</span></p>
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