import React from "react";
import Image from "next/image";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
// import localImage from "@/public/images/hyomolabo_image.png";
const localImage = "/app/authnexusf/public/images/sample.pdf";
import { DndDraggableNumber } from "@/components/templates/DndGetLocationTemplate";
import DndGetLocationDraggableNumber from "../DndGetLocationDraggableNumber";
interface DndGetLocationDroppableImageProps {
  isZoomed: boolean;
  dndDraggableNumberList: DndDraggableNumber[];
  dndTest: number;
}

const DndGetLocationDroppableImage = ({
  isZoomed,
  dndDraggableNumberList,
  dndTest,
}: DndGetLocationDroppableImageProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  const style = {
    color: isOver ? "green" : undefined,
    border: "solid 1px",
    width: "500px",
    height: "500px",
  };
  return (
    <Box
      sx={{
        width: "100%", // 親要素の幅
        height: "100%", // 親要素の高さ
      }}
    >
      {/* <Box ref={setNodeRef} style={style}> */}
      <Box
        ref={setNodeRef}
        sx={{
          //display: "inline-block",
          width: "100%",
          height: "100%",
          //overflow: isZoomed ? "scroll" : "hidden", // ズーム時にスクロール可能に
          //position: "rative", // 子要素を制御
          zIndex: 1, // 子要素を手前に表示
        }}
      >
        <Box sx={{ position: "absolute", left: `${dndTest}px` }}>
          image{dndTest}
        </Box>
        {/* <embed src={localImage} /> */}
        <Image
          src={localImage}
          width={500}
          height={500}
          alt=""
          style={{
            transition: "transform 0.3s ease-in-out",
            transform: isZoomed ? "scale(1.5)" : "scale(1)", // ズームの制御
            transformOrigin: "top left", // ズーム時の中心を指定
            cursor: isZoomed ? "grab" : "default", // ズーム時にポインタを変更
            display: "block",
            zIndex: 10000, // 子要素を手前に表示
          }}
        />
      </Box>
    </Box>
  );
};

export default DndGetLocationDroppableImage;
