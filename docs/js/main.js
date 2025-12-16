// Main JavaScript - Additional Functionality

// Intersection Observer for fade-in animations (optional enhancement)
// Removed initial opacity: 0 to prevent invisible sections if JS fails
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, observerOptions);

// Observe sections for subtle fade-in effect
document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Form validation (ready for Sprint 2 contact form)
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Console log for development
console.log('Brandon Orozco - AI Consultant Portfolio');
console.log('Notan-Swiss Design System Active');
console.log('Navigation: Loaded');

// Accessibility: Alert screen readers when navigation state changes
const announceToScreenReader = (message) => {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.classList.add('sr-only');
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

// Screen reader only utility class
const style = document.createElement('style');
style.textContent = `
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;
document.head.appendChild(style);

// Performance: Log page load time
window.addEventListener('load', () => {
  const loadTime = performance.now();
  console.log(`Page loaded in ${Math.round(loadTime)}ms`);
});
