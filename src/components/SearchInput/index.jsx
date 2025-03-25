import React from "react";
import "./styles.css";

export const SearchInput = ({ searchValue, handleChange }) => {
  return (
    <input
      className="search"
      type="search"
      value={searchValue}
      onChange={handleChange}
    />
  );
};
