import React from "react";
import "./styles.css";
export const Button = ({ loadMorePosts, text, disabled }) => {
  return (
    <button disabled={disabled} className="button" onClick={loadMorePosts}>
      {text}
    </button>
  );
};
