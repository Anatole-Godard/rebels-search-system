import axios from "axios";
import {useUser} from "../hooks/UseAuth";
import {v4 as uuidv4} from 'uuid';
import {useEffect, useState} from "react";
import "./home.css"

const baseApiUrl = process.env.REACT_APP_NODE_API_URL;
const importantData = [
    {key: "name", label: "Nom"},
    {key: "height", label: "Hauteur"},
    {key: "mass", label: "Poids"},
    {key: "hair_color", label: "Couleur de peau"},
    {key: "skin_color", label: "Couleur des yeux"},
    {key: "eye_color", label: "Date de naissance"},
];

export const Home = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchCharacter()
    }, []);

    const {token} = useUser();
    const fetchCharacter = async () => {
        const config = {
            headers: {"Authorization": `Bearer ${token}`}
        };
        const res = await axios.get(`${baseApiUrl}/starwars`,
            config
        );
        setData(res.data.results);
    }

    return (
        <div className="container">
            <h1>Home</h1>
            <table>
                <thead>
                <tr>
                    {importantData.map((value) => (
                        <th key={uuidv4()}>
                            {value.label}
                        </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((data) => (
                    <tr key={uuidv4()}>
                        {importantData.map((value) => (
                            <td key={uuidv4()}>
                                {data[value.key]}
                            </td>
                        ))}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );

};