import axios from 'axios';

export default axios.create(
    {
        baseURL: 'https://swapi.dev/api/',
        responseType: 'json',
        timeout: 60000
    }
);
