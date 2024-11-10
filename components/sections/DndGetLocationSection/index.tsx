import React, { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import DndGetLocationDraggableNumber from "@/components/blocks/DndGetLocationDraggableNumber";
import DndGetLocationDroppableImage from "@/components/blocks/DndGetLocationDroppableImage";

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
const DndGetLocationSection = () => {
  const [dropPosition, setDropPosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const handleDragEnd = (event: DragEndEvent) => {
    // ドロップ位置を保存して、次のドラッグの初期位置として使用
    const { x, y } = event.delta;
    // ドロップ位置を更新
    // x,yの値は、現在位置からの差分なので、前回の値に加算する必要がある
    // 例: 前回x=10, y=20の場合、ドラッグした位置がx=4, y=30の場合、
    // x=10+4=14, y=20+30=50ポジションとなる
    setDropPosition((prev) => ({
      x: x + prev.x,
      y: y + prev.y,
    }));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DndGetLocationDraggableNumber dropPosition={dropPosition} />
      <DndGetLocationDroppableImage />
    </DndContext>
  );
};

export default DndGetLocationSection;
