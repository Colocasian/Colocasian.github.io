const FPS = 60;
const MULT = 1 / 1000;
const REP = MULT * FPS;
const FASTER = 86400 * 10;
const G = 6.67408e-11;

/** Class representing a planet */
class Planet {
    /**
     * @constructor
     * @param {number} m Mass of the planet
     * @param {number} x Initial x-coordinate of planet
     * @param {number} y Initial y-coordinate of planet
     * @param {number} init_vx Initial x-velocity of planet
     * @param {number} init_vy Initial y-velocity of planet
     * @param {number} r Radius of planet to render in
     * @param {number} cr Red value of planet color to render
     * @param {number} cg Green value of planet color to render
     * @param {number} cb Blue value of planet color to render
     */
    constructor(m, x, y, init_vx, init_vy, r, cr, cg, cb) {
        this.m = m;
        this.x = x;
        this.y = y;
        this.x_p = x - init_vx / (REP);
        this.y_p = y - init_vy / (REP);
        this.netAcc = [0, 0];
        this.r = r;
        this.cr = cr;
        this.cg = cg;
        this.cb = cb;
        this.history = [];
    }

    /**
     * Function to find acceleration of planet w.r.t. another planet
     * @access protected
     * @param {Planet} b2 The planet w.r.t. we need to find acceleration
     * @returns The acceleration vector wrt other planet
     */
    acc(b2) {
        var xDir = b2.x - this.x,
            yDir = b2.y - this.y;
        var num = xDir * xDir + yDir * yDir;

        var a_mod = G * b2.m / num;
        return [(xDir / sqrt(num) * a_mod), (yDir / sqrt(num) * a_mod)];
    }

    /**
     * Function to keep in check the net acceleration on the planet
     * @access protected
     * @param {Planet} b2 The planet w.r.t. we need acceleration
     */
    addAccel(b2) {
        var accAdd = this.acc(b2);
        this.netAcc[0] += accAdd[0];
        this.netAcc[1] += accAdd[1];
    }

    /**
     * Refreshes the location of the planet for the given net acceleration value stored
     * @access protected
     */
    refreshNew() {
        var accel = this.netAcc;
        this.netAcc = [0, 0];
        var tmpx = this.x;
        var tmpy = this.y;
        this.x = 2 * this.x - this.x_p + accel[0] / (REP * REP);
        this.y = 2 * this.y - this.y_p + accel[1] / (REP * REP);
        this.x_p = tmpx;
        this.y_p = tmpy;
    }

    /**
     * Prints out the the planet in the required location
     * @access public
     */
    output() {
        var store = 50;
        fill(this.cr, this.cg, this.cb);
        // ellipse(this.x / 2.492e11 * 360, this.y / 2.492e11 * 360, this.r, this.r);
        this.history.unshift([this.x / 2.492e11 * 360, this.y / 2.492e11 * 360]);
        if (this.history.length > store)
            this.history.pop();

        for (var i = this.history.length - 1; i >= 0; i--) {
            var bufr = 20;
            fill((this.cr - bufr) * (store - i) / store + bufr, (this.cg - bufr) * (store - i) / store + bufr, (this.cb - bufr) * (store - i) / store + bufr);
            var loc = this.history[i];
            ellipse(loc[0], loc[1], this.r, this.r);
        }
    }
}

/** Class simulating a system of planets */
class SystemOfPlanets {
    /**
     * @constructor
     */
    constructor() {
        /** @access protected */
        this.planets = [];
    }

    /**
     * Adds a planet to the system
     * @access public
     * @param {Planet} planet
     */
    addPlanet(planet) {
        this.planets.push(planet);
    }

    /**
     * Refreshes the system of planets
     * @access public
     */
    refresh() {
        for (var i = 0; i < this.planets.length; i++) {
            for (var j = 0; j < this.planets.length; j++) {
                if (j == i)
                    continue;
                this.planets[i].addAccel(this.planets[j]);
            }
        }

        for (var i = 0; i < this.planets.length; i++)
            this.planets[i].refreshNew();
    }

    /**
     * Outputs every planet in system
     * @access public
     */
    output() {
        for (var i = 0; i < this.planets.length; i++)
            this.planets[i].output();
    }
}


// Description of body 1
let body1 = new Planet(5.972e24, 1.52e11, 0, 0, 2.929e4, 10, 0, 119, 190); // Earth

// Description of body 2
let body2 = new Planet(1.989e30, 0, 0, 0, 0, 30, 253, 184, 19); // Sun

// Description of body 3
let body3 = new Planet(4.867e24, 1.08939e11, 0, 0, 3.478e4, 9.5, 187, 183, 171); // Venus

// Description of body 4
let body4 = new Planet(3.285e23, 6.98169e10, 0, 0, 3.886e4, 3.83, 226, 226, 226); // Mercury

// Description of body 5
let body5 = new Planet(6.39e23, 2.492e11, 0, 0, 2.2e4, 5.32, 161, 37, 27); // Mars

// Description of body 6
let body6 = new Planet(2.2e14, -8.766e10, 0, 0, 5.458e4, 2, 255, 255, 255); // Halley's comet


function setup() {
    frameRate(FPS);
    createCanvas(1280, 720);

    noStroke();
    background(0);
}

function draw() {
    background(0, 0, 0, 50);
    translate(640, 360);

    var solar = new SystemOfPlanets();
    solar.addPlanet(body2); // Main 'Sun'

    solar.addPlanet(body1); // Rest
    solar.addPlanet(body3); // of
    solar.addPlanet(body4); // the
    solar.addPlanet(body5); // Planets

    solar.addPlanet(body6); // Halley's comet

    for (var i = 0; i < FASTER * MULT; i++)
        solar.refresh();

    solar.output();
}
