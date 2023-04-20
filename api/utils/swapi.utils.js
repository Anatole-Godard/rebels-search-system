import axios from 'axios';

export const fetchCharacter = async () => {
    const apiUrl = `https://swapi.dev/api/people`;
    const response = await axios.get(apiUrl);
    return response.data;
}