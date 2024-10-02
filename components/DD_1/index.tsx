"use client";
import React, { useState, useRef } from "react";
import { Box } from "@mui/material";

const DD_1 = () => {
  // テキストの位置を管理するためのstate
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // ドラッグを開始する処理
  const handleMouseDown = (event: React.MouseEvent) => {
    setIsDragging(true);
    // ドラッグ開始時のカーソル位置とボックス位置の差を計算
    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  };

  // ドラッグ中の処理
  const handleMouseMove = (event: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      });
    }
  };

  // ドラッグを終了する処理
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: 'url("https://via.placeholder.com/800x600")', // 背景画像
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Box
        onMouseDown={handleMouseDown}
        sx={{
          position: "absolute",
          left: position.x,
          top: position.y,
          padding: "8px 16px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          cursor: "grab",
          userSelect: "none",
          border: "1px solid black",
        }}
      >
        Drag me!
      </Box>
    </div>
  );
};

export default DD_1;
