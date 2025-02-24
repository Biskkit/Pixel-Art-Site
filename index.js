/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let mouseDown = false;

// This is the ratio of units to pixels.
// So this can be recalculated as the canvas is rescaled
// This should be the pixels value (16x16 for now) over the value of the width/height (which are the same for now)
// So, pToU = pixels / height or width of canvas
let pToU = 1;

let clrBtn = document.getElementById('clear');

function calcPos(x, y) {
	return Math.ceil(x * 16/y);
}

// canvas.addEventListener('mouseenter', (e) => {
// 	ctx.reset();
// })
canvas.addEventListener("mousedown", (e) => {
	mouseDown = true;
	const posX = e.clientX;
	const posY = e.clientY;
	ctx.fillStyle = "rgb(0, 0, 0)";
	ctx.fillRect(posX, posY, 1/pToU, 1/pToU);
});
canvas.addEventListener('mouseup', () => { 
	mouseDown = false;
})
// canvas.addEventListener('mouseout', fillRed);
canvas.addEventListener('mousemove', fillPixel)

clrBtn.addEventListener('click', () => {
	ctx.reset();
})


/**
 * Note: Should only be called upon canvas objects
* @param {MouseEvent} e
**/
function fillPixel(e) {
	if(mouseDown) {
		const posX = e.clientX
		const posY = e.clientY
		/** @type {HTMLCanvasElement}*/
		ctx.fillStyle = "rgb(0, 0, 0)";
		ctx.fillRect(posX, posY, pToU, pToU);
	}
}

window.onload = () => {
	let width = window.innerWidth
	let height = window.innerHeight
	console.log(`Window height: ${height}, Window width: ${width}`);
	if(width < height) {
		canvas.width = (.8 * width)
		canvas.height = (.8 * width)
	}
	else {
		console.log('in else');
		canvas.width = (.8 * height)
		canvas.height = (.8 * height)
	}
	pToU = canvas.width/16;
	ctx.scale(pToU, pToU);
}

window.onresize = () => {
	let width = window.innerWidth
	let height = window.innerHeight
	console.log(`Window height: ${height}, Window width: ${width}`);
	if(width < height) {
		canvas.width = (.8 * width)
		canvas.height = (.8 * width)
	}
	else {
		console.log('in else');
		canvas.width = (.8 * height)
		canvas.height = (.8 * height)
	}
	pToU = canvas.width/16;
	ctx.scale(pToU, pToU);
	console.log(`Canvas width: ${canvas.width}, Canvas height: ${canvas.width}`);

}