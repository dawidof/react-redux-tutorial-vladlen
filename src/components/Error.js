import React from "react";

export const Error = ({ text }) => (
  <div className="alert alert-danger" role="alert">
    {text}
  </div>
);
