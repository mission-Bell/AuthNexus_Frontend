//サーバからポジションを取得
import React from "react";
import MyButton from "./MyButton";
import { Box } from "@mui/material";
import MyClient from "./MyClient";

interface MyClientProps {
  x: number;
  y: number;
}

const MyServer = async () => {
  const response = await fetch("http://localhost:3000/api/saved-position");
  const data: MyClientProps = await response.json();
  return (
    <div>
      <Box sx={{ color: "black" }}>data{data.x}</Box>
      <div>
        <MyClient x={data.x} y={data.y} />
      </div>
    </div>
  );
};

export default MyServer;
