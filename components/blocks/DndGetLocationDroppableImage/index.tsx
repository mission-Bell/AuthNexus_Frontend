import React from "react";
import Image from "next/image";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import localImage from "@/public/images/hyomolabo_image.png";

const DndGetLocationDroppableImage = () => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
  const style = {
    color: isOver ? "green" : undefined,
    border: "solid 1px",
    width: "500px",
    height: "500px",
  };
  return (
    <Box ref={setNodeRef} style={style}>
      <Image src={localImage} width={500} height={500} alt=""></Image>
    </Box>
  );
};

export default DndGetLocationDroppableImage;
