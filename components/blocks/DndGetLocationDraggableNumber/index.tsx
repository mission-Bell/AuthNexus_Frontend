import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { Box } from "@mui/material";

interface DraggableNumberProps {
  dropPosition: { x: number; y: number };
  id: number;
  zoomNum: number;
}

const DndGetLocationDraggableNumber = ({
  dropPosition,
  id,
  zoomNum
}: DraggableNumberProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `number-${id}`,
  });

  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{ display: "inline-block", zIndex: 1000, poxition: 'fixed' }}
    >
      <Box
        // 画面上の表示位置は、position: 'absolute' で指定する
        // 右上からの位置で指定する
        // zoom、zoom outの場合は、zoomNumを掛ける
        sx={{
          position: 'absolute',
          left: `${dropPosition.x * zoomNum}px`,
          top: `${dropPosition.y * zoomNum}px`,
          backgroundColor: 'red',
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        number {id}
      </Box>
    </Box>
  );
};

export default DndGetLocationDraggableNumber;
