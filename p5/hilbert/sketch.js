const sz = 0;
const x = 9;
const pix_c = (1 << (2 * x));

/**
 * Function to invert a set of directions
 *
 * @param {string} ins The directions to invert
 */
function inverse(ins) {
    let ans = '';
    for (let i = 0; i < ins.length; i++) {
        if (ins.charAt(i) == 'l')
            ans += 'r';
        else if (ins.charAt(i) == 'r')
            ans += 'l';
        else
            ans += ins.charAt(i);
    }
    return ans;
}

/**
 * Function to give instruction to draw hilbert curve
 *
 * @param {number} level The level of hilbert curve
 * @returns {string} The instructions to draw hilbert curve
 */
function hilbert(level) {
    if (level === 0)
        return '';

    let temp = hilbert(level - 1);
    let utemp = inverse(temp);
    let ans = 'r' + utemp + 'lf' + temp + 'rfl' + temp + 'ufr' + utemp + 'r';
    return ans;
}

let color = 0;

/**
 * Function to draw based on instructions
 *
 * @param {string} ins Instruction to draw
 */
function exec(ins) {
    const step = (1 << sz) * 256 / (1 << x);
    const dirs = [[0, -step], [step, 0], [0, step], [-step, 0]];
    let at = 0;
    let curr = [(1 << sz) * 128 / (1 << x), (1 << sz) * (512 - 128 / (1 << x))];
    for (let i = 0; i < ins.length; i++) {
        switch (ins.charAt(i)) {
        case 'f':
            stroke(64 * (color++)/pix_c, 32 * (color++)/pix_c, 16 * (color++)/pix_c);
            line(curr[0], curr[1], curr[0] + dirs[at][0], curr[1] + dirs[at][1]);
            curr[0] += dirs[at][0];
            curr[1] += dirs[at][1];
            break;

        case 'r':
            at = (at + 1) % 4;
            break;

        case 'l':
            at = (at + 3) % 4;
            break;

        case 'u':
            at = (at + 2) % 4;
            break;

        default:
            break;
        }
    }
}

function setup() {
    // console.log(hilbert(1));
    // console.log(hilbert(2));
    createCanvas((1 << sz) * 512, (1 << sz) * 512);
    background(255);
    exec(hilbert(x + 1));
}

!function() {
    this.setup = setup;
}();
