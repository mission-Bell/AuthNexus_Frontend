"use client";
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useForm, useFieldArray, Controller } from "react-hook-form";

interface Item {
  id: string;
  order: number;
  name: string;
}

const SortableItem = ({
  id,
  order,
  control,
  index,
  remove,
  isDragging,
}: {
  id: string;
  order: number;
  control: any;
  index: number;
  remove: (index: number) => void;
  isDragging: boolean;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: localIsDragging,
  } = useSortable({ id });

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: "8px 0",
    padding: "16px",
    backgroundColor: localIsDragging || isDragging ? "#d3d3d3" : "#f0f0f0",
    borderRadius: "4px",
    opacity: localIsDragging || isDragging ? 0.5 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const dragHandleStyle = {
    cursor: "grab",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    backgroundColor: "#007bff",
    color: "#fff",
    borderRadius: "50%",
    marginRight: "8px",
    fontWeight: "bold",
    fontSize: "16px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div
        {...attributes}
        {...listeners}
        style={dragHandleStyle}
        title="Drag to reorder"
      >
        {order}
      </div>
      <Controller
        name={`items.${index}.name`}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            style={{
              padding: "4px",
              flexGrow: 1,
              marginRight: "8px",
            }}
            placeholder="Item name"
          />
        )}
      />
      <button
        onClick={() => remove(index)}
        style={{
          backgroundColor: "#ff4d4d",
          color: "#fff",
          border: "none",
          padding: "4px 8px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Delete
      </button>
    </div>
  );
};

const Home = () => {
  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      items: [
        { id: "1", order: 1, name: "Item A" },
        { id: "2", order: 2, name: "Item B" },
        { id: "3", order: 3, name: "Item C" },
        { id: "4", order: 4, name: "Item D" },
      ],
    },
  });

  const { fields, append, remove, move } = useFieldArray({
    control,
    name: "items",
  });

  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const id = event.active.id;
    if (typeof id === "string") {
      setActiveId(id);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((item) => item.id === active.id);
      const newIndex = fields.findIndex((item) => item.id === over?.id);
      move(oldIndex, newIndex);

      // Update order values
      const updatedItems = getValues("items").map((item, index) => ({
        ...item,
        order: index + 1,
      }));
      setValue("items", updatedItems);
    }
  };

  const onSubmit = (data: { items: Item[] }) => {
    console.log("Submitted data:", data);
    // Server Actions への送信処理をここに記述
  };

  const activeItem = activeId
    ? fields.find((item) => item.id === activeId)
    : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={fields.map((field) => field.id)}
          strategy={verticalListSortingStrategy}
        >
          {fields.map((field, index) => (
            <SortableItem
              key={field.id}
              id={field.id}
              order={index + 1}
              control={control}
              index={index}
              remove={remove}
              isDragging={activeId === field.id}
            />
          ))}
        </SortableContext>
        <DragOverlay>
          {activeItem ? (
            <div
              style={{
                padding: "16px",
                backgroundColor: "#e0e0e0",
                borderRadius: "4px",
                textAlign: "center",
                boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
              }}
            >
              <strong>{activeItem.order}</strong> - {activeItem.name}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
      <button
        type="button"
        onClick={() =>
          append({
            id: `${Date.now()}`,
            order: fields.length + 1,
            name: "",
          })
        }
        style={{
          marginTop: "16px",
          backgroundColor: "#4caf50",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Add Item
      </button>
      <button
        type="submit"
        style={{
          marginTop: "16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          padding: "8px 16px",
          cursor: "pointer",
          borderRadius: "4px",
          marginLeft: "8px",
        }}
      >
        Send
      </button>
    </form>
  );
};

export default Home;
