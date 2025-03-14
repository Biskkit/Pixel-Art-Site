/**
 * This file contains all helper functions which directly manipulate the canvas when certain events are called.
 * Example: fillPixel will change the canvas when a mouseDown or mouseMove event is emitted.
 * Each function takes the respective emitted event as a parameter.
 * 
 * Note: Ensure that each event is tied to a canvas object as each method will assume that it is.
 */

// Helper function to translate x and y pixels
// This function assumes that pos must be divided by the scale state variable
function transposePosition(pos, pScale) {
	return Math.floor(pos / pScale);
}

/**
 * @brief Will fill the pixel at the given position with the context of the current canvas (i.e. the canvas which is the target of the event e)
 * @param {HTMLCanvasElement} canvas, canvas to act on
 * @param posX, x position on canvas
 * @param posY, y position on canvas 
 */
export function fillPixel(canvas, posX, posY, pScale) {
	// Native JS event to access things react doesn't support like offsetX and offsetY
	const ctx = canvas.getContext('2d');
	// Transpose x and y position
	posX = transposePosition(posX, pScale);
	posY = transposePosition(posY, pScale);
	ctx.fillRect(posX, posY, 1, 1);
}

/**
 * @brief Same as fillPixel except it clears the pixel instead
 * @param {HTMLCanvasElement} canvas, canvas to act on
 * @param posX, x position on canvas
 * @param posY, y position on canvas 
 */
export function erasePixel (canvas, posX, posY, pScale) {
	// Native JS event to access things react doesn't support like offsetX and offsetY
	const ctx = canvas.getContext('2d');
	// Transpose x and y position
	posX = transposePosition(posX, pScale);
	posY = transposePosition(posY, pScale);
	ctx.clearRect(posX, posY, 1, 1);
}