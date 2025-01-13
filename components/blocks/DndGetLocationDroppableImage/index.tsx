import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@mui/material";
import localImage from "@/public/images/tate.jpeg";
// const localImage = "/app/authnexusf/public/images/sample.pdf";
import { DndDraggableNumber } from "@/components/templates/DndGetLocationTemplate";
import DndGetLocationDraggableNumber from "../DndGetLocationDraggableNumber";
import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

// ワーカーファイルのパスを正しく設定
GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js`;

interface DndGetLocationDroppableImageProps {
  isZoomed: boolean;
  isPdf: boolean;
  size: { width: number; height: number };
  handleSetSize: (width: number, height: number) => void;
}

const DndGetLocationDroppableImage = ({
  isZoomed,
  isPdf,
  size,
  handleSetSize,
}: DndGetLocationDroppableImageProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [naturalSize, setnaturalSize] = useState({ width: 0, height: 0 });

  const { isOver, setNodeRef } = useDroppable({ id: "droppable" });

  useEffect(() => {
    const fetchPDFPageSizes = async () => {
      const pdfUrl = '/sample.pdf'; // 読み込むPDFファイルのパス
      const pdf = await getDocument(pdfUrl).promise;
      const sizes: { width: number; height: number }[] = [];


      for (let i = 0; i < pdf.numPages; i++) {
        const page = await pdf.getPage(i + 1);
        const viewport = page.getViewport({ scale: 1 });
        console.log(viewport.width, viewport.height);
        sizes.push({ width: viewport.width, height: viewport.height });
      }

      handleSetSize(sizes[0].width, sizes[0].height);
    };

    if (isPdf) {
      fetchPDFPageSizes().catch(console.error);
    } else {
      if (imgRef.current) {
        const img = imgRef.current;
        handleSetSize(img.naturalWidth, img.naturalHeight);
      }
    }

  }, []);

  const ptToPx = (pt: number) => {
    // return pt * (96 / 72); // PDFのptをpxに変換
    return pt * 1.08;
  }

  const pxToPt = (px: number) => {
    return px * (72 / 96); // pxをPDFのptに変換
  }

  return (
    <Box bgcolor={isOver ? "green" : "white"}>
      <Box>
        {isPdf ? (
          <Box
            sx={{
              transition: "transform 0.3s ease-in-out",
              transform: isZoomed ? "scale(1.5)" : "scale(1)", // ズームの制御
              transformOrigin: "top left", // ズーム時の中心を指定
              cursor: isZoomed ? "grab" : "default", // ズーム時にポインタを変更
              display: "block",
              // zIndex: 10000, // 子要素を手前に表示

            }}>
            x {size.width} y {size.height}
            <Worker workerUrl={`https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`}>
              <Viewer fileUrl={'/sample.pdf'} defaultScale={SpecialZoomLevel.PageFit} />
            </Worker>
          </Box>

        ) : (
          <Box sx={{
            position: 'relative',
            width: size,
            height: size,
            border: "1px solid #ccc",
          }}
            // bgcolor={"lightblue"}
            ref={setNodeRef}
          >
            x {size.width} y {size.height}
            <img ref={imgRef} src={localImage.src} alt="Sample" />
            {/* <Image
              // ref={imgRef}
              src={localImage}
              fill
              objectFit="contain"
              alt=""
              style={{
                transition: "transform 0.3s ease-in-out",
                transform: isZoomed ? "scale(1.5)" : "scale(1)", // ズームの制御
                transformOrigin: "top left", // ズーム時の中心を指定
                border: "1px solid #ccc",
                // display: "block",
                // zIndex: 10000, // 子要素を手前に表示
              }}
            /> */}
          </Box>
        )}
      </Box>
    </Box >
  );
};

export default DndGetLocationDroppableImage;
