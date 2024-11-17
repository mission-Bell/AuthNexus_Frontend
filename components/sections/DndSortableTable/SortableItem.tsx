import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TableRow, TableCell } from "@mui/material";

interface SortableItemProps {
  id: number;
  itemKey: string;
}

const SortableItem = ({ id, itemKey }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TableRow ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TableCell>{itemKey}</TableCell>
    </TableRow>
  );
};

export default SortableItem;
