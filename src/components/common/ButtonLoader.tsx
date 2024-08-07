import React from "react";
import "../styles/ButtonLoader.css";
import { height } from "@mui/system";

const ButtonLoader = () => {
  return (
    <div className="container">
      <div className="loading-wave">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
      </div>
    </div>
  );
};

export default ButtonLoader;
