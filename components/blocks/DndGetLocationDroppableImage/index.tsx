import React from "react";
import Image from "next/image";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import localImage from "@/public/images/yoko.jpeg";
// const localImage = "/app/authnexusf/public/images/sample.pdf";
import { DndDraggableNumber } from "@/components/templates/DndGetLocationTemplate";
import DndGetLocationDraggableNumber from "../DndGetLocationDraggableNumber";
import { Worker, Viewer } from "@react-pdf-viewer/core";

interface DndGetLocationDroppableImageProps {
  isZoomed: boolean;
  isPdf: boolean;
}

const DndGetLocationDroppableImage = ({
  isZoomed,
  isPdf,
}: DndGetLocationDroppableImageProps) => {
  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });
  console.log("isOver", isOver);
  return (
    <Box

      sx={{
        // width: "100%", // 親要素の幅
        // height: "100%", // 親要素の高さ
      }}
    >
      {/* <Box ref={setNodeRef} style={style}> */}
      <Box
        sx={{
          //display: "inline-block",
          // width: "100%",
          // height: "100%",
          //overflow: isZoomed ? "scroll" : "hidden", // ズーム時にスクロール可能に
          //position: "rative", // 子要素を制御
          // zIndex: 1, // 子要素を手前に表示
        }}
      >
        {isPdf ? (
          <Box
            sx={{
              transition: "transform 0.3s ease-in-out",
              transform: isZoomed ? "scale(1.5)" : "scale(1)", // ズームの制御
              transformOrigin: "top left", // ズーム時の中心を指定
              cursor: isZoomed ? "grab" : "default", // ズーム時にポインタを変更
              display: "block",
              // zIndex: 10000, // 子要素を手前に表示

            }}>
            <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`}>
              <Viewer fileUrl={'/sample.pdf'} />
            </Worker>
          </Box>
        ) : (
          <Image
            ref={setNodeRef}
            src={localImage}
            alt=""
            style={{
              // transition: "transform 0.3s ease-in-out",
              // transform: isZoomed ? "scale(1.5)" : "scale(1)", // ズームの制御
              // transformOrigin: "top left", // ズーム時の中心を指定
              // cursor: isZoomed ? "grab" : "default", // ズーム時にポインタを変更
              // display: "block",
              // zIndex: 10000, // 子要素を手前に表示
            }}

          />
        )}
      </Box>
    </Box>
  );
};

export default DndGetLocationDroppableImage;
