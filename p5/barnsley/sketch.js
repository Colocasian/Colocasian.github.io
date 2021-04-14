function matrixTransform(mat, vec1, vecA) {
  let ans = [0, 0];
  ans[0] = mat[0][0] * vec1[0] + mat[0][1] * vec1[1] + vecA[0];
  ans[1] = mat[1][0] * vec1[0] + mat[1][1] * vec1[1] + vecA[1];
  return ans;
}

let mult = 1.2;
let timeMult = 1;
function setup() {
  frameRate(60);
  createCanvas(300 * mult, 600 * mult);
  background(255);
  stroke(79, 121, 66);
  strokeWeight(1);
}

let pos = [0, 0];

function draw() {
  translate(130 * mult, 550 * mult);
  for (let i = 0; i < 100 * timeMult; i++) {
    point(pos[0] * 50 * mult, -(pos[1] * 50 * mult));

    let matr;
    let add = [0.0, 1.6];

    let rand = Math.random();
    if (rand < 0.01) {
      matr = [
        [0.0, 0.0],
        [0.0, 0.16],
      ];
      add = [0, 0];
    } else if (rand < 0.86) {
      matr = [
        [0.85, 0.04],
        [-0.04, 0.85],
      ];
    } else if (rand < 0.93) {
      matr = [
        [0.2, -0.26],
        [0.23, 0.22],
      ];
    } else {
      matr = [
        [-0.15, 0.28],
        [0.26, 0.24],
      ];
      add = [0.0, 0.44];
    }

    pos = matrixTransform(matr, pos, add);
  }
}

!(function () {
  this.setup = setup;
  this.draw = draw;
})();
