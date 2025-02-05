import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/axiosService";
import axios from 'axios';

const HomePage = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();
                const usersWithFilms = await Promise.all(response.data.results.map(async user => {
                    const films = await Promise.all(user.films.map(async filmUrl => {
                        const filmId = filmUrl.match(/\/(\d+)\/$/)[1]; // Extract the film ID
                        const filmResponse = await axios.get(filmUrl);
                        return { id: filmId, title: filmResponse.data.title };
                    }));
                    return { ...user, films };
                }));
                console.log(usersWithFilms);
                setUsers(usersWithFilms);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div>
            <h1>Star Wars Characters</h1>
            <div className="card-container">
                {users.map((user, index) => (
                    <div className="card" key={index}>
                        <h2>{user.name}</h2>
                        <h4>Height: {user.height}</h4>
                        <h4>Gender: {user.gender}</h4>
                        <h4>Birth Year: {user.birth_year}</h4>
                        <h4>Eye Color: {user.eye_color}</h4>
                        <h4>Hair Color: {user.hair_color}</h4>
                        <h4>Mass: {user.mass}</h4>
                        <p>{user.films.length} FILMS</p>
                        {user.films.map((film, index) => (
                            <p key={index}>{film.id}: {film.title}</p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;