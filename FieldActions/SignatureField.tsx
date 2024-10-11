// import { useRef, useState } from 'react';
// import { PenTool, Trash2 } from 'lucide-react'; // Assuming you're using lucide-react for icons

// const SignatureField = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [lastPosition, setLastPosition] = useState<{ x: number; y: number } | null>(null);

//   // Start drawing
//   const startDrawing = (e: React.MouseEvent) => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext('2d');
//     ctx?.beginPath();
//     ctx?.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
//     setIsDrawing(true);
//     setLastPosition({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
//   };

//   // Drawing with smooth interpolation
//   const draw = (e: React.MouseEvent) => {
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext('2d');
//     const currentX = e.nativeEvent.offsetX;
//     const currentY = e.nativeEvent.offsetY;

//     if (lastPosition) {
//       ctx?.lineTo(currentX, currentY);
//       ctx?.stroke();
//       if (ctx) {
//         smoothDraw(ctx, lastPosition.x, lastPosition.y, currentX, currentY);
//       }    }

//     setLastPosition({ x: currentX, y: currentY });
//   };

//   // Smooth line drawing function
//   const smoothDraw = (ctx: CanvasRenderingContext2D | null, x1: number, y1: number, x2: number, y2: number) => {
//     const dx = x2 - x1;
//     const dy = y2 - y1;
//     const distance = Math.sqrt(dx * dx + dy * dy);
//     const steps = Math.max(1, Math.floor(distance / 2)); // Increase the divisor to make it smoother

//     for (let i = 1; i <= steps; i++) {
//       const x = x1 + (dx / steps) * i;
//       const y = y1 + (dy / steps) * i;
//       ctx?.lineTo(x, y);
//       ctx?.stroke();
//     }
//   };

//   // Stop drawing
//   const stopDrawing = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext('2d');
//     if (isDrawing && ctx) {
//       ctx.closePath();
//       setIsDrawing(false);
//       setLastPosition(null);
//     }
//   };

//   // Clear the signature
//   const clearSignature = () => {
//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext('2d');
//     if (ctx && canvas) {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <label className="block text-sm font-medium text-gray-700">Signature</label>
//       <div className="relative border border-gray-300 rounded-lg">
//         <canvas
//           ref={canvasRef}
//           onMouseDown={startDrawing}
//           onMouseMove={draw}
//           onMouseUp={stopDrawing}
//           onMouseLeave={stopDrawing}
//           className="w-full h-48 cursor-default" // Change cursor style here
//           width="600"
//           height="200"
//         ></canvas>
//       </div>
//       <button onClick={clearSignature} className="text-red-500 flex items-center">
//         <Trash2 size={18} className="mr-2" />
//         Clear
//       </button>
//     </div>
//   );
// };

// export default SignatureField;

// import { useRef } from "react";
// import SignatureCanvas from "react-signature-canvas";
// import { Trash2 } from "lucide-react";

// export const SignatureInput = () => {
//   const sigCanvasRef = useRef<SignatureCanvas>(null);

//   const clearSignature = () => {
//     if (sigCanvasRef.current) {
//       sigCanvasRef.current.clear();
//     }
//   };

//   return (
//     <div className="space-y-4">
//       <label className="block text-base font-medium text-gray-700">
//         Signature
//       </label>
//       <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
//         <SignatureCanvas
//           ref={sigCanvasRef}
//           penColor="black"
//           canvasProps={{
//             width: 437,
//             height: 150,
//             className: "signatureCanvas border rounded-md cursor-default",
//           }}
//         />
//         <button
//           onClick={clearSignature}
//           className="mt-4 inline-flex items-center text-sm text-red-500 hover:text-red-700 bg-transparent border border-transparent rounded-lg p-2 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
//         >
//           <Trash2 size={18} className="mr-2" />
//           Clear Signature
//         </button>
//       </div>
//     </div>
//   );
// };

import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { Trash2, Download, Undo } from "lucide-react"; // Added icons for undo and download

export const SignatureInput = () => {
  const sigCanvasRef = useRef<SignatureCanvas>(null);
  const [isEmpty, setIsEmpty] = useState(true); // Track if the signature canvas is empty

  const clearSignature = () => {
    if (sigCanvasRef.current) {
      sigCanvasRef.current.clear();
      setIsEmpty(true); // Reset the state when signature is cleared
    }
  };

  const handleEndDrawing = () => {
    if (sigCanvasRef.current) {
      setIsEmpty(sigCanvasRef.current.isEmpty());
    }
  };

  const downloadSignature = () => {
    if (sigCanvasRef.current) {
      const dataUrl = sigCanvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "signature.png";
      link.click();
    }
  };

  const undoLastStroke = () => {
    if (sigCanvasRef.current) {
      const data = sigCanvasRef.current.toData(); // Retrieve signature data
      if (data.length > 0) {
        data.pop(); // Remove the last stroke
        sigCanvasRef.current.fromData(data); // Re-render the canvas
      }
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-base font-medium text-gray-700">
        Signature
      </label>
      <div className="border border-gray-300 p-4 rounded-lg shadow-md bg-white">
        <SignatureCanvas
          ref={sigCanvasRef}
          penColor="black"
          onEnd={handleEndDrawing}
          canvasProps={{
            width: 437,
            height: 150,
            className: "signatureCanvas border rounded-md cursor-crosshair",
          }}
        />
        <div className="flex justify-between mt-4 space-x-2">
          <button
            onClick={clearSignature}
            className="inline-flex items-center text-sm text-red-500 hover:text-red-700 bg-transparent border border-transparent rounded-lg p-2 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition"
            disabled={isEmpty}
          >
            <Trash2 size={18} className="mr-2" />
            Clear Signature
          </button>
          <button
            onClick={undoLastStroke}
            className="inline-flex items-center text-sm text-yellow-500 hover:text-yellow-700 bg-transparent border border-transparent rounded-lg p-2 hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition"
            disabled={isEmpty}
          >
            <Undo size={18} className="mr-2" />
            Undo
          </button>
          <button
            onClick={downloadSignature}
            className="inline-flex items-center text-sm text-blue-500 hover:text-blue-700 bg-transparent border border-transparent rounded-lg p-2 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            disabled={isEmpty}
          >
            <Download size={18} className="mr-2" />
            Download
          </button>
        </div>
      </div>
    </div>
  );
};
