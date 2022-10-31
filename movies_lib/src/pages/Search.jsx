import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import "./MovieGrid.css";

const seachURL = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;

function Search() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('q');

  const getSearchedMovies = async (url) => {
    const res = await fetch(url)
      .then((res) => res.json())
      .catch((err) => err);
    setMovies(res.results);
  };

  useEffect(() => {
    const searchWithQuery = `${seachURL}?${apiKey}&query=${query}`;
    getSearchedMovies(searchWithQuery);
  }, [query]);

  return (
    <div className="container">
      <h2 className="title">
        Resultados para: <span className="query-text">{query}</span>
      </h2>
      <div className="movies-container">
        {movies.length === 0 && <p>Nenhum resultado encontrado</p>}
        {movies.length > 0 &&
          movies.map((movie) => (
            <MovieCard movie={movie} showLink={true} key={movie.id} />
          ))}
      </div>
    </div>
  );
}

export default Search;
