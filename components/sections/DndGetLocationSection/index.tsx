import React from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DndGetLocationDraggableNumber from "@/components/blocks/DndGetLocationDraggableNumber";
import DndGetLocationDroppableImage from "@/components/blocks/DndGetLocationDroppableImage";
import { DndDraggableNumber } from "@/components/templates/DndGetLocationTemplate";
import Box from "@mui/material/Box";
/*
 * DndGetLocationSection
 * ドラッグした要素のドロップ位置を取得するサンプル
 *  - DndGetLocationDraggableNumber: ドラッグ可能な要素
 * - DndGetLocationDroppableImage: ドロップ可能な要素
 * - ドラッグした要素のドロップ位置を取得して、次のドラッグの初期位置として使用
 * - DndContext: ドラッグアンドドロップのコンテキスト
 * - onDragEnd: ドラッグ終了時のイベント
 * - dropPosition: ドロップ位置
 * - handleDragEnd: ドラッグ終了時の処理
 * - setDropPosition: ドロップ位置を更新する関数
 * - return: ドラッグアンドドロップのコンテキストを提供するコンポーネント
 */

const DndGetLocationSection = ({
  dndDraggableNumberList,
  setDndDraggableNumberList,
  isZoomed,
  dndTest,
}: {
  dndDraggableNumberList: DndDraggableNumber[];
  setDndDraggableNumberList: React.Dispatch<
    React.SetStateAction<DndDraggableNumber[]>
  >;
  dndTest: number;
  isZoomed: boolean;
}) => {
  const handleDragEnd = (event: DragEndEvent) => {
    console.log(event);
    // ドロップ位置を保存して、次のドラッグの初期位置として使用
    const { x, y } = event.delta;
    // ドロップ位置を更新
    // x,yの値は、現在位置からの差分なので、前回の値に加算する必要がある
    // 例: 前回x=10, y=20の場合、ドラッグした位置がx=4, y=30の場合、
    // x=10+4=14, y=20+30=50ポジションとなる
    // 配列から特定の値を持つ要素を抽出
    // const targetItem = dndDraggableNumberList.find(
    //   (dndDraggableNumber) => dndDraggableNumber.id === event.active.id
    // );
    const targetItem = dndDraggableNumberList.find(
      (dndDraggableNumber) =>
        `number-${dndDraggableNumber.id}` === event.active.id
    );
    // targetItemが見つからない場合は、処理を終了
    if (!targetItem) {
      return;
    }
    const newItem: DndDraggableNumber = {
      id: targetItem.id,
      x: x + targetItem.x,
      y: y + targetItem.y,
    };
    // newItemを使って新しいdndDraggableNumberListを作成
    // 既存の要素の場合は、新しい位置に更新
    // 新しい要素の場合は、新しい要素を追加
    const newDndDraggableNumberList = dndDraggableNumberList.map(
      (dndDraggableNumber) =>
        dndDraggableNumber.id === newItem.id ? newItem : dndDraggableNumber
    );
    setDndDraggableNumberList(newDndDraggableNumberList);
  };

  return (
    <Box
      sx={{
        display: "inline-block",
        overflow: isZoomed ? "scroll" : "hidden", // ズーム時にスクロール可能に
        width: "500px",
        height: "500px",

        border: "1px solid #ccc",
        borderRadius: "8px",
        //position: "relative", // 子要素を正しく配置するために設定
        transition: "transform 0.3s ease-in-out",
        transform: isZoomed ? "scale(1.5)" : "scale(1)", // ズームの制御
        transformOrigin: "top left", // ズーム時の中心を指定
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>
        <Box>
          <Box
            sx={{
              position: "absolute",
              zIndex: 100,
            }}
          >
            <Box sx={{ position: "absolute", left: `${dndTest}px` }}>
              {/* <Box> section{dndTest}</Box> */}
              section{dndTest}
            </Box>
            {dndDraggableNumberList.map((dndDraggableNumber) => (
              <DndGetLocationDraggableNumber
                key={dndDraggableNumber.id}
                id={dndDraggableNumber.id}
                dropPosition={{
                  x: dndDraggableNumber.x,
                  y: dndDraggableNumber.y,
                }}
                dndTest={dndTest}
              />
            ))}
          </Box>
          <Box
            sx={{
              zIndex: 1, // 子要素を手前に表示
            }}
          >
            <DndGetLocationDroppableImage
              isZoomed={isZoomed}
              dndDraggableNumberList={dndDraggableNumberList}
              dndTest={dndTest}
            />
          </Box>
        </Box>
      </DndContext>
    </Box>
  );
};

export default DndGetLocationSection;
