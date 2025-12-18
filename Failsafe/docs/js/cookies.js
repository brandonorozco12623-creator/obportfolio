// Cookie Consent Management

// Check if user has already made a choice
function checkCookieConsent() {
  const consent = localStorage.getItem('cookieConsent');
  const banner = document.getElementById('cookie-banner');
  
  if (consent === null && banner) {
    // Show banner if no choice has been made
    setTimeout(() => {
      banner.classList.add('show');
    }, 500);
  }
}

// Handle Accept button
const acceptBtn = document.getElementById('cookie-accept');
if (acceptBtn) {
  acceptBtn.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'accepted');
    hideBanner();
    // Here you can initialize analytics or other cookie-dependent features
    console.log('Cookies accepted');
  });
}

// Handle Decline button
const declineBtn = document.getElementById('cookie-decline');
if (declineBtn) {
  declineBtn.addEventListener('click', function() {
    localStorage.setItem('cookieConsent', 'declined');
    hideBanner();
    console.log('Cookies declined');
  });
}

// Hide banner with animation
function hideBanner() {
  const banner = document.getElementById('cookie-banner');
  if (banner) {
    banner.classList.remove('show');
    setTimeout(() => {
      banner.style.display = 'none';
    }, 400);
  }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', checkCookieConsent);
