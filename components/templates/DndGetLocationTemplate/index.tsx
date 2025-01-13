"use client";
import React, { useState } from "react";
import DndGetLocationSection from "@/components/sections/DndGetLocationSection";
import DndGetLocationXYInfoColumn from "@/components/blocks/DndGetLocationXYInfoColumn";
import DndGetLocationCommonButton from "@/components/blocks/DndGetLocationCommonButton";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

export interface DndDraggableNumber {
  id: number;
  x: number;
  y: number;
  zoomNum?: number;
}

const DndGetLocationTemplate = ({ isPdf, numberList }: { isPdf: boolean, numberList: DndDraggableNumber[] }) => {
  const [dndDraggableNumberList, setDndDraggableNumberList] = useState<
    DndDraggableNumber[]
  >(numberList);

  const [zoomNum, setZoomNum] = useState<number>(1);

  const [isZoomed, setIsZoomed] = useState(false);

  const [nowPdf, setNowPdf] = useState(isPdf);

  const handleAddDraggableNumber = () => {
    const newId = dndDraggableNumberList.length + 1;
    const newDndDraggableNumberList = [
      ...dndDraggableNumberList,
      { id: newId, x: 10, y: 20, isFirst: true },
    ];
    setDndDraggableNumberList(newDndDraggableNumberList);
  };

  // 拡大ボタン押下時のハンドラーを作成する
  // DroppableImageをズームして表示する
  // ドラッグ可能な要素の位置もズームして表示する
  const handleZoomIn = () => {
    // 全てのドラッグ可能な要素について、x,yを1.5倍にする
    if (!isZoomed) {
      const newDndDraggableNumberList = dndDraggableNumberList.map(
        (dndDraggableNumber) => ({
          ...dndDraggableNumber,
          x: dndDraggableNumber.x,
          y: dndDraggableNumber.y,
        })
      );
      setDndDraggableNumberList(newDndDraggableNumberList);
      setIsZoomed(true);
      // setZoomNum(1.5);
    }

  };

  const handleZoomOut = () => {
    // 全てのドラッグ可能な要素について、x,yを1.5除算する
    if (isZoomed) {
      const newDndDraggableNumberList = dndDraggableNumberList.map(
        (dndDraggableNumber) => ({
          ...dndDraggableNumber,
          x: dndDraggableNumber.x,
          y: dndDraggableNumber.y,
        })
      );
      setDndDraggableNumberList(newDndDraggableNumberList);
      setIsZoomed(false);
      // setZoomNum(1);
    }
  };

  return (
    <div>
      {/* <Box sx={{ position: "absolute", left: `${dndTest}px` }}>
        template{dndTest}
      </Box> */}

      <Grid container spacing={2}>
        <Grid size={6} bgcolor={"lightblue"}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }} bgcolor={"lightblue"}>
            <DndGetLocationCommonButton
              label="追加"
              onClick={() => handleAddDraggableNumber()}
              icon={<LocalShippingIcon />}
            />
            <Box sx={{ display: "flex", justifyContent: "end" }}>
              <DndGetLocationCommonButton
                label="拡大"
                onClick={() => handleZoomIn()}
                icon={<LocalShippingIcon />}
              />
              <DndGetLocationCommonButton
                label="縮小"
                onClick={() => handleZoomOut()}
                icon={<LocalShippingIcon />}
              />
              <DndGetLocationCommonButton
                label="pdf"
                onClick={() => { setNowPdf(!nowPdf) }}
                icon={<LocalShippingIcon />}
              />
            </Box>
          </Box>
          <DndGetLocationSection
            dndDraggableNumberList={dndDraggableNumberList}
            setDndDraggableNumberList={setDndDraggableNumberList}
            isZoomed={isZoomed}
            zoomNum={zoomNum}
            isPdf={nowPdf}
          />
        </Grid>
        <Grid size={6} bgcolor={"lightgreen"}>
          <DndGetLocationXYInfoColumn index="No." x="x軸" y="y軸" />
          {dndDraggableNumberList.map((dndDraggableNumber) => (
            <DndGetLocationXYInfoColumn
              key={dndDraggableNumber.id}
              index={dndDraggableNumber.id.toString()}
              x={dndDraggableNumber.x.toString()}
              y={dndDraggableNumber.y.toString()}
            />
          ))}
        </Grid>
      </Grid>
    </div>
  );
};

export default DndGetLocationTemplate;

import { useDroppable, useDraggable, DndContext } from "@dnd-kit/core";

const DroppableItem = () => {
  const { isOver, setNodeRef } = useDroppable({ id: "temp" });
  return (
    <Box
      ref={setNodeRef}
      sx={{
        width: "100px",
        height: "100px",
        backgroundColor: "lightblue",
      }}
    >
      DroppableItem
    </Box>
  );
}

const DraggableItem = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "temp-draggable",
  });
  return (
    <Box
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        backgroundColor: "lightgreen",
        transform: `translate3d(${transform?.x}px, ${transform?.y}px, 0)`,
      }}
    >
      DraggableItem
    </Box>
  );
}
