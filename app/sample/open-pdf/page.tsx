'use client';
import React, { useRef, useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import { PDFDocument, rgb } from 'pdf-lib';
import '@react-pdf-viewer/core/lib/styles/index.css';

const PdfDragDropEditor = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const [editedPdfUrl, setEditedPdfUrl] = useState<string | null>(null);
    const [dropPosition, setDropPosition] = useState<{ x: number; y: number } | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setPdfUrl(e.target.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDrop = async ({ x, y }: { x: number; y: number }) => {
        if (!pdfUrl) return;
        console.log('Dropped at', x, y);

        // PDFを編集
        const existingPdfBytes = await fetch(pdfUrl).then((res) => res.arrayBuffer());
        const pdfDoc = await PDFDocument.load(existingPdfBytes);

        const pages = pdfDoc.getPages();
        const firstPage = pages[0];
        firstPage.drawText('Dropped Text', {
            x,
            y,
            size: 20,
            color: rgb(0, 0, 1),
        });

        const pdfBytes = await pdfDoc.save();

        // 編集済みPDFをBlob URLとして保存
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
        setEditedPdfUrl(URL.createObjectURL(blob));
    };

    return (
        <div>
            <h1>PDF Drag & Drop Editor</h1>

            <input type="file" accept="application/pdf" onChange={handleFileChange} />
         
            {pdfUrl && (
                <DndContext
                    onDragEnd={(event) => {
                      console.log('DragEnd', event);
                        //const dropPoint = event.over?.rect || null;
                        const dropPoint = event.delta;
                        if (dropPoint) {
                            handleDrop({
                                x: dropPoint.x,
                                y: dropPoint.y,
                            });
                        }
                    }}
                >
                     <DraggableItem />
                    <DroppablePdfViewer fileUrl={editedPdfUrl || pdfUrl} />
                
                </DndContext>
            )}
        </div>
    );
};

const DraggableItem = () => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: 'draggable' });

    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={{
                position: 'absolute',
                transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
                backgroundColor: 'red',
                color: 'white',
                width: '100px',
                height: '30px',
                textAlign: 'center',
                lineHeight: '30px',
                cursor: 'move',
            }}
        >
            Drag Me
        </div>
    );
};

const DroppablePdfViewer = ({ fileUrl }: { fileUrl: string }) => {
    const { setNodeRef } = useDroppable({ id: 'droppable-pdf' });

    return (
        <div
            ref={setNodeRef}
            style={{
                border: '1px solid black',
                height: '750px',
                width: '100%',
                position: 'relative',
                marginTop: '20px',
            }}
        >
            <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`}>
                <Viewer fileUrl={fileUrl} />
            </Worker>
        </div>
    );
};

export default PdfDragDropEditor;
