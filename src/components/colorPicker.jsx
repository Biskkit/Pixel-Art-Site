/**
 * Custom color-picker component. I did this because I want to learn how to make one as well as keep the site color picker consistent
 * across browsers. It also gives me more creative freedom to choose the design of the color picker. Allowing for it to match the site's
 * pixel theme. This will use the canvas to be implemented (hopefully it works)
 */

import { useState, useRef, useEffect } from "react";

export function ColorPicker() {
	// const [color, setColor] = useState("#000000");
	const [mouseDown, setMouseDown] = useState(false);
	const [posArr, setPosArr] = useState([0, 0]);
	const canvasRef = useRef(null);
	// if(canvasRef) canvas = canvasRef.current;

	// Set initial gradient of canvas
	// useEffect(() => {
	// 	/**@type {HTMLCanvasElement} */
	// 	const canvas = canvasRef.current;
	// 	// ctx.createLinearGradient()
	// }, [canvasRef]);


	/**
	 * This will handle when the mouse moves in the canvas. Grabbing the offset x and y and updating the span respectively
	 * @param {MouseEvent} e 
	 */
	function handleMouseMove(e) {
		if(mouseDown) {
			/**@type {HTMLCanvasElement} */
			const canvas = e.target;
			//grab rectangle
			const bbox = canvas.getBoundingClientRect();
			let x = e.clientX - bbox.left;
			let y = e.clientY - bbox.top;
			
			// Move span to respective position, this will update the x and y state variables which will implicitly update the given top and left position of the span
			setPosArr([x, y]);
		}
	}

	/**
	* Function to handle mouse down, very similar to handleMouseMove, just skips the if check
	*/
	function handleMouseDown(e) {
		// set mousedown to true
		setMouseDown(true);
		
		/**@type {HTMLCanvasElement} */
		const canvas = e.target;
		//grab rectangle
		const bbox = canvas.getBoundingClientRect();
		let x = e.clientX - bbox.left;
		let y = e.clientY - bbox.top;
		
		// Move span to respective position, this will update the x and y state variables which will implicitly update the given top and left position of the span
		setPosArr([x, y]);
	}
	
	// Grab respective x and y pos from pos array
	const posX = posArr[0];
	const posY = posArr[1];
	return(
		<div style={{display: "inline-block", position: "relative"}}>
			<canvas ref = {canvasRef} width = {400} height = {400} style={{border: "none", margin: "0", zIndex: 1}} 
				onMouseDown = {handleMouseDown} 
				onMouseUp= {() => setMouseDown(false)}
				onMouseLeave={() => setMouseDown(false)}
				onMouseMove={handleMouseMove}>
			</canvas>
			<span className="markerSpan" style={{top: `${posY}px`, left: `${posX}px`}}>
				<img className= "markerElement" src="ui/color-picker-eye.png"></img>
			</span>
		</div>
	)
}

/**
 * This function will return the pixel value at the given x and y coordinate 
 * @param  x, x coordinate on canvas
 * @param  y, y coordinate on canvas
 * @param {ImageData} imageData, ImageData object of the canvas representing the color picker
 */
// function grabPixelValue(x, y, imageData) {

// }
