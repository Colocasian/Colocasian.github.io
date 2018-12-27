let FPS = 60
let rep = 10
let n_a = Math.PI / 4
let p_a = Math.PI / 4
let g = 980
let r = 100

function setup() {
	frameRate(FPS)
  createCanvas(400, 400)
}

function draw() {
  background(240)
	for (var i = 0; i < rep; i++) {
		var tSkip = FPS * rep

		var acc = (g / r) * sin(n_a)
		var tmp = n_a
		n_a = 2 * n_a - p_a - acc / (tSkip * tSkip)
		p_a = tmp
	}

	let x_p = 200
	let y_p = 100
	let x = x_p + r * sin(n_a)
	let y = y_p + r * cos(n_a)

	line(x_p, y_p, x, y)
	ellipse(x_p, y_p, 5, 5)
	ellipse(x, y, r / 3, r / 3)
}
