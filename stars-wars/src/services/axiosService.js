import APIRequest from '../utils/config/axios.config';

export const getAllUsers = () => {
    return APIRequest.get('people/');
}

export const getUserById = (id) => {
    return APIRequest.get(`people/${id}`);
}

export const getFilmById = (id) => {
    return APIRequest.get(`films/${id}`);
}