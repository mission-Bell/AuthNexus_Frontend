import React from "react";
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, UniqueIdentifier, useSensor, MouseSensor, rectIntersection } from "@dnd-kit/core";
import DndGetLocationDraggableNumber from "@/components/blocks/DndGetLocationDraggableNumber";
import DndGetLocationDroppableImage from "@/components/blocks/DndGetLocationDroppableImage";
import { DndDraggableNumber } from "@/components/templates/DndGetLocationTemplate";
import Box from "@mui/material/Box";

const DndGetLocationSection = ({
  dndDraggableNumberList,
  setDndDraggableNumberList,
  isZoomed,
  zoomNum,
  isPdf
}: {
  dndDraggableNumberList: DndDraggableNumber[];
  setDndDraggableNumberList: React.Dispatch<
    React.SetStateAction<DndDraggableNumber[]>
  >;
  zoomNum: number;
  isZoomed: boolean;
  isPdf: boolean;
}) => {
  const [droppableItemSize, setDroppableItemSize] = React.useState<{ width: number, height: number }>({ width: 500, height: 500 });

  const handleSetSize = (width: number, height: number) => {
    setDroppableItemSize({ width, height });
  }

  // ドラッグ中の要素のIDを保持。DragOverlayでドラッグ中の要素の位置を取得するために使用
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  // ドラッグ終了時の処理
  const handleDragEnd = (event: DragEndEvent) => {
    // ドラッグ中の要素を初期化
    setActiveId(null);

    // ドロップ可能要素のサイズを移動距離がオーバーしていないか確認


    // ドロップ位置を保存して、次のドラッグの初期位置として使用
    const { x, y } = event.delta;
    // ドロップ位置を更新
    const targetItem = dndDraggableNumberList.find(
      (dndDraggableNumber) =>
        `number-${dndDraggableNumber.id}` === event.active.id
    );
    // targetItemが見つからない場合は、処理を終了
    if (!targetItem) {
      return;
    }

    // x,y: 移動距離を元の値に加算しであたらしい位置を計算
    const newItem: DndDraggableNumber = {
      id: targetItem.id,
      x: x + targetItem.x,
      y: y + targetItem.y,
    };

    if (newItem.x < 0 || newItem.x > droppableItemSize.width || newItem.y < 0 || newItem.y > droppableItemSize.height) {
      return;
    }
    // newItemを使って新しいdndDraggableNumberListを作成
    // 既存の要素の場合は、新しい位置に更新
    // 新しい要素の場合は、新しい要素を追加
    const newDndDraggableNumberList = dndDraggableNumberList.map(
      (dndDraggableNumber) =>
        dndDraggableNumber.id === newItem.id ? newItem : dndDraggableNumber
    );
    setDndDraggableNumberList(newDndDraggableNumberList);
  };

  // ドラッグ開始時の処理
  const handleDragStart = (event: DragStartEvent) => {
    // // ドラッグ中の要素のIDを更新
    setActiveId(event.active.id);

  }

  return (
    <Box
      sx={{
        overflow: 'scroll',
      }}>
      <Box
        sx={{
          display: "inline-block",
          width: droppableItemSize.width,
          height: droppableItemSize.height,
          // maxWidth: "100%",
          // maxHeight: "100%",
          border: "1px solid #ccc",
          borderRadius: "8px",
          transition: "transform 0.3s ease-in-out",
          transform: isZoomed ? "scale(1.5)" : "scale(1)", // ズームの制御
          transformOrigin: "top left", // ズーム時の中心を指定
        }}
      >
        <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={rectIntersection}>
          <Box>
            <Box
              sx={{
                position: "absolute",
                zIndex: 100, // 子要素を手前に表示するために必要
              }}
            >
              {dndDraggableNumberList.map((dndDraggableNumber, index) => (
                <DndGetLocationDraggableNumber
                  key={dndDraggableNumber.id}
                  id={dndDraggableNumber.id}
                  dropPosition={{
                    x: dndDraggableNumber.x,
                    y: dndDraggableNumber.y,
                  }}
                  zoomNum={zoomNum}
                />
              ))}
            </Box>
            <DragOverlay
              dropAnimation={null}
              // 画面上の表示位置は、position: 'absolute' で指定する
              style={{
                position: "relative",
                zIndex: 1000, // 子要素を手前に表示するために必要
                top:
                  dndDraggableNumberList.find(
                    (dndDraggableNumber) =>
                      `number-${dndDraggableNumber.id}` === activeId
                  )?.y || 0,
                left:
                  dndDraggableNumberList.find(
                    (dndDraggableNumber) =>
                      `number-${dndDraggableNumber.id}` === activeId
                  )?.x || 0,

              }}>
              {activeId ? (
                <DndGetLocationDraggableNumber
                  id={activeId as number}
                  dropPosition={{ x: 0, y: 0 }}
                  zoomNum={zoomNum}
                />
              ) : null}
            </DragOverlay>
            <Box sx={{ zIndex: 1 }}>
              <DndGetLocationDroppableImage
                isZoomed={isZoomed}
                isPdf={true}
                size={droppableItemSize}
                handleSetSize={handleSetSize}
              />
            </Box>
          </Box>
        </DndContext>
      </Box>
    </Box>
  );
};


export default DndGetLocationSection;

import { useDroppable, useDraggable } from "@dnd-kit/core";
import { set } from "react-hook-form";

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
