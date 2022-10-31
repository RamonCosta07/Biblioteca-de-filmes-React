import { useState, useEffect } from "react";
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
// Components
import MovieCard from "../components/MovieCard";
// CSS
import './MovieGrid.css';

function Home() {
  const [topMovies, setTopMovies] = useState([]);

  const getTopRatedMovies = async (url) => {
    const res = await fetch(url)
      .then((res) => res.json())
      .catch((err) => err);
    setTopMovies(res.results);
    //console.log(res.results);
  };

  useEffect(() => {
    const topRatedUrl = `${moviesURL}top_rated?${apiKey}`;
    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Filmes Mais Bem Avaliados</h2>
      <div className="movies-container">
        {topMovies.length === 0 && <p>~Carregando~</p>}
        {topMovies.length > 0 && (
          topMovies.map((movie) => <MovieCard movie={movie} showLink={true} key={movie.id} />)
        )}
      </div>
    </div>
  );
}

export default Home;
