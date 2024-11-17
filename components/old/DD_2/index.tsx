"use client";
import React from "react";
import Draggable from "react-draggable";
import { Box } from "@mui/material";

const DD_2 = () => {
  return (
    <div
      style={{
        // width: "100%",
        // height: "100vh",
        backgroundImage: 'url("https://via.placeholder.com/800x600")', // 背景画像
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Draggable>
        <Box
          sx={{
            padding: "8px 16px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            cursor: "grab",
            userSelect: "none",
            border: "1px solid black",
            position: "absolute",
          }}
        >
          Drag me!
        </Box>
      </Draggable>
    </div>
  );
};

export default DD_2;
