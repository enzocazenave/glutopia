import { useRef } from "react";
import { useEffect } from "react";

export const PdfViewer = ({ pdfUrl, displayPdf, setDisplayPdf }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (viewerRef.current && !viewerRef.current.contains(event.target)) {
        setDisplayPdf(false)
      }
    }

    if (displayPdf) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [displayPdf, setDisplayPdf])

  if (!displayPdf) return null

  return (
    <div className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={viewerRef} className="bg-white rounded-lg overflow-hidden shadow-lg max-w-screen-lg w-full h-full">
        <iframe
          className="h-full w-full"
          src={pdfUrl}
          title="PDF Viewer"
        />
        <button
          className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => setDisplayPdf(false)}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};