let FPS = 60
let MULT = 1000
let REP = MULT * FPS
let FASTER = 15
let G = 10

class Planet {
    constructor(m, x, y, init_vx, init_vy) {
        this.m = m
        this.x = x
        this.y = y
        this.x_p = x - init_vx / (REP)
        this.y_p = y - init_vy / (REP)
        this.netAcc = [0, 0]
    }

    acc(b2) {
        var xDir = b2.x - this.x, yDir = b2.y - this.y
        var num = xDir * xDir + yDir * yDir

        var a_mod = G * b2.m / num
        return [(xDir / sqrt(num) * a_mod), (yDir / sqrt(num) * a_mod)]
    }

    addAccel(b2) {
        var accAdd = this.acc(b2)
        this.netAcc[0] += accAdd[0]
        this.netAcc[1] += accAdd[1]
    }

    refreshNew(b2) {
        var accel = this.netAcc
        this.netAcc = [0, 0]
        var tmpx = this.x
        var tmpy = this.y
        this.x = 2 * this.x - this.x_p + accel[0] / (REP * REP)
        this.y = 2 * this.y - this.y_p + accel[1] / (REP * REP)
        this.x_p = tmpx
        this.y_p = tmpy
    }

    refresh(b2) {
        var accel = this.acc(b2)
        var tmpx = this.x
        var tmpy = this.y
        this.x_temp = 2 * this.x - this.x_p + accel[0] / (REP * REP)
        this.y_temp = 2 * this.y - this.y_p + accel[1] / (REP * REP)
        this.x_p_temp = tmpx
        this.y_p_temp = tmpy
    }

    output() {
        ellipse(this.x, this.y, 5 * Math.pow(this.m, 1/3), 5 * Math.pow(this.m, 1/3))
    }
}


// Description of body 1
let body1 = new Planet(10, 80, 0, 0, 10)

// Description of body 2
let body2 = new Planet(1000, 0, 0, 0, 0)

// Description of body 3
let body3 = new Planet(10, -80, 0, 0, -10)

function setup() {
    frameRate(FPS)
    createCanvas(400, 400)
}

function draw() {
    translate(200, 200)
    background(240)

    for (var i = 0; i < FASTER * MULT; i++) {
        body1.addAccel(body2)
        body1.addAccel(body3)
        body2.addAccel(body1)
        body2.addAccel(body3)
        body3.addAccel(body1)
        body3.addAccel(body2)
        body1.refreshNew()
        body2.refreshNew()
        body3.refreshNew()
    }

    body1.output()
    body2.output()
    body3.output()
}
