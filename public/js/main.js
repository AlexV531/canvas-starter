/** @type {HTMLCanvasElement} */
const canvas = document.querySelector('canvas.main-canvas')
/** Drawing Context */
const context = canvas.getContext('2d')
/** Size of our drawing area */
const viewport = {
	width: 320, height: 240 // These will be determined later..
}

/** Scene scaling */
const SCALE = 10.0
/** Background */
const BG_COLOR = '#FFFF00'
/** Radius of circle */
const CIRCLE_RADIUS = 1.0

const position = {
	x:0, y:0
}
let prevT = Date.now()

/** Handles initial canvas sizing, and all resizing thereafter */
function resize() {
	// Whenever the window is resized we need to update
	// the canvas resolution.
	const rc = canvas.getBoundingClientRect()
	canvas.width = viewport.width = rc.width
	canvas.height = viewport.height = rc.height
	render()
}

/** Call this once on application startup */
function initApp() {
	// Listen for window resize events
	window.addEventListener('resize', resize)
	resize()
}

/** Render the scene */
function render() {
	// Clear the screen
	context.beginPath()
	context.fillStyle = BG_COLOR
	context.fillRect(0, 0, viewport.width, viewport.height)

	// Set up a cartesian-style coordinate system with 0,0
	// at the centre of the screen, and Y axis up.
	context.save()
	context.translate(viewport.width / 2, viewport.height / 2)
	context.scale(viewport.width / SCALE, -viewport.width / SCALE)

	// Draw a circle
	context.beginPath()
	context.fillStyle = '#000066'
	context.arc(position.x, position.y, CIRCLE_RADIUS, 0, Math.PI * 2)
	context.fill()

	context.restore()
}

initApp()

//start animation loop
function update() {
	const curT = Date.now()
	const deltaT = curT - prevT
	const fT = deltaT/1000
	//position.x = position.x + fT * 1
	position.x = Math.tan(curT/1000)
	position.y = Math.sin(curT/1000) + Math.sin(curT/100)
	prevT = curT
	render()
	requestAnimationFrame(update)
}

requestAnimationFrame(update)
