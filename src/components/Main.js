import React, { useState } from "react";
import ComponentToRender from "./ComponentToRender";

const Main = (props) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const FavComp = props.favcomp;

  return (
    <main className={props.darkMode ? "dark" : ""}>
      <div className="column">
        {props.movies.map((movie, index) => (
          <div
            className="mv"
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div className="df">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
                alt="Clickable Image"
                className="main--img"
              />
              {hoveredIndex === index && (
                <div className="overlay1">
                  <ComponentToRender movie={movie} />
                </div>
              )}
            </div>
            <div className="card--stats">
              <FavComp handlefavclick={props.handlefavclick} movie={movie} />
              <span className="gray">{movie.vote_average} </span>
            </div>
            <p className="card--title">{movie.title}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Main;
