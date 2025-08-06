import { useState, useRef } from "react";
import DrawCanvas from "../components/drawComponent";
import "../css/colourpicker.css";

function DrawPage() {
  const canvasRef = useRef(null);
  const [useColour, setUseColour] = useState("#FFFFFF");
  const [useTool, setUseTool] = useState("pen");
  const [brushSize, setBrushSize] = useState(10);
  const [clear, setClear] = useState(false);
  const [currentInUse, setCurrentInUse] = useState("black"); //redundant, change it so that the current in use outline can be cahgend by useColour

  const colours = [
    "#FFFFFF",
    "#000000",
    "#EF4444",
    "#F97316",
    "#FACC15",
    "#10B981",
    "#22D3EE",
    "#3B82F6",
    "#6366F1",
    "#8B5CF6",
    "#EC4899",
    "#D946EF",
    "#6B7280",
    "#A855F7",
    "#84CC16",
    "#14B8A6",
    "#F43F5E",
  ];

  const tools = ["eraser"];

  const setUse = (using) => setCurrentInUse(using);
  const clearFunction = () => setClear((prev) => !prev);
  const changeBrushSize = (size) => setBrushSize(size);
  const whichTool = (tool) => setUseTool(tool);
  const whichColour = (colour) => setUseColour(colour);

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    const link = document.createElement("a");
    link.download = "drawing.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  
  const convertToAI = () => {
    console.log("hai");
  }

  return (
    <>
      <div className="hotbar">
        {colours.map((colour) => {
          const className = `c-${colour.slice(1).toLowerCase()}-buttonColour`;
          return (
            <div key={colour}>
              <button
                className={`colour-button-base ${className} ${
                  currentInUse === colour ? "outlined" : ""
                }`}
                onClick={() => {
                  whichColour(colour);
                  whichTool("pen");
                  setUse(colour);
                }}
              />
            </div>
          );
        })}

        {tools.map((tool) => (
          <div key={tool}>
            <button
              className={`${tool}-tool ${
                currentInUse === tool ? "outlined" : ""
              }`}
              onClick={() => {
                whichTool(tool);
                setUse(tool);
              }}
            >
              <i className="fas fa-eraser"></i>
            </button>
          </div>
        ))}

        <button className="clearButton" onClick={() => {
          const confirmed = window.confirm("Are you sure? All progress will be lost.")
          if (confirmed) {{clearFunction()}}
          }}>
          <i className="fas fa-trash-alt"></i>
        </button>

        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => changeBrushSize(Number(e.target.value))}
        />
        <button onClick={downloadCanvas}>Download</button>
        <button onClick ={convertToAI}>Convert to AI</button>
      </div>

      <DrawCanvas
        colour={useColour}
        tool={useTool}
        size={brushSize}
        clearButton={clear}
        canvasRef={canvasRef}
      />
    </>
  );
}

export default DrawPage;
