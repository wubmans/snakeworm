let worm = []
let font = "iA Writer Mono"
let dX = 16
let dY = 25
let sizeX
let sizeY

let width = 800
let height = 800
let interval = 4

let maxLength = 150

let frameCounter = 0

function updateWorm() {
	let p = {}
	let found = false

	let rounds = 0

	while (!found) {

		rounds++

		if (worm.length === 1) {
			switch (random(0, 4) | 0) {
				case 0: p.x = worm[0].x - 1; p.y = worm[0].y; break
				case 1: p.x = worm[0].x + 1; p.y = worm[0].y; break
				case 2: p.x = worm[0].x; p.y = worm[0].y - 1; break
				case 3: p.x = worm[0].x; p.y = worm[0].y + 1; break
			}

			//worm.unshift(p);
			

		}

		else {

			let dx = worm[0].x - worm[1].x
			let dy = worm[0].y - worm[1].y

			if (dx === 0) {
				switch (random(0, 3) | 0) {
					case 0: p.x = worm[0].x - 1; p.y = worm[0].y; break
					case 1: p.x = worm[0].x + 1; p.y = worm[0].y; break
					case 2: p.x = worm[0].x; p.y = worm[0].y + dy; break
				}
			}
			else {
				switch (random(0, 3) | 0) {
					case 0: p.x = worm[0].x; p.y = worm[0].y - 1; break
					case 1: p.x = worm[0].x; p.y = worm[0].y + 1; break
					case 2: p.x = worm[0].x + dx; p.y = worm[0].y; break
				}
			}
		}

		if (p.x < 0 || p.x >= sizeX || p.y < 0 || p.y >= sizeY) {
			continue
		}

		// found = true

		if (worm.length > 1)
		{
			let ppp = worm.find(pp => p.x === pp.x && p.y === pp.y)
		
			if (ppp)
			{
				rounds++
				if (rounds > 100)
				{
					rounds = 0;
					worm = worm.slice(3, worm.length)
				}
				continue
			}
		}

		found = true

		
	}



	worm.unshift(p);
	worm = worm.slice(0, maxLength)

}

function drawWorm(worm) {
	for (let [i, p] of worm.entries()) {
		fill(0, (worm.length - i) / worm.length * 255 | 0)

		let chars = "█▓▒░"

		let c = chars[min(chars.length - 1, (i / worm.length * chars.length) | 0)]

		text(c, p.x * dX, p.y * dY)
	}
}

function setup() {
	createCanvas(width, height);
	textFont(font)
	textSize(20)
	textAlign(LEFT, TOP)

	sizeX = width / dX
	sizeY = height / dY

	worm = [{ x: random(sizeX) | 0, y: random(sizeY) | 0 }]
}

function draw() {

	frameCounter++

	if (frameCounter % interval === 0)
	{
		updateWorm(worm)
	}

	background(220);
	clear()

	drawWorm(worm)
}
