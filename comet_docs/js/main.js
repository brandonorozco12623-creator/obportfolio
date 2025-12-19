// Main JavaScript - Fade-in animations and other enhancements

(function() {
  'use strict';
  
  // Add fade-in class to elements when they come into view
  function setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe link cards
    const linkCards = document.querySelectorAll('.platform-link');
    linkCards.forEach(card => {
      observer.observe(card);
    });
  }
  
  // Smooth scroll behavior is handled by CSS
  // But we can add additional enhancements here if needed
  
  // Initialize on DOM ready
  document.addEventListener('DOMContentLoaded', function() {
    // Setup intersection observer for fade-in animations
    setupIntersectionObserver();
    
    // Log that the site is ready
    console.log('comett! website loaded ✨');
  });
  
  // Handle external link tracking (only if analytics consent given)
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const consent = localStorage.getItem('cookieConsent');
      if (consent === 'accepted') {
        // Track external link click
        console.log('External link clicked:', this.href);
        // Add your analytics event tracking here
      }
    });
  });
  
})();
