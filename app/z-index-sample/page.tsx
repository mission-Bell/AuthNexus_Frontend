import React from "react";

const ZIndexSamplePage = () => {
  return (
    <div>
      <div
        style={{
          position: "relative",
          zIndex: 4,
          background: "lightblue",
          padding: "20px",
        }}
      >
        親要素 (z-index: 1)
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            background: "lightcoral",
            width: "100px",
            height: "100px",
          }}
        >
          子要素 (z-index: 2)
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 3,
            background: "lightgreen",
            width: "100px",
            height: "100px",
          }}
        >
          子要素 (z-index: 1)
        </div>
      </div>
    </div>
  );
};

export default ZIndexSamplePage;
