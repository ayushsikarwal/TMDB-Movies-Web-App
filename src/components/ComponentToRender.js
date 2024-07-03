import React from "react";

const ComponentToRender = (props) => {
  const MAX_SENTENCES = 2; 
  const sentences = props.movie.overview.split(". ");
  const truncatedSentences = sentences.slice(0, MAX_SENTENCES);
  const truncatedOverview =
    truncatedSentences.join(". ") +
    (sentences.length > MAX_SENTENCES ? "..." : "");

  return (
    <div className="movie-details">
      <h2>{props.movie.title}</h2>
      <p>{truncatedOverview}</p>
    </div>
  );
};

export default ComponentToRender;
