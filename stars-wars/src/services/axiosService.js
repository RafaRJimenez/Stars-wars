import APIRequest from '../utils/config/axios.config';

export const getAllUsers = (page) => {
    if (page === undefined) {
        return APIRequest.get('people/');
    } else {
        return APIRequest.get(`people/?page=${page}`);
    }
}

export const getUserById = (id) => {
    return APIRequest.get(`people/${id}`);
}

export const getFilmById = (id) => {
    return APIRequest.get(`films/${id}`);
}