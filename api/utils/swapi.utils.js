import axios from 'axios';

export const fetchCharacters = async (type, search) => {
    let apiUrl = `https://swapi.dev/api/${type}`;
    if (search) {
        apiUrl += `?search=${search}`;
    }
    const response = await axios.get(apiUrl);
    return response.data;
};
export const fetchCharacter = async (type, id) => {
    let apiUrl = `https://swapi.dev/api/${type}/${id}`;
    const response = await axios.get(apiUrl);
    return response.data;
}