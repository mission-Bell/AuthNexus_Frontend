"use client";
import React from "react";

const UseCallbackPage = () => {
  const fn = () => {
    console.log("call fn");
  };
  return (
    <div>
      <p>parent component</p>
      <ChildComponent fn={fn} />
    </div>
  );
};

interface ClildComponentProps {
  fn: () => void;
}

const ChildComponent = ({ fn }: ClildComponentProps) => {
  return (
    <div>
      <button onClick={() => fn}>click</button>
    </div>
  );
};

export default UseCallbackPage;
