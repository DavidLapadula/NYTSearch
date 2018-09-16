import React from "react";
import './Card.css';

const Card = props => (
    <div className="card mt-4">
        <h5 className="card-header text-center">{props.header}</h5>
        <div className="card-body">
        {props.children}
        </div>
    </div>
);

export default Card;