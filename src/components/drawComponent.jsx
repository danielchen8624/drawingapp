import { useRef, useEffect } from "react";

function DrawCanvas({ colour, tool, size, clearButton, canvasRef }) {
  const isPainting = useRef(false);
  const ctx = useRef(null);

  useEffect(() => {
    if (ctx.current) {
      if (tool === "eraser") {
        ctx.current.globalCompositeOperation = "destination-out";
        ctx.current.strokeStyle = "rgba(0,0,0,1)";
        ctx.current.lineWidth = size;
      } else {
        ctx.current.globalCompositeOperation = "source-over";
        ctx.current.strokeStyle = colour;
        ctx.current.lineWidth = size;
      }
    }
  }, [colour, tool, size]);

  useEffect(() => {
    if (ctx.current) clearCanvas();
  }, [clearButton]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.current = canvas.getContext("2d");
    ctx.current.lineWidth = size;
    ctx.current.strokeStyle = colour;
    ctx.current.lineCap = "round";

    canvas.addEventListener("mousedown", StartPosition);
    canvas.addEventListener("mouseup", EndPosition);
    canvas.addEventListener("mousemove", Painting);

    return () => {
      canvas.removeEventListener("mousedown", StartPosition);
      canvas.removeEventListener("mouseup", EndPosition);
      canvas.removeEventListener("mousemove", Painting);
    };
  }, []);

  function Painting(e) {
    if (!isPainting.current) return;
    const pen = ctx.current;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    pen.lineCap = "round";
    pen.lineTo(x, y);
    pen.stroke();
    pen.beginPath();
    pen.moveTo(x, y);
  }

  function StartPosition(e) {
    isPainting.current = true;
    Painting(e);
  }

  function EndPosition() {
    isPainting.current = false;
    ctx.current.beginPath();
  }

  function clearCanvas() {
    const pen = ctx.current;
    pen.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
}

export default DrawCanvas;
