"use client";
import React from "react";

const Search2 = () => {
  const handleClcik = () => {
    console.log("clicked!");
  };
  return (
    <div>
      <button onClick={handleClcik}>button1</button>
    </div>
  );
};

export default Search2;
