import axios from "axios";
import {useUser} from "../hooks/UseAuth";
import {v4 as uuidv4} from 'uuid';
import {useEffect, useState} from "react";
import styles from "./Home.module.scss";
import {useNavigate} from "react-router-dom";
import {Loader} from "../components/Loader";

const baseApiUrl = import.meta.env.VITE_NODE_API_URL;

export const Home = () => {
    const [dataList, setDataList] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("people");
    const [displayedType, setDisplayedType] = useState("people");
    const navigate = useNavigate();

    useEffect(() => {
        fetchCharacters()
    }, []);

    const {token, setToken} = useUser();
    const fetchCharacters = async (isSearch = false) => {
        const config = {
            headers: {"Authorization": `Bearer ${token}`}
        };
        let url = `${baseApiUrl}/starwars`
        if (isSearch) {
            url += `?type=${type}&search=${search}`
        }

        const res: any = await axios.get(url,
            config
        ).catch(() => {
            setToken(null);
        });
        setDataList(res.data.results);
    }

    return (
        <div className={styles.container}>
            <h1>Home</h1>
            <form className={styles.searchForm} onSubmit={event => {
                event.preventDefault();
                fetchCharacters(true);
                setDisplayedType(type)
            }}>
                <div className={styles.formGroup}>
                    <div className={styles.formColumn}>
                        <label className={styles.label} htmlFor="search">Rechercher</label>

                        <input className={styles.input}
                               onChange={(e) => {
                                   setSearch(e.target.value)
                               }}
                               id="search" type="text" placeholder="Rechercher"/>
                    </div>
                    <div className={styles.formColumn}>
                        <label className={styles.label} htmlFor="type">Type</label>
                        <select id="type" defaultValue={type} onChange={(e) => {
                            setType(e.target.value)
                        }}>
                            <option value="people">Personage</option>
                            <option value="films">Films</option>
                            <option value="starships">Navettes</option>
                            <option value="species">Espèces</option>
                            <option value="vehicles">Vehicules</option>
                        </select>
                    </div>
                    <button type="submit">Rechercher</button>
                </div>
            </form>
            {dataList && dataList.length === 0 ?
                <Loader/> :
                <div className={styles.cardList}>
                    {dataList.map((entity: any) =>
                        <div key={uuidv4()} className={styles.card} onClick={() => {
                            navigate(`/${displayedType}/${entity.url.split("/").reverse()[1]}`)
                        }}>
                            <div key={uuidv4()} className={styles.cardContent}>
                                <h2 key={uuidv4()}>{entity.name || entity.title}</h2>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    );

};