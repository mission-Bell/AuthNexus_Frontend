import React, { useEffect, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Box, Typography } from "@mui/material";

interface DraggableNumberProps {
  dropPosition: { x: number; y: number };
  id: number;
  dndTest: number;
}

const DndGetLocationDraggableNumber = ({
  dropPosition,
  id,
  dndTest,
}: DraggableNumberProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `number-${id}`,
  });

  const test = () => {
    transform
      ? console.log("test transform", transform)
      : dropPosition
      ? console.log("test dropPosition", dropPosition)
      : console.log("test undefined");
  };

  console.log("test", test());
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
      sx={{ display: "inline-block", zIndex: 1000 }}
    >
      <Box
        sx={{
          position: "absolute",
          left: `${dndTest}px`,
          top: `${dndTest}px`,
          backgroundColor: "red",
        }}
      >
        {/* <Box>image{dndTest}</Box> */}
        number {dndTest}
      </Box>
    </Box>
  );
};

export default DndGetLocationDraggableNumber;
