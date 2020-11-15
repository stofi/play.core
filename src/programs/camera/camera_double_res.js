/**
@author ertdfgcvb
@title  Camera double resolution
@desc   Doubled vertical resolution input from camera
[header]
*/

import { CSS3 } from '/src/modules/color.js'
import Camera from '/src/modules/camera.js'

const cam = Camera.init()
// For a debug view uncomment the following line:
// cam.display(document.body, 10, 10)

// Palette for quantization
const pal = []
pal.push(CSS3.red)
pal.push(CSS3.blue)
pal.push(CSS3.white)
pal.push(CSS3.black)
pal.push(CSS3.lightblue)

export function pre(context, cursor, buffers){
	// Double the height of the camera image
	const newSize = {
		cols : context.cols,
		rows : context.rows * 2
	}
	// Adjust the scale to compensate
	const sX = 0.75
	const sY = 1.5

	cam.cover({...context, ...newSize}, sX, sY).quantize(pal).mirrorX().writeTo(buffers.data)
}

export function main(coord, context, cursor, buffers){
	// Coord also contains the index of each cell:
	const idx   = coord.y * context.cols * 2 + coord.x
	const upper = buffers.data[idx]
	const lower = buffers.data[idx + context.cols]

	return {
		char       :'▄',
		color      : lower.hex,
		background : upper.hex
	}
}

import { drawInfo } from '/src/modules/drawbox.js'
export function post(context, cursor, buffers){
	drawInfo(context, cursor, buffers)
}

