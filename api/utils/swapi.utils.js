import axios from 'axios';

export const fetchCharacter = async (characterId) => {
    const apiUrl = `https://swapi.dev/api/people/${characterId}`;
    const response = await axios.get(apiUrl);
    return response.data;
}