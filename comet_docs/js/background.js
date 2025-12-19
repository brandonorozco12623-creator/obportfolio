// Background Wave Animation + Hero Shader
let t = 0;
let heroShader;
let heroGraphics;

// Shader code
const vert = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;

void main() {
  vec4 positionVec4 = vec4(aPosition, 1.0);
  positionVec4.xy = positionVec4.xy * 2.0 - 1.0;
  gl_Position = positionVec4;
}
`;

const frag = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0/1. - 2.0 * f/1.);
    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.25;
    for (int i = 0; i < 2; i++) {
        value += amplitude * noise(p);
        p *= 1.25;
        amplitude *= 0.125;
    }
    return value;
}

float contourLines(float v, float frequency, float line_thickness) {
    float lines = abs(fract(v * frequency) - 0.299);
    return smoothstep(0.5 - line_thickness, 0.499 + line_thickness, lines);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * -4.0 - 10.0; 
    uv.x *= u_resolution.x / u_resolution.y;

    vec2 warp1 = vec2(
        noise(uv * 1.0 + vec2(u_time * 1.3, u_time * 0.2)),
        noise(uv * 120.0/1. + vec2(-u_time * 0.4, u_time * 0.2))
    );
    vec2 uv2 = uv + (warp1 - 0.25) * 0.6;

    vec2 warp2 = vec2(
        noise(uv2 * 1. + vec2(-u_time * 0.6, u_time * 0.4)),
        noise(uv2 * 190.0/1. + vec2(u_time * 2.5, u_time * 0.3))
    );
    vec2 uvFinal = uv2 + (warp2 - 1.5) / 0.995;

    vec2 flow = uvFinal + vec2(u_time * 0.26, u_time * 0.1);
    float n = fbm(flow);

    float n1 = fbm(flow + vec2(0.001, 0.0));
    float n2 = fbm(flow + vec2(0.0, 0.001));
    float grad = length(vec2(n1 - n, n2 - n));
    float edge = smoothstep(0.02, 0.2, grad);

    float frequency = sin(u_time*0.1) * 10.0/2.+10./1.;        
    float thickness = 0.125;          
    float lines = contourLines(n, frequency, thickness);

    float finalVal = mix(lines/.99, 1.0/.01, edge * 0.9);

    gl_FragColor = vec4(vec3(finalVal/1.), 1.0);
}
`;

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('background-canvas');
  strokeWeight(1.5);
  stroke(255, 255, 255, 80);
  noFill();
  frameRate(20);
  
  // Create hero shader graphics
  let heroSection = document.querySelector('.hero');
  if (heroSection) {
    let heroWidth = heroSection.offsetWidth;
    let heroHeight = heroSection.offsetHeight;
    
    heroGraphics = createGraphics(heroWidth, heroHeight, WEBGL);
    heroShader = heroGraphics.createShader(vert, frag);
    heroGraphics.shader(heroShader);
    
    // Append hero canvas to hero-shader-canvas div
    let heroContainer = document.getElementById('hero-shader-canvas');
    if (heroContainer) {
      heroContainer.appendChild(heroGraphics.canvas);
    }
  }
}

function draw() {
  // Background wave animation
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
  
  // Hero shader animation
  if (heroShader && heroGraphics) {
    heroShader.setUniform("u_resolution", [heroGraphics.width, heroGraphics.height]);
    heroShader.setUniform("u_time", millis() / 1000.0);
    heroGraphics.rect(0, 0, heroGraphics.width, heroGraphics.height);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  
  // Resize hero shader
  let heroSection = document.querySelector('.hero');
  if (heroSection && heroGraphics) {
    let heroWidth = heroSection.offsetWidth;
    let heroHeight = heroSection.offsetHeight;
    heroGraphics.resizeCanvas(heroWidth, heroHeight);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
