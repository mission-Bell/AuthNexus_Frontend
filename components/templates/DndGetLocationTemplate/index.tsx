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
}

const DndGetLocationTemplate = () => {
  const [dndDraggableNumberList, setDndDraggableNumberList] = useState<
    DndDraggableNumber[]
  >([{ id: 1, x: 0, y: 0 }]);

  const [isZoomed, setIsZoomed] = useState(false);

  const handleAddDraggableNumber = () => {
    const newId = dndDraggableNumberList.length + 1;
    const newDndDraggableNumberList = [
      ...dndDraggableNumberList,
      { id: newId, x: 10, y: 20 },
    ];
    setDndDraggableNumberList(newDndDraggableNumberList);
  };

  // 拡大ボタン押下時のハンドラーを作成する
  // DroppableImageをズームして表示する
  // ドラッグ可能な要素の位置もズームして表示する
  const handleZoomIn = () => {
    setIsZoomed(true);
    // 全てのドラッグ可能な要素について、x,yを1.5倍にする
    const newDndDraggableNumberList = dndDraggableNumberList.map(
      (dndDraggableNumber) => ({
        ...dndDraggableNumber,
        x: dndDraggableNumber.x * 1.5,
        y: dndDraggableNumber.y * 1.5,
      })
    );
    setDndDraggableNumberList(newDndDraggableNumberList);
  };

  const handleZoomOut = () => {
    setIsZoomed(false);
    // 全てのドラッグ可能な要素について、x,yを1.5除算する
    const newDndDraggableNumberList = dndDraggableNumberList.map(
      (dndDraggableNumber) => ({
        ...dndDraggableNumber,
        x: dndDraggableNumber.x / 1.5,
        y: dndDraggableNumber.y / 1.5,
      })
    );
    setDndDraggableNumberList(newDndDraggableNumberList);
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid size={6}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            </Box>
          </Box>
          <DndGetLocationSection
            dndDraggableNumberList={dndDraggableNumberList}
            setDndDraggableNumberList={setDndDraggableNumberList}
            isZoomed={isZoomed}
          />
        </Grid>
        <Grid size={6}>
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
