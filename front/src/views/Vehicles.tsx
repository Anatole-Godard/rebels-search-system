import {useEffect, useState} from "react";
import {useUser} from "../hooks/UseAuth";
import {useParams} from "react-router-dom";
import axios from "axios";
import {PeopleType} from "../type/PeopleType";
import {Loader} from "../components/Loader";
import styles from "./Entity.module.scss";

const baseApiUrl = import.meta.env.VITE_NODE_API_URL;

export const Vehicles = () => {
    const {id} = useParams();
    const [data, setData] = useState<PeopleType | null>(null);

    useEffect(() => {
        fetchVehicles()
    }, []);

    const {token, setToken} = useUser();
    const fetchVehicles = async () => {
        const config = {
            headers: {"Authorization": `Bearer ${token}`}
        };
        const res: any = await axios.get(`${baseApiUrl}/starwars/vehicles/${id}`,
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
                                <p>Longueur : <span>{data.length}</span></p>
                                <p>Capacité de fret : <span>{data.cargo_capacity}</span></p>
                                <p>Vitesse atmosphérique maximale : <span>{data.max_atmosphering_speed}</span></p>
                                <p>Nombre de passagers : <span>{data.passengers}</span></p>
                                <p>Nombre de membres d'équipage : <span>{data.crew}</span></p>
                                <p>Fabricant : <span>{data.manufacturer}</span></p>
                                <p>Modèle : <span>{data.model}</span></p>
                                <p>Coût : <span>{data.cost_in_credits}</span></p>
                                <p>Consommables : <span>{data.consumables}</span></p>
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