import React from "react";

export const ListItem = props => (
  <li className="list-group-item blue-br">
    <div>
      <a target="_blank" href={props.url}> {props.title}</a>
      <p>{props.date}</p>
      {props.children}
    </div>
  </li>
);
