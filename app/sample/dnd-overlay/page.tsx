'use client';
import React, { useState } from 'react';
import { DndContext, DragOverlay, DragStartEvent, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core';
import { Box, Grid } from '@mui/material';

const DraggableGroup: React.FC = () => {
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [items, setItems] = useState(Array.from({ length: 9 }, (_, i) => `Box ${i + 1}`));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = () => {
    // ドラッグ終了時に要素をリストから削除
    setItems((prevItems) =>
      prevItems.filter((item) => item !== activeId)
    );
    setActiveId(null);
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <Grid container spacing={2}>
        {items.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{
                width: '100%',
                height: '100px',
                border: '1px solid gray',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: activeId === item ? '#f0f0f0' : '#fff',
                cursor: 'grab',
              }}
              id={item}
            >
              {item}
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* DragOverlay */}
      <DragOverlay>
        {activeId ? (
          <Box
            sx={{
              width: '100px',
              height: '100px',
              border: '1px solid red',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#f0f0f0',
            }}
          >
            {activeId}
          </Box>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default DraggableGroup;
