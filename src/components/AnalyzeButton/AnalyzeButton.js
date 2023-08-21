import React from "react";

function AnalyzeButton({ segids }) {
  const buttonClick = () => {
    // here's where i want to make a request to the api with seg ids.
    console.log("click click i'm a button");
  };
  return <button onClick={buttonClick}>Analyze Segments</button>;
}

export default AnalyzeButton;
