// Hero Shader Pattern by SamuelYAN

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
    // Reduced from 2 to 1 iteration for better performance
    for (int i = 0; i < 1; i++) {
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

let heroShaderCanvas;
let theShader;

// Wait for p5.js and DOM to be ready
function setupHeroPattern() {
  let heroSection = document.querySelector('.hero');
  if (!heroSection) {
    console.error('Hero section not found');
    return;
  }

  let heroWidth = heroSection.offsetWidth;
  let heroHeight = heroSection.offsetHeight;

  heroShaderCanvas = createCanvas(heroWidth, heroHeight, WEBGL);
  heroShaderCanvas.parent('hero-shader-canvas');
  
  theShader = createShader(vert, frag);
  shader(theShader);
  noStroke();
}

function drawHeroPattern() {
  if (!theShader) return;
  
  theShader.setUniform("u_resolution", [width, height]);
  theShader.setUniform("u_time", millis() / 1000.0);
  
  rect(0, 0, width, height);
}

function windowResized() {
  let heroSection = document.querySelector('.hero');
  if (heroSection && heroShaderCanvas) {
    let heroWidth = heroSection.offsetWidth;
    let heroHeight = heroSection.offsetHeight;
    resizeCanvas(heroWidth, heroHeight);
  }
}

// Create instance mode to avoid conflicts
new p5(function(p) {
  p.setup = function() {
    // Check for reduced motion preference
    let prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    let heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    let heroWidth = heroSection.offsetWidth;
    let heroHeight = heroSection.offsetHeight;

    let canvas = p.createCanvas(heroWidth, heroHeight, p.WEBGL);
    canvas.parent('hero-shader-canvas');
    
    theShader = p.createShader(vert, frag);
    p.shader(theShader);
    p.noStroke();
    p.frameRate(30); // Limit frame rate for better performance
    
    // Pause animation for maximum performance
    p.noLoop();
  };

  p.draw = function() {
    if (!theShader) return;
    
    theShader.setUniform("u_resolution", [p.width, p.height]);
    theShader.setUniform("u_time", p.millis() / 1000.0);
    
    p.rect(0, 0, p.width, p.height);
  };

  p.windowResized = function() {
    let heroSection = document.querySelector('.hero');
    if (heroSection) {
      let heroWidth = heroSection.offsetWidth;
      let heroHeight = heroSection.offsetHeight;
      p.resizeCanvas(heroWidth, heroHeight);
    }
  };
});
