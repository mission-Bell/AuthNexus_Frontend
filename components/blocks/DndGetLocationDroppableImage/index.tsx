import React from "react";
import Image from "next/image";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import localImage from "@/public/images/hyomolabo_image.png";

interface DndGetLocationDroppableImageProps {
  isZoomed: boolean;
}

const DndGetLocationDroppableImage = ({
  isZoomed,
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
        width: "500px", // 親要素の幅
        height: "500px", // 親要素の高さ
        overflow: "hidden", // はみ出した部分を非表示に
        border: "1px solid #ccc",
        borderRadius: "8px",
        position: "relative", // 子要素を正しく配置するために設定
        zIndex: 1, // 子要素を手前に表示
      }}
    >
      {/* <Box ref={setNodeRef} style={style}> */}
      <Box
        ref={setNodeRef}
        sx={{
          display: "inline-block",
          width: "100%",
          height: "100%",
          overflow: isZoomed ? "scroll" : "hidden", // ズーム時にスクロール可能に
          position: "relative", // 子要素を制御
          zIndex: 1, // 子要素を手前に表示
        }}
      >
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
            zIndex: 1, // 子要素を手前に表示
          }}
        ></Image>
      </Box>
    </Box>
  );
};

export default DndGetLocationDroppableImage;
