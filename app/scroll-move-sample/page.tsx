"use client";
import React, { useState, useRef } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

const DroppableImage: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 });
  const droppableRef = useRef<HTMLDivElement>(null);

  // ドロップエリア設定
  const { setNodeRef: setDroppableRef } = useDroppable({
    id: "droppable",
  });

  // スクロールイベントを監視
  const handleScroll = () => {
    if (droppableRef.current) {
      setScrollPosition({
        x: droppableRef.current.scrollLeft,
        y: droppableRef.current.scrollTop,
      });
    }
  };

  return (
    <div
      ref={(node) => {
        setDroppableRef(node);
        droppableRef.current = node;
      }}
      onScroll={handleScroll}
      style={{
        width: "300px",
        height: "300px",
        overflow: "scroll",
        border: "1px solid #ccc",
        position: "relative",
        backgroundColor: "#ffffff",
      }}
    >
      {/* 背景画像 */}
      <img
        src="/example-image.jpg"
        alt="Droppable"
        style={{
          width: "600px",
          height: "600px",
        }}
      />

      {/* DraggableNumberの配置 */}
      <DraggableNumber scrollPosition={scrollPosition} />
    </div>
  );
};

const DraggableNumber: React.FC<{
  scrollPosition: { x: number; y: number };
}> = ({ scrollPosition }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });

  // ドラッグ位置を計算
  const style = {
    position: "absolute",
    left: `calc(100px - ${scrollPosition.x}px)`, // スクロール量を考慮
    top: `calc(100px - ${scrollPosition.y}px)`, // スクロール量を考慮
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    zIndex: 10,
    background: "red",
    padding: "5px",
    color: "white",
    borderRadius: "50%",
    textAlign: "center",
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      1
    </div>
  );
};

const App: React.FC = () => (
  <DndContext>
    <DroppableImage />
  </DndContext>
);

export default App;
