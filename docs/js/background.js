// Animated Background - Floating Rectangles
// Native Canvas API - Optimized for Performance (No p5.js dependency)

(function() {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { alpha: false });
  const container = document.getElementById('canvas-container');
  
  if (!container) return;
  
  container.appendChild(canvas);
  
  let t = 0;
  let animationId;
  
  // Resize canvas to fill window
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Linear interpolation helper
  function lerp(start, end, amt) {
    return start + (end - start) * amt;
  }
  
  // Color interpolation helper
  function lerpColor(color1, color2, amt) {
    const r = Math.round(lerp(color1.r, color2.r, amt));
    const g = Math.round(lerp(color1.g, color2.g, amt));
    const b = Math.round(lerp(color1.b, color2.b, amt));
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  // Animation loop - optimized
  function draw() {
    // Dark background
    ctx.fillStyle = 'rgb(15, 15, 30)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Reduced to 20 rectangles (from 25) for better performance
    const steps = 20;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.lineWidth = 2;
    
    for (let i = 0; i < steps; i++) {
      const p = i / steps;
      const w = lerp(canvas.width * 1.4, 40, p);
      const h = lerp(canvas.height * 1.4, 40, p);
      const offset = Math.sin(t + p * 5) * 60;
      const rotation = Math.sin(t + p * 3) * 0.1;
      
      // Set stroke color
      const color1 = { r: 50, g: 60, b: 80 };
      const color2 = { r: 230, g: 230, b: 255 };
      ctx.strokeStyle = lerpColor(color1, color2, p);
      
      // Save context state
      ctx.save();
      
      // Transform
      ctx.translate(centerX + offset, centerY + offset);
      ctx.rotate(rotation);
      
      // Draw rectangle centered
      ctx.strokeRect(-w / 2, -h / 2, w, h);
      
      // Restore context state
      ctx.restore();
    }
    
    // Slower animation speed for reduced CPU usage
    t += 0.003;
    
    // Continue animation loop
    animationId = requestAnimationFrame(draw);
  }
  
  // Initialize
  resizeCanvas();
  
  // Handle window resize with debouncing
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 100);
  });
  
  // Start animation
  draw();
  
  // Pause animation when tab is not visible (performance optimization)
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else {
      if (!animationId) {
        draw();
      }
    }
  });
})();
