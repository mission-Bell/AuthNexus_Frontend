import React from "react";
import DD_1 from "@/components/old/DD_1";
import DD_2 from "@/components/old/DD_2";
import DD_3 from "@/components/old/DD_3";
import MyServer from "@/components/old/DD_4/MyServer";
import { Box } from "@mui/material";

const DragDropPage = () => {
  return (
    <div>
      {/* <Box sx={{ width: "100px", height: "200px" }}>
        CSSのみでDD
        <DD_1 />
      </Box>
      <Box sx={{ width: "100px", height: "200px" }}>
        eact-draggableでDD
        <DD_2 />
      </Box>
      <Box sx={{ width: "100px", height: "200px" }}>
        eact-draggableでsave positions
        <DD_3 />
      </Box> */}
      <Box sx={{ width: "100px", height: "200px" }}>
        eact-draggableでsave positions
        <MyServer />
      </Box>
    </div>
  );
};

export default DragDropPage;
