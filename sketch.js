let worm = []
let font = "iA Writer Mono"
let dX = 16
let dY = 25
let sizeX
let sizeY

let width = 600
let height = 600
let interval = 4

let maxLength = 150
let maxDeath = 512;

let frameCounter = 0

let colorState = "white"

let fillColor = 0;

let deaths = [];

let pregnancy = 0;
let decaying = false;

function wormDies()
{
	
	colorState = colorState === "white" ? "black" : "white"

	for (let p of worm)
	{
		deaths[p.x][p.y] = maxDeath
	}

	worm = []
}

function updateColor()
{
	if (colorState === "black")
	{
		fillColor+= 10;
		fillColor = min(fillColor, 255)
		
	}

	if (colorState === "white")
	{
		fillColor-= 10;
		fillColor = max(fillColor, 0)
		
	}
}

function updateWorm() {
	let p = {}
	let found = false

	let rounds = 0

	if (worm.length === 0 && !decaying)
	{
		pregnancy = 512;
		
		worm.push({ x: random(sizeX / 2) | 0 + 5, y : random(sizeY /2) | 0  + 5})
		return;

	}

	if (pregnancy > 0)
	{
		pregnancy -= 10;
		return;
	}

	if (worm.length === 0)
	{
		return;
	}

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
					wormDies();
					return;
				}
				continue

			}
		}

		found = true

	}

	worm.unshift(p);
	worm = worm.slice(0, maxLength)

}

function drawWorm(worm) 
{

	if (pregnancy > 0)
	{
		let chars = "123456789*  *  *   *"
		let c = chars[min(chars.length - 1, (pregnancy / 255 * chars.length) | 0)]

		fill(fillColor, 255)
		text(c, worm[0].x * dX, worm[0].y * dY)
		return;
	}
	

	for (let [i, p] of worm.entries()) {
		fill(fillColor, (worm.length - i) / worm.length * 255 | 0)
		fill(fillColor)

		let chars = "█▓▒░"

		let c = chars[min(chars.length - 1, (i / worm.length * chars.length) | 0)]

		text(c, p.x * dX, p.y * dY)
	}
}

function drawDeath()
{

	decaying = false;

	for (let i = 0; i < sizeX; i++) 
	{
		for (let j = 0; j < sizeY; j++) {

			if (deaths[i][j] > 0)
			{
				decaying = true;

				fill(lerpColor(color(fillColor, fillColor, fillColor, deaths[i][j] > 128 ? 255 : deaths[i][j] * 2),  color(255, 0, 0, 255), deaths[i][j] / maxDeath))

				// fill(255, fillColor - deaths[i][j], fillColor - deaths[i][j])

				let chars = ".  .. . .::.  .. ††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††††"
				let c = chars[min(chars.length - 1, (deaths[i][j] / maxDeath * chars.length) | 0)]

				text(c, i * dX, j * dY)
				deaths[i][j] --
				if (random(10) > 6)
				{
					deaths[i][j]--
				}

				deaths[i][j] = max(0, deaths[i][j])
				
			}
		}
		
	}
}

function setup() {
	createCanvas(width, height);
	textFont(font)
	textSize(20)
	textAlign(LEFT, TOP)
	fill(fillColor)

	sizeX = width / dX
	sizeY = height / dY

	for (let i = 0; i < sizeX; i++) 
	{
		deaths[i] = []
		for (let j = 0; j < sizeY; j++) 
		{
			deaths[i][j] = 0
		}
	}
}

function draw() {

	frameCounter++
	updateColor();

	if (frameCounter % interval === 0)
	{
		updateWorm(worm)
	}

	clear()
	background(255 - fillColor);
	drawDeath();	

	drawWorm(worm)
}
