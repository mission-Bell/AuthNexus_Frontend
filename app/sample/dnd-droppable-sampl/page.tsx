'use client';
import React, { useState } from 'react';
import { DndContext, DragEndEvent, useDraggable, useDroppable } from '@dnd-kit/core';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface DraggableProps {
  id: string;
}

const Draggable: React.FC<DraggableProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    padding: '16px',
    backgroundColor: '#4caf50',
    color: 'white',
    cursor: 'grab',
    marginBottom: '8px',
  };

  return (
    <Box ref={setNodeRef} style={style} {...listeners} {...attributes}>
      Draggable {id}
    </Box>
  );
};

interface DroppableProps {
  id: string;
}

const Droppable: React.FC<DroppableProps> = ({ id }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const style: React.CSSProperties = {
    width: '200px',
    height: '100px',
    backgroundColor: '#e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px dashed #9e9e9e',
  };

  return <Box ref={setNodeRef} style={style}>Drop here</Box>;
};

const DndDroppableSample: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent): void => {
    if (event.over) {
      setMessage(`${event.active.id}が${event.over.id}にドロップされました`);
    } else {
      setMessage('ドロップ可能なエリア外にドロップされました');
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Typography variant="h6">Drag and Drop Example</Typography>
      <Draggable id="item-1" />
      <Draggable id="item-2" />
      <Droppable id="drop-area" />
      {message && (
        <Typography variant="body1" style={{ marginTop: '16px' }}>
          {message}
        </Typography>
      )}
    </DndContext>
  );
};

export default DndDroppableSample;
