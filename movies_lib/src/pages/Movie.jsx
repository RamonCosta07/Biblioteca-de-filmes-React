import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
  BsFilm,
} from "react-icons/bs";
import MovieCard from "../components/MovieCard";
import "./Movie.css";
const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  const getMovie = async (url) => {
    const res = await fetch(url)
      .then((res) => res.json())
      .catch((err) => err);
    setMovie(res);
  };

  useEffect(() => {
    const movieUrl = `${moviesURL}${id}?${apiKey}`;
    getMovie(movieUrl);
  }, []);

  const formatValue = (number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  return (
    <div className="movie-page">
      {movie && (
        <>
          {<MovieCard movie={movie} showLink={false} />}
          <p className="tag-line">{movie.tagline}</p>
          <div className="info">
            <h3>
              <BsWallet2 />
              Orçamento:
            </h3>
            {movie.budget > 0 ? (
              formatValue(movie.budget)
            ) : (
              <span className="not-found">
                <p>Valor Desconhecido</p>
              </span>
            )}
          </div>

          <div className="info">
            <h3>
              <BsGraphUp />
              Faturamento:
            </h3>
            {movie.revenue > 0 ? (
              formatValue(movie.revenue)
            ) : (
              <span className="not-found">
                <p>Valor Desconhecido</p>
              </span>
            )}
          </div>

          <div className="info">
            <h3>
              <BsHourglassSplit />
              Duração:
            </h3>
            {movie.runtime} minutos
          </div>

          <div className="info description">
            <h3>
              <BsFillFileEarmarkTextFill />
              Descrição:
            </h3>
            {movie.overview}
          </div>
        </>
      )}
    </div>
  );
}

export default Movie;
