import { useState, useRef } from "react";
import DrawCanvas from "../components/drawComponent";
import "../css/colourpicker.css";

function DrawPage() {
  const canvasRef = useRef(null); //holds the canvas element
  const [useColour, setUseColour] = useState("black");
  const [useTool, setUseTool] = useState("pen");
  const [brushSize, setBrushSize] = useState(10);
  const [clear, setClear] = useState(false);
  const [currentInUse, setCurrentInUse] = useState("red");

  const colours = ["red", "blue", "green", "yellow", "pink"];
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

  return (
    <>
      <div className="hotbar">
        {colours.map((colour) => (
          <div key={colour}>
            <button
              className={`${colour}-buttonColour ${
                currentInUse === colour ? "outlined" : ""
              }`}
              onClick={() => {
                whichColour(colour);
                whichTool("pen");
                setUse(colour);
              }}
            />
          </div>
        ))}
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
              {tool}
            </button>
          </div>
        ))}
        <button className="clearButton" onClick={clearFunction}>Clear</button>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => changeBrushSize(Number(e.target.value))}
        />
        <button onClick={downloadCanvas}>Download</button>
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
