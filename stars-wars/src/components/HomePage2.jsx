import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/axiosService";
import axios from 'axios';

const HomePage = () => {
    const [users, setUsers] = useState([]);
    const [nextPage, setNextPage] = useState(null);
    const [films, setFilms] = useState({});

    useEffect(() => {
        const fetchFilms = async () => {
            try {
                const filmsResponse = await axios.get('https://swapi.dev/api/films/');
                const filmsData = filmsResponse.data.results.reduce((acc, film) => {
                    const match = film.url.match(/\/(\d+)\/$/);
                    if (match) {
                        acc[match[1]] = film.title;
                    }
                    return acc;
                }, {});
                setFilms(filmsData);
            } catch (error) {
                console.error("Error fetching films:", error);
            }
        };

        fetchFilms();
    }, []);


    const fetchUsers = async (page) => {
        try {
            const usersResponse = await getAllUsers(page);
            const usersWithFilms = usersResponse.data.results.map(user => {
                const userFilms = user.films.map(filmUrl => {
                    const match = filmUrl.match(/\/(\d+)\/$/);
                    if (match) {
                        const filmId = match[1];
                        return { id: filmId, title: films[filmId] };
                    }
                    return null;
                }).filter(film => film !== null);
                return { ...user, films: userFilms };
            });
            setUsers(prevUsers => [...prevUsers, ...usersWithFilms]);
            if (usersResponse.data.next) {
                setNextPage(usersResponse.data.next.match(/page=(\d+)/)[1]);
            } else {
                setNextPage(null);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        if (Object.keys(films).length === 0) return;
        fetchUsers();
    }, [films]);


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
            <div>
                {nextPage && <button onClick={ () => fetchUsers(nextPage)}>Load more page {nextPage}</button>}
            </div>
        </div>
    );
};

export default HomePage;






// import React, { useEffect, useState } from "react";
// import { getAllUsers } from "../services/axiosService";
// import axios from 'axios';

// const HomePage = () => {
//     const [users, setUsers] = useState([]);
//     const [films, setFilms] = useState({});

//     useEffect(() => {
//         const fetchFilms = async () => {
//             try {
//                 const response = await axios.get('https://swapi.dev/api/films/');
//                 const filmsData = response.data.results.reduce((acc, film) => {
//                     acc[film.url.match(/\/(\d+)\/$/)[1]] = film.title;
//                     return acc;
//                 }, {});
//                 setFilms(filmsData);
//             } catch (error) {
//                 console.error("Error fetching films:", error);
//             }
//         };

//         const fetchUsers = async () => {
//             try {
//                 const response = await getAllUsers();
//                 const usersWithFilms = response.data.results.map(user => {
//                     const userFilms = user.films.map(filmUrl => {
//                         const filmId = filmUrl.match(/\/(\d+)\/$/)[1];
//                         return { id: filmId, title: films[filmId] };
//                     });
//                     return { ...user, films: userFilms };
//                 });
//                 setUsers(usersWithFilms);
//             } catch (error) {
//                 console.error("Error fetching users:", error);
//             }
//         };

//         const fetchData = async () => {
//             await fetchFilms();
//             await fetchUsers();
//         };

//         fetchData();
//     }, []);

//     return (
//         <div>
//             <h1>Star Wars Characters</h1>
//             <div className="card-container">
//                 {users.map((user, index) => (
//                     <div className="card" key={index}>
//                         <h2>{user.name}</h2>
//                         <h4>Height: {user.height}</h4>
//                         <h4>Gender: {user.gender}</h4>
//                         <h4>Birth Year: {user.birth_year}</h4>
//                         <h4>Eye Color: {user.eye_color}</h4>
//                         <h4>Hair Color: {user.hair_color}</h4>
//                         <h4>Mass: {user.mass}</h4>
//                         <p>{user.films.length} FILMS</p>
//                         {user.films.map((film, index) => (
//                             <p key={index}>{film.id}: {film.title}</p>
//                         ))}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HomePage;