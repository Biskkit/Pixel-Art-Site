import { useEffect, useRef, useState } from "react";
// Main component
export function Canvas() {
	const [mouseDown, setMouseDown] = useState(false);
	// This will allow react to access the canvas DOM object/node
	const canvasRef = useRef(null)
	// Scaling variable used to transform the client position to the actual internal canvas
	// In this case, it'll be 16
	const [pScale, setPScale] = useState(1);
	
	// Helper function to translate x and y pixels
	// This function assumes that pos must be divided by the scale state variable
	function transposePosition(pos, offset) {
		return Math.floor((pos - offset) / pScale);
	}

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
		setPScale(scale / 16);
	}
	
	/**
	 * Code to run on first load of component
	 * This should replace the "window.onload" function (hopefully)
	 */
	useEffect(() => {
		setScaling(window.innerHeight, window.innerWidth);
	}, [canvasRef]);

	// Add event listener to window, so that it runs the scaling method every time it resizes
	window.addEventListener("resize", () => setScaling(window.innerHeight, window.innerWidth));

	/**
	 * Function for handling mouseDown input, 
	 * replaces typical eventListener used before
	 * @param {MouseEvent} e
	 */
	function handleMouseDown(e) {
		setMouseDown(true);
		// Native JS event to access things react doesn't support like offsetX and offsetY
		const nativeEvent = e.nativeEvent;

		const canvas = canvasRef.current;
		let ctx = canvas.getContext('2d');
		ctx.fillStyle = "rgb(0, 0, 0)";
		let posX = nativeEvent.offsetX;
		let posY = nativeEvent.offsetY;
		// Grab the "rectangle" of the internal canvas so that the positions can be transposed
		// const boundRect = canvas.getBoundingClientRect();
		// Transpose x and y position
		posX = transposePosition(posX, 0);
		posY = transposePosition(posY, 0);
		// console.log(`Left: ${boundRect.left}, Top: ${boundRect.top}, Bottom: ${boundRect.bottom}, Right: ${boundRect.right}, pixX: ${posX}, pixY: ${posY}`);
		ctx.fillRect(posX, posY, 1, 1);
	}

	/** 
	 * Function to handle mouse up 
	 * (will simply set state, but wrapped in a function in case it is changed)
	*/ 
	function falseMouseDown() {
		setMouseDown(false);
	}

	/**
 	* Note: Should only be called upon by canvas objects
	* @param {MouseEvent} e
	**/
	function fillPixel(e) {
		// Native JS event to access things react doesn't support like offsetX and offsetY
		const nativeEvent = e.nativeEvent;
		if(mouseDown) {
			let posX = nativeEvent.offsetX;
			let posY = nativeEvent.offsetY;
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = "rgb(0, 0, 0)";
			// Grab the "rectangle" of the internal canvas so that the positions can be transposed
			// const boundRect = canvas.getBoundingClientRect();
			// Transpose x and y position
			posX = transposePosition(posX, 0);
			posY = transposePosition(posY, 0);
			console.log(`pixX: ${posX}, pixY: ${posY}, clientX: ${e.clientX}, clientY: ${e.clientY}`);
			ctx.fillRect(posX, posY, 1, 1);
		}
	}
	
	return(
		<>
			<canvas
			ref = {canvasRef}
			onMouseDown={handleMouseDown}
			onMouseUp={falseMouseDown}
			onMouseLeave={falseMouseDown}
			onMouseMove={fillPixel}
			height={16}
			width={16}>
			</canvas>
			<ClearBtn canvas = {canvasRef.current}/>
		</>
	);
}

/**
 * Clear button to delete all the pixels on the canvas
 * @param {HTMLCanvasElement} canvas, the canvas object to clear  
*/
function ClearBtn({ canvas }) {
	function clearCanvas() {
		// Grab canvas context
		const ctx = canvas.getContext('2d');
		// Grab width and height of canvas
		const width = canvas.width;
		const height = canvas.height;
		ctx.clearRect(0, 0, width, height);
	}
	return(
		<button onClick={clearCanvas}>Clear</button>
	);
}