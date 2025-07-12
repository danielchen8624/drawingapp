import { useRef, useEffect } from "react";

function DrawCanvas({ colour, tool, size, clearButton }) {
  const canvasRef = useRef(null);
  const isPainting = useRef(false);
  const ctx = useRef(null);
  useEffect(() => {
    if (ctx.current) {
      if (tool === "eraser") {
        ctx.current.globalCompositeOperation = "destination-out";
        ctx.current.strokeStyle = "rgba(0,0,0,1)";
      } else {
        ctx.current.globalCompositeOperation = "source-over";
        ctx.current.strokeStyle = colour; //why does having this line in an useEffect work and having it inside the Painting function does not?
        ctx.current.lineWidth = size;
      }
    }
  }, [colour, tool, size]);

  useEffect(() => {
    if (ctx.current) {
      clearCanvas();
    }
  }, [clearButton]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.current = canvas.getContext("2d");

    //event listeners:
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
    pen.lineWidth = size;
    pen.lineCap = "round";

    if (tool === "eraser") {
      pen.globalCompositeOperation = "destination-out";
      pen.strokeStyle = "rgba(0,0,0,1)";
    } else if (tool === "clear") {
      pen.globalCompositeOperation = "source-over";
      pen.strokeStyle = colour;
    }
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
    const canvas = canvasRef.current;
    const pen = ctx.current;
    pen.clearRect(0, 0, canvas.width, canvas.height);
  }

  return <canvas ref={canvasRef} style={{ border: "1px solid black" }} />;
}
export default DrawCanvas;
