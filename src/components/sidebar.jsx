/**
 * This file represents all the components which will be shown on the side of the canvas. This includes the clear and download button/link, eraser tool, etc.
 * Each of these components relies on the top-level canvas, which is why they will all share a common parent component "Sidebar"
 * which will have the top-level canvas passed into it as a prop.
 * 
 * Sidenote: I realized this will also help with rendering as whenever the canvas is changed in some way, the sidebar will re-render.
 * However, this could cause some issues with optimization. I'm unsure if all the children will be re-rendered, or not. They shouldn't because
 * React's virtual DOM should optimize on its own. I guess I'll see.
 */

/**
 * Top-level Sidebar component.
 * @param {HTMLCanvasElement1} canvas, top-level canvas object
 */
export function Sidebar({ canvas, updateCanvasAction, currentCanvasAction }) {
	return (
		<div className="sidebar">
			<div className="tools">
				<BrushButton updateCanvasAction={updateCanvasAction} currentCanvasAction={currentCanvasAction}/>
				<EraserButton updateCanvasAction={updateCanvasAction}/>
			</div>
			<div className="utility">
				<ClearBtn canvas = {canvas}/>
				<DownloadLink canvas = {canvas}/>
			</div>
		</div>
	)
}
/**
 * This component will take the following parameters
 * @param {function} updateCanvasAction, wrapper function to update canvasAction state variable
 * @param currentAction, the current canvas action. This is needed so that the correct image can be displayed on the UI (selected/unselected)
 * @returns An image element that changes the canvas action to "brush" on click 
 */
function BrushButton( { updateCanvasAction, currentCanvasAction } ) {
	let src; // source for image
	if(currentCanvasAction == "paint")
		src = "/src/assets/ui/selected/paint-brush.png";
	else
		src = "/src/assets/ui/unselected/paint-brush.png";
	return(
		<img src={src} onClick={() => updateCanvasAction("paint")} alt="Brush Tool"></img>
	)
}

function EraserButton( { updateCanvasAction } ) {
	return(
		<button style = {{backgroundColor: "darkmagenta"}} onClick={() => updateCanvasAction("erase")}>Eraser</button>
	)
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
		<button style = {{backgroundColor: "darkred"}} onClick={clearCanvas}>Clear</button>
	);
}
/**
 * @brief Method will download the image as a PNG. May add other formats later
 * @param {HTMLCanvasElement} canvas, the canvas object to download the image from 
 */
function DownloadLink( { canvas } ) {
	// Grab image URL for PNG download, this has to be state since it needs to wait till canvas is non-null
	// Thought process for future self: Since canvas is passed as props and components will re-render whenever props change, 
	// all you need to do is check if canvas is non-null and then set some variable to a value.
	// Note: The variable cannot be a state-variable because then that leads to infinite re-rendering. 
	// Sometimes, the simplest thing you think won't work will.
	let imageURL;

	if(canvas) imageURL = canvas.toDataURL("image/png");

	return(
		<a style = {{backgroundColor: "green"}} href={imageURL} download = "image" className="buttonLink">Download as PNG</a>
	)
}


