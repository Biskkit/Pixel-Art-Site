import { useEffect, useRef, useState } from "react";
import { Sidebar } from "./sidebar";
import { erasePixel, fillPixel } from "../helper-functions/canvasFunctions";
import { ColorPicker } from "./colorPicker";

// Main component
export function Canvas() {
	const [mouseDown, setMouseDown] = useState(false);
	// This will allow react to access the canvas DOM object/node
	const canvasRef = useRef(null)
	// Scaling variable used to transform the client position to the actual internal canvas
	// In this case, it'll be 16
	const [pScale, setPScale] = useState(1);
	
	// State string which will be set based upon what tool selected (i.e. "paint" for brush tool, "erase" for eraser, etc.)
	const [canvasAction, setCanvasAction] = useState("paint");
	let size = 16;
	/**
	 * This function will run on first load (after canvasRef has been grabbed) and whenever the window resizes
	 * @brief Sets the CSS width and height of canvas along with the pScale state variable
	 * @param windowHeight, height of the window
	 * @param windowWidth, width of the window  
	*/
	function setScaling(windowHeight, windowWidth) {
		// Grab scale
		const scale = Math.floor(Math.min(windowWidth, windowHeight) * .8);
		// Grab canvas
		const canvas = canvasRef.current;
		// Set CSS styling width, this ensures that the internal scaling stays the same (in this case, 16x16)
		canvas.style.width = `${scale}px`;
		canvas.style.height = `${scale}px`;
		// Set the scaling for pixels and units
		setPScale(scale / size);
	}
	
	/**
	 * Code to run on first load of component
	 * This should replace the "window.onload" function (hopefully)
	 */
	useEffect(() => {
		setScaling(window.innerHeight, window.innerWidth);
	}, []);

	// Add event listener to window, so that it runs the scaling method every time it resizes
	window.addEventListener("resize", () => setScaling(window.innerHeight, window.innerWidth));

	/**
	 * Wrapper function for updating current action. This will be passed down to the sidebar
	 * Reasoning: passing down to sidebar will allow this function to be passed to buttons like erase button or paintbrush button.
	 * Then, these buttons can call this function and update the top-level currentAction state variable accordingly.
	 * @param {String} action, action to update to  
	*/
	function updateCanvasAction (action) {
		setCanvasAction(action);
	}

	/** 
	 * Wrapper function to set mouseDown to false. Wrapped in case it needs to be changed in the future
	 * Currently, onMouseUp and onMouseLeave call this function
	*/ 
	function falseMouseDown() {
		setMouseDown(false);
	}

	

	/**
	 * This function will execute the given canvas action based upon the canvasAction state variable
	 * Example: when canvasAction = "paint", it will call the fillPixel function on the current canvas.
	 * @param {MouseEvent} e, the mouse event to be passed in, will provide the x and y offset in relation to the canvas
	 */
	function executeAction (e) {
		const canvas = canvasRef.current;
		const nativeEvent = e.nativeEvent;
		const posX = nativeEvent.offsetX;
		const posY = nativeEvent.offsetY;
	
		switch (canvasAction) {
			case "paint":
				fillPixel(canvas, posX, posY, pScale);
				break;
			case "erase":
				erasePixel(canvas, posX, posY, pScale);
				break;
			default:
				break;
		}
	}

	/**
	 * Function for handling mouseDown input, 
	 * replaces typical eventListener used before
	 * @param {MouseEvent} e
	 */
	function handleMouseDown(e) {
		setMouseDown(true);
		executeAction(e);
	}

	/**
	 * Function for handling mouse movement
	 * @param {MouseEvent} e
	 */
	function handleMouseMove(e) {
		if(mouseDown) {
			executeAction(e);
		}
	}
	

	return(
		<div className="canvas">
			<canvas
				ref = {canvasRef}
				onMouseDown={handleMouseDown}
				onMouseUp={falseMouseDown}
				onMouseLeave={falseMouseDown}
				onMouseMove={handleMouseMove}
				height={size}
			width={size}>
			</canvas>
			<Sidebar canvas = {canvasRef.current} updateCanvasAction = { updateCanvasAction } currentCanvasAction = {canvasAction}/>
			<ColorPicker/>
		</div>
	);
}


