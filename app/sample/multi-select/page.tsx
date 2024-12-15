'use client';
import React, { useState } from 'react';
import { DndContext, DragOverlay, useDraggable, UniqueIdentifier, DragStartEvent } from '@dnd-kit/core';
import { Box, Button, Grid } from '@mui/material';

interface DraggableBoxProps {
    id: string;
    isSelected: boolean;
    onClick: (event: React.MouseEvent) => void;
    deletefunc: () => void;
}

const DraggableBox: React.FC<DraggableBoxProps> = ({ id, isSelected, onClick, deletefunc }) => {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
    });
    const [isHover, setIsHover] = useState(false);

    const style = {
        border: isSelected ? '2px solid red' : '2px solid gray',
        borderRadius: '8px',
        width: '100%',
        height: '100px',
        display: 'flex', // ドラッグ中は非表示
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        background: '#fff',
        position: 'relative',
    };

    return (
        /*
        複数選択のための処理
        isSelected=true: 選択時の表示
        isSelected=false: 非選択時の表示
        →選択時と非選択時でBoxに付与する属性を変更する必要がある。
         listenersなどについては、onClick時にdrag可能にするためかその配下にそのまま
         ボタンなどを配置してもうまく動作しない。
        parent/ 
          dragable/
          deletebutton/
          とする必要がある
        */
        <Box>
            {isSelected ?
                <Box sx={style}>
                    <Box ref={setNodeRef}
                        {...listeners}
                        {...attributes}
                        sx={{
                            textAlign: 'center',
                            pt: 5,
                            width: '100%',
                            height: '100%',
                        }}

                        onMouseEnter={() => setIsHover(true)}
                        onMouseLeave={() => setIsHover(false)}>
                        {id}
                    </Box>
                    {isHover &&
                        <Box onMouseEnter={() => setIsHover(true)}
                            onMouseLeave={() => setIsHover(false)}
                            sx={{ position: 'absolute', bottom: '10px' }}>

                            <Button onClick={(e) => {
                                e.stopPropagation();
                                deletefunc();
                            }}>delete</Button>
                        </Box>
                    }
                </Box>
                :
                <Box
                    onClick={onClick}
                    sx={{
                        textAlign: 'center',
                        pt: 5,
                        borderRadius: '8px',
                        width: '100%',
                        height: '100px',
                        cursor: 'pointer',
                        background: '#fff',
                        border: isSelected ? '2px solid red' : '2px solid gray',
                    }}>
                    {id}
                </Box>
            }
        </Box>
    );
};

const DraggableGroupWithShift: React.FC = () => {
    const [selectedBoxes, setSelectedBoxes] = useState<number[]>([]);
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    // 選択された要素を選択中配列に追加していく
    const handleBoxSelect = (index: number, event: React.MouseEvent) => {
        setSelectedBoxes((prevSelected) =>
            prevSelected.includes(index)
                ? prevSelected.filter((i) => i !== index) // 既に選択されていれば解除
                : [...prevSelected, index] // 未選択なら追加
        );
    };
    // 選択解除用の関数
    // クリックされた要素についている選択状態を解除する
    const handleBoxUnselect = (index: number) => {
        setSelectedBoxes((prevSelected) =>
            prevSelected.filter((i) => i !== index)
        );
    };


    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = () => {
        setActiveId(null);
    };

    const boxes = Array.from({ length: 9 }, (_, i) => i); // サンプル用の9個のボックス

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <Grid container spacing={2}>
                {boxes.map((box, index) => (
                    <Grid item xs={4} key={index}>

                        <DraggableBox
                            id={`Box ${index + 1}`}
                            isSelected={selectedBoxes.includes(index)}
                            onClick={(event) => handleBoxSelect(index, event)}
                            deletefunc={() => handleBoxUnselect(index)}
                        />


                    </Grid>
                ))}
            </Grid>

            {/* DragOverlay */}
            <DragOverlay>
                {activeId && (
                    <>
                        {selectedBoxes.map((box: number, index: number) => (
                            <Box
                                key={index}
                                sx={{
                                    width: '100px',
                                    height: '100px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '2px solid red',
                                    borderRadius: '8px',
                                    background: '#f0f0f0',
                                    cursor: 'grabbing',
                                }}
                            >
                                {`Box ${box + 1}`}
                            </Box>
                        ))}
                    </>
                )}
            </DragOverlay>
        </DndContext>
    );
};

export default DraggableGroupWithShift;
