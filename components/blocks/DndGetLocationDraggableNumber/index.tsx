import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";
interface DraggableNumberProps {
  dropPosition: { x: number; y: number };
  id: number;
}

const DndGetLocationDraggableNumber = ({
  dropPosition,
  id,
}: DraggableNumberProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `number-${id}`,
  });

  console.log("dropPosition", dropPosition);
  // ドラッグ中のスタイル(transform ?)と、ドロップ後のスタイル(dropPosition ?)を用意しておく必要がある
  // ドラッグ中のスタイルがない場合、ドラッグ中のアニメーションがなくなる
  // ドロップ後のスタイルがない場合、ドロップ後位置へ要素が移動しない
  const style = transform
    ? {
        transform: `translate3d(${transform.x + dropPosition.x}px, ${
          transform.y + dropPosition.y
        }px, 0)`,
        zIndex: 1000,
      }
    : dropPosition
    ? {
        transform: `translate(${dropPosition.x}px, ${dropPosition.y}px, 0)`,
        zIndex: 1000,
      }
    : undefined;
  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{ border: "solid 1px green", display: "inline-block", zIndex: 1000 }}
    >
      <Typography
        sx={{
          border: "solid 1px blue",
        }}
      >
        {`id: ${id}`}
        {/* {`x: ${dropPosition.x}, y: ${dropPosition.y}`} */}
      </Typography>
    </Box>
  );
};

export default DndGetLocationDraggableNumber;
