import React from "react";

export const FormBtn = props => (
  <button {...props} style={{ margin: "auto"}} className="btn btn-secondary">
    {props.children}
  </button>
);