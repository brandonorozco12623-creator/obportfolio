// Animated Background - Floating Rectangles
// Slowed down substantially to reduce visual noise

let t = 0;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  rectMode(CENTER);
  noFill();
  strokeWeight(2);
  frameRate(30); // Reduced from default 60fps
}

function draw() {
  background(15, 15, 30); // dark ambience

  const steps = 25; // number of rectangles to draw
  for (let i = 0; i < steps; i++) {
    let p = i / steps;
    let w = lerp(width * 1.4, 40, p);
    let h = lerp(height * 1.4, 40, p);
    let offset = sin(t + p * 5) * 60; // offset to create drifting spaces

    push();
    translate(width / 2 + offset, height / 2 + offset);
    rotate(sin(t + p * 3) * 0.1);
    stroke(lerpColor(color(50, 60, 80), color(230, 230, 255), p));
    rect(0, 0, w, h);
    pop();
  }

  t += 0.003; // Slowed down substantially from 0.01 to 0.003 (70% slower)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
