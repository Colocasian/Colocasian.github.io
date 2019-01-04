const FPS = 60;
const MULT = 1 / 1000;
const REP = MULT * FPS;
const FASTER = 86400 * 10;
const G = 6.67408e-11;


/** Class representing a planet */
class Planet {
    /**
     * Constructor for Planet class
     *
     * @class
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
     *
     * @access protected
     * @param {Planet} b2 The planet w.r.t. we need to find acceleration
     * @returns {Array} The acceleration vector wrt other planet
     */
    acc(b2) {
        let xDir = b2.x - this.x,
            yDir = b2.y - this.y;
        let num = xDir * xDir + yDir * yDir;

        let a_mod = G * b2.m / num;
        return [(xDir / Math.sqrt(num) * a_mod), (yDir / Math.sqrt(num) * a_mod)];
    }

    /**
     * Function to keep in check the net acceleration on the planet
     *
     * @access protected
     * @param {Planet} b2 The planet w.r.t. we need acceleration
     */
    addAccel(b2) {
        let accAdd = this.acc(b2);
        this.netAcc[0] += accAdd[0];
        this.netAcc[1] += accAdd[1];
    }

    /**
     * Refreshes the location of the planet for the given net acceleration value stored
     *
     * @access protected
     */
    refreshNew() {
        let accel = this.netAcc;
        this.netAcc = [0, 0];
        let tmpx = this.x;
        let tmpy = this.y;
        this.x = 2 * this.x - this.x_p + accel[0] / (REP * REP);
        this.y = 2 * this.y - this.y_p + accel[1] / (REP * REP);
        this.x_p = tmpx;
        this.y_p = tmpy;
    }

    /**
     * Prints out the the planet in the required location
     *
     * @access public
     */
    output() {
        let store = 50;
        fill(this.cr, this.cg, this.cb);
        // ellipse(this.x / 2.492e11 * 360, this.y / 2.492e11 * 360, this.r, this.r);
        this.history.unshift([this.x / 2.492e11 * 360, this.y / 2.492e11 * 360]);
        if (this.history.length > store)
            this.history.pop();

        for (let i = this.history.length - 1; i >= 0; i--) {
            let bufr = 20;
            fill((this.cr - bufr) * (store - i) / store + bufr, (this.cg - bufr) * (store - i) / store + bufr, (this.cb - bufr) * (store - i) / store + bufr);
            let loc = this.history[i];
            ellipse(loc[0], loc[1], this.r, this.r);
        }
    }
}

/** Class simulating a system of planets */
class SystemOfPlanets {
    /**
     * Constructor for SystemOfPLanets class
     *
     * @class
     */
    constructor() {
        /** @access protected */
        this.planets = [];
    }

    /**
     * Function to add a planet to the system
     *
     * @access public
     * @param {Planet} planet
     */
    addPlanet(planet) {
        this.planets.push(planet);
    }

    /**
     * Function to refreshe the system of planets
     *
     * @access public
     */
    refresh() {
        for (let i = 0; i < this.planets.length; i++) {
            for (let j = 0; j < this.planets.length; j++) {
                if (j == i)
                    continue;
                this.planets[i].addAccel(this.planets[j]);
            }
        }

        for (let k = 0; k < this.planets.length; k++)
            this.planets[k].refreshNew();
    }

    /**
     * Outputs every planet in system
     *
     * @access public
     */
    output() {
        for (let i = 0; i < this.planets.length; i++)
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


function timeToString(secs) {
    secs = Math.floor(secs);
    let min = (secs - secs % 60) / 60;
    let hr = (min - min % 60) / 60;
    let ans = '';
    if (hr > 0)
        ans = hr + 'h ' + (min % 60) + 'min ' + (secs % 60) + 's';
    else if (min > 0)
        ans = min + 'min ' + (secs % 60) + 's';
    else
        ans = secs + 's';
    return ans;
}

let font;
let fontsize = 60;

function preload() {
    font = loadFont('../../assets/dotty/dotty.ttf');
}

function setup() {
    frameRate(FPS);
    createCanvas(1280, 720);

    noStroke();
    background(0);

    textFont(font);
    textSize(fontsize);
    textAlign(LEFT);
}

let timePassed = 0;
let framesPass = 0;

function draw() {
    background(0);
    translate(640, 360);

    fill(255);
    text('Time  ' + timeToString(timePassed), -610, -310);

    let solar = new SystemOfPlanets();
    solar.addPlanet(body2); // Main 'Sun'

    solar.addPlanet(body1); // Rest
    solar.addPlanet(body3); // of
    solar.addPlanet(body4); // the
    solar.addPlanet(body5); // Planets

    solar.addPlanet(body6); // Halley's comet

    for (let i = 0; i < FASTER * MULT; i++)
        solar.refresh();

    solar.output();

    if (++framesPass == FPS) {
        timePassed++;
        framesPass = 0;
    }
}

!function() {
    this.preload = preload;
    this.setup = setup;
    this.draw = draw;
}();
