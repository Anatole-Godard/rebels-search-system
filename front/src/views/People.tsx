import {useEffect, useState} from "react";
import {useUser} from "../hooks/UseAuth";
import {useParams} from "react-router-dom";
import axios from "axios";
import {PeopleType} from "../type/PeopleType";
import {Loader} from "../components/Loader";
import styles from "./Entity.module.scss";

const baseApiUrl = import.meta.env.VITE_NODE_API_URL;

export const People = () => {
    const {id} = useParams();
    const [data, setData] = useState<PeopleType | null>(null);

    useEffect(() => {
        fetchCharacter()
    }, []);

    const {token, setToken} = useUser();
    const fetchCharacter = async () => {
        const config = {
            headers: {"Authorization": `Bearer ${token}`}
        };
        const res: any = await axios.get(`${baseApiUrl}/starwars/people/${id}`,
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
                                <p>Nom : <span>{data.name}</span></p>
                                <p>Hauteur : <span>{data.height}</span></p>
                                <p>Poids : <span>{data.mass}</span></p>
                                <p>Couleur des yeux : <span>{data.eye_color}</span></p>
                                <p>Couleur des cheveux : <span>{data.hair_color}</span></p>
                                <p>Couleur de peau : <span>{data.skin_color}</span></p>
                                <p>Date de naissance : <span>{data.birth_year}</span></p>
                                <p>Genre : <span>{data.gender}</span></p>
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