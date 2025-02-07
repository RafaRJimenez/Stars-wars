import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const DetailPage = () => {
    const location = useLocation();
    const navigate = useNavigate(); 


    const { user, users, nextPage, films, isFirstRender } = location.state || {};

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div>
            <div>
                <button onClick={() => navigate("/", { state: { users, nextPage, films, isFirstRender } })}>HOME</button>
            </div>
            <h1>{user.name}</h1>
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
    );
};

export default DetailPage;
