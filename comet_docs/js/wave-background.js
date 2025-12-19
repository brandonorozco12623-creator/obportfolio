// Wave Grid Background Animation
let t = 0;
let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setup() {
  // Skip animation setup if user prefers reduced motion
  if (prefersReducedMotion) {
    noLoop();
    return;
  }
  
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('background-canvas');
  strokeWeight(1.5);
  stroke(255, 255, 255, 80);
  noFill();
  frameRate(15); // Reduced from 20 for better performance
  
  // Pause animation for maximum performance
  noLoop();
}

function draw() {
  background(10, 10, 15);
  translate(width / 2, height / 2);

  let spacing = 15;
  let horizontalCount = ceil(width / spacing) + 10;
  let verticalCount = ceil(height / spacing) + 10;

  for (let y = -verticalCount * spacing / 2; y <= verticalCount * spacing / 2; y += spacing) {
    beginShape();
    for (let x = -horizontalCount * spacing / 2; x <= horizontalCount * spacing / 2; x += spacing) {
      let dx = sin(x * 0.05 + t * 0.5) * 20;
      let dy = cos((x + y) * 0.02 + t) * 10;
      let offset = sin(t + x * 0.01) * 15;
      vertex(x + dx + offset, y + dy);
    }
    endShape();
  }

  t += 0.02;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
