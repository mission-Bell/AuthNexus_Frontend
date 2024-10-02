"use client";
import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Box } from "@mui/material";

// localStorageに保存するキー
const STORAGE_KEY = "draggablePosition";

const DD_3 = () => {
  // 位置を管理するstate
  const [position, setPosition] = useState({ x: 100, y: 100 });

  // ページロード時にlocalStorageから位置を読み込む
  useEffect(() => {
    const savedPosition = localStorage.getItem(STORAGE_KEY);
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  // ドラッグ終了時に位置をlocalStorageに保存する
  const handleStop = (e: any, data: any) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPosition));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundImage: 'url("https://via.placeholder.com/800x600")', // 背景画像
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Draggable
        position={position}
        onStop={handleStop} // ドラッグ終了時に呼ばれる
      >
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

export default DD_3;
