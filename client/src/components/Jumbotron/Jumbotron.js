import React from "react";
import './Jumbotron.css';

const Jumbotron = ({ children }) => (
  <div
    className="jumbotron font-3 text-center mb-0 responsive-text"
  >
    {children}
  </div>
);

export default Jumbotron;