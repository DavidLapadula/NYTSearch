import React from "react";

export const ListItem = props => (
  <li className="list-group-item blue-br m-3 rounded">
    <div>
      <a className="mb-2 h5" target="_blank" href={props.url}> {props.title}</a>
      <p className="mt-2">Publication Date: {props.date}</p>
      {props.savedDate ? <p className="mt-2">Date Saved: {props.savedDate}</p> : "" }
      {props.children}
    </div>
  </li>
);
