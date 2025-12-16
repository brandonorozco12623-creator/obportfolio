// Page Transition Animations
document.addEventListener('DOMContentLoaded', () => {
  // Fade in page content on load
  document.body.style.opacity = '0';
  
  // Trigger fade in after a brief delay
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    document.body.style.opacity = '1';
  }, 50);
  
  // Handle all internal links with fade transition
  const links = document.querySelectorAll('a[href^="index.html"], a[href^="contact.html"], a[href="/"], a[href="index.html"], a[href="contact.html"]');
  
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      
      // Only animate if it's a different page
      if (href && !href.startsWith('#')) {
        e.preventDefault();
        
        // Fade out
        document.body.style.transition = 'opacity 0.3s ease-in-out';
        document.body.style.opacity = '0';
        
        // Navigate after fade out
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
});
