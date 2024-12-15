import React from "react";
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, UniqueIdentifier, useSensor, MouseSensor } from "@dnd-kit/core";
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

  // ドラッグ中の要素のIDを保持。DragOverlayでドラッグ中の要素の位置を取得するために使用
  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null);

  // ドラッグ終了時の処理
  const handleDragEnd = (event: DragEndEvent) => {
    // ドラッグ中の要素を初期化
    setActiveId(null);
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
    // x,y: 移動距離を元の値に加算しであたらしい位置を計算
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

  // ドラッグ開始時の処理
  const handleDragStart = (event: DragStartEvent) => {
    // ドラッグ中の要素のIDを更新
    setActiveId(event.active.id);

  }

  return (
    <Box
      sx={{
        display: "inline-block",
        overflow: isZoomed ? "scroll" : "hidden", // ズーム時にスクロール可能に
        width: "500px",
        height: "500px",

        border: "1px solid #ccc",
        borderRadius: "8px",
        position: "relative", // 子要素を正しく配置するために設定
        transition: "transform 0.3s ease-in-out",
        //transform: isZoomed ? "scale(1.5)" : "scale(1)", // ズームの制御
        transformOrigin: "top left", // ズーム時の中心を指定
      }}
    >
      <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} >
        <Box>
          <Box
            sx={{
              position: "absolute",
              zIndex: 100, // 子要素を手前に表示するために必要
            }}
          >
            {dndDraggableNumberList.map((dndDraggableNumber, index) => (
              <Box key={index}>
                <DndGetLocationDraggableNumber
                  key={dndDraggableNumber.id}
                  id={dndDraggableNumber.id}
                  dropPosition={{
                    x: dndDraggableNumber.x,
                    y: dndDraggableNumber.y,
                  }}
                  zoomNum={zoomNum}
                />
              </Box>
            ))}
          </Box>
          <Box>
            <DndGetLocationDroppableImage
              isZoomed={isZoomed}
              isPdf={isPdf}
            />
          </Box>
          {/* ドロップ後のアニメーションを無効化 */}
          <DragOverlay dropAnimation={null}  >
            {/* activeIdに一致する要素をレンダリング */}
            {activeId && (
              <DndGetLocationDraggableNumber
                id={parseInt(activeId.toString().replace('number-', ''), 10)}
                zoomNum={zoomNum}
                dropPosition={{
                  x: dndDraggableNumberList.find(
                    (dndDraggableNumber) =>
                      `number-${dndDraggableNumber.id}` === activeId
                  )?.x || 0,
                  // activeIdに一致する要素の位置を取得
                  // todo: 長いので関数化する必要あり
                  y: dndDraggableNumberList.indexOf(
                    dndDraggableNumberList.find(
                      (dndDraggableNumber) =>
                        `number-${dndDraggableNumber.id}` === activeId
                      // overlayする要素について、クリック時に少し下にズレる。
                      // ズレは、配列要素が大きくなるほど大きくなるため、24を掛けて調整
                    ) || { id: 0, x: 0, y: 0 }) * -24 + (dndDraggableNumberList.find(
                      (dndDraggableNumber) =>
                        `number-${dndDraggableNumber.id}` === activeId
                    )?.y || 0)

                }}
              />
            )}
          </DragOverlay>

        </Box>
      </DndContext>
    </Box>
  );
};

export default DndGetLocationSection;
