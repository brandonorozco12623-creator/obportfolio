// Navigation Functionality - Mobile Menu Toggle

class Navigation {
  constructor() {
    this.nav = document.querySelector('.nav');
    this.navToggle = document.querySelector('.nav-toggle');
    this.navMenu = document.querySelector('.nav-menu');
    this.navLinks = document.querySelectorAll('.nav-link');
    
    this.init();
  }
  
  init() {
    // Mobile menu toggle
    if (this.navToggle) {
      this.navToggle.addEventListener('click', () => this.toggleMenu());
    }
    
    // Close menu when clicking nav links
    this.navLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.nav.contains(e.target) && this.navMenu.classList.contains('active')) {
        this.closeMenu();
      }
    });
    
    // Handle scroll behavior
    this.handleScroll();
    window.addEventListener('scroll', () => this.handleScroll());
    
    // Set active link based on scroll position
    this.setActiveLink();
    window.addEventListener('scroll', () => this.setActiveLink());
  }
  
  toggleMenu() {
    const isExpanded = this.navToggle.getAttribute('aria-expanded') === 'true';
    
    this.navToggle.setAttribute('aria-expanded', !isExpanded);
    this.navToggle.classList.toggle('active');
    this.navMenu.classList.toggle('active');
    
    // Prevent body scroll when menu is open on mobile
    if (window.innerWidth <= 768) {
      document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }
  }
  
  closeMenu() {
    this.navToggle.setAttribute('aria-expanded', 'false');
    this.navToggle.classList.remove('active');
    this.navMenu.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  handleScroll() {
    // Hide nav on scroll down, show on scroll up
    let lastScroll = 0;
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      this.nav.style.transform = 'translateY(0)';
      return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
      // Scrolling down - hide nav
      this.nav.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up - show nav
      this.nav.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
  }
  
  setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        this.navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new Navigation());
} else {
  new Navigation();
}
