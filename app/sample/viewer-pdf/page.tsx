'use client';
import React, { useState } from 'react'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import Box from '@mui/material/Box'
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import Button from '@mui/material/Button'
const ViewerPdfPage = () => {
    const [pdfUrl, setPdfUrl] = useState<string | null>(null);
    const zoomPluginInstance = zoomPlugin();
    const { ZoomIn, ZoomPopover, ZoomOut } = zoomPluginInstance;
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
    return (
        <Box>
            <Box>
                pdf viewer
            </Box>
            <Box>
                <input type="file" accept="application/pdf" onChange={handleFileChange} />
            </Box>

            <Box sx={{
                height: '500px',
                width: '500px',
                overflow: 'auto',
            }}>
                <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`}>
                    <Box>
                        <ZoomOut>
                            {(props) => (
                                <Button
                                    onClick={props.onClick}
                                >
                                    Zoom out
                                </Button>
                            )}
                        </ZoomOut>
                        <ZoomPopover />
                        <ZoomIn>
                            {(props) => (
                                <Button
                                    onClick={props.onClick}
                                >
                                    Zoom in
                                </Button>
                            )}
                        </ZoomIn>
                    </Box>
                    {pdfUrl && <Viewer fileUrl={pdfUrl} plugins={[zoomPluginInstance]} />}
                </Worker>
            </Box>
        </Box>
    )
}

export default ViewerPdfPage