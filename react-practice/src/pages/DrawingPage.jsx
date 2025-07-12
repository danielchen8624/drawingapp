import { useState } from "react";
import DrawCanvas from "../components/drawComponent";
import "../css/colourpicker.css";

function DrawPage() {
  const [useColour, setUseColour] = useState("black");
  const [useTool, setUseTool] = useState("pen");
  const [brushSize, setBrushSize] = useState(10);
  const colours = ["red", "blue", "green", "yellow", "pink"];
  const tools = ["eraser"];
  const [clear, setClear] = useState(false);
  const [currentInUse, setCurrentInUse] = useState("red");

  const setUse = (using) => {
    setCurrentInUse(using);
  };

  //
  //
  const clearFunction = () => {
    setClear((prev) => !prev);
  };

  const changeBrushSize = (size) => {
    setBrushSize(size);
  };

  const whichTool = (tool) => {
    setUseTool(tool);
  };
  const downloadCanvas = () => {

  };

  const whichColour = (colour) => {
    setUseColour(colour);
  };

  return (
    <>
      <div className="hotbar">
        {colours.map((colour) => (
          <div key={colour}>
            <span>
              <button
                className={`${colour}-buttonColour ${currentInUse === colour ? "outlined" : ""}`}
                type="button"
                onClick={() => {
                  whichColour(colour);
                  whichTool("pen");
                  setUse(colour);
                }}
              >
                {}
              </button>
            </span>
          </div>
        ))}
        {tools.map((tool) => (
          <div key={tool}> 
            <button
              className={`${tool}-tool ${currentInUse === tool ? "outlined" : ""}`}
              type="button"
              onClick={() => {
                whichTool(tool);
                setUse(tool);
              }}
            >
              {tool}
            </button>
          </div>
        ))}
        <button className="clearButton" type="button" onClick={clearFunction}>
          Clear
        </button>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => changeBrushSize(Number(e.target.value))}
        />
        <button type ="button" onClick = {downloadCanvas}>Download</button>

      </div>
      

      <DrawCanvas
        colour={useColour}
        tool={useTool}
        size={brushSize}
        clearButton={clear}
      />
    </>
  );
}

export default DrawPage;
