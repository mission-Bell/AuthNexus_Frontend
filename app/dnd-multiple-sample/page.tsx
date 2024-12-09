"use client";
import React, { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

type Item = {
  id: string;
  label: string;
};

const initialItems: Item[] = [
  { id: "1", label: "Item 1" },
  { id: "2", label: "Item 2" },
  { id: "3", label: "Item 3" },
  { id: "4", label: "Item 4" },
];

export default function Home() {
  const [items, setItems] = useState(initialItems);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string, event: React.MouseEvent) => {
    if (event.shiftKey || event.ctrlKey || event.metaKey) {
      // Shift/Ctrl/Commandで複数選択
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
      );
    } else {
      // 単一選択
      setSelectedIds([id]);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active) {
      const activeIndex = items.findIndex((item) => item.id === active.id);
      const overIndex = items.findIndex((item) => item.id === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        // 選択されたアイテムをすべて移動
        const movingItems = items.filter((item) =>
          selectedIds.includes(item.id)
        );
        const remainingItems = items.filter(
          (item) => !selectedIds.includes(item.id)
        );

        const newItems = [
          ...remainingItems.slice(0, overIndex),
          ...movingItems,
          ...remainingItems.slice(overIndex),
        ];

        setItems(newItems);
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {items.map((item) => (
          <DraggableItem
            key={item.id}
            id={item.id}
            label={item.label}
            selected={selectedIds.includes(item.id)}
            onClick={handleSelect}
          />
        ))}
      </div>
    </DndContext>
  );
}

type DraggableItemProps = {
  id: string;
  label: string;
  selected: boolean;
  onClick: (id: string, event: React.MouseEvent) => void;
};

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  label,
  selected,
  onClick,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    border: selected ? "2px solid blue" : "1px solid gray",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: selected ? "lightblue" : "white",
    cursor: "grab",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={(event) => onClick(id, event)}
    >
      {label}
    </div>
  );
};
