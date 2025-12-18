// Zapier Contact Form Integration
// This script handles form submission to Zapier webhook

// CONFIGURATION: Replace this URL with your actual Zapier webhook URL
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/25749245/ua9hmdy/';

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('zapier-contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const formStatus = document.getElementById('form-status');
    
    if (!form) return;
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Disable submit button during submission
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        formStatus.textContent = '';
        formStatus.className = 'form-status';
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            company: document.getElementById('company').value.trim(),
            message: document.getElementById('message').value.trim(),
            timestamp: new Date().toISOString(),
            source: 'Portfolio Website - Contact Form'
        };
        
        // Validate email format
        if (!validateEmail(formData.email)) {
            showStatus('Please enter a valid email address.', 'error');
            resetButton();
            return;
        }
        
        // Check if webhook URL is configured
        if (ZAPIER_WEBHOOK_URL === 'YOUR_ZAPIER_WEBHOOK_URL_HERE') {
            console.warn('Zapier webhook URL not configured');
            showStatus('Configuration required. Please contact the administrator.', 'error');
            resetButton();
            return;
        }
        
        try {
            // Send data to Zapier webhook
            const response = await fetch(ZAPIER_WEBHOOK_URL, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                form.reset();
                
                // Optional: Track form submission (Google Analytics, etc.)
                if (typeof gtag !== 'undefined') {
                    gtag('event', 'form_submission', {
                        event_category: 'Contact',
                        event_label: 'Zapier Form'
                    });
                }
            } else {
                throw new Error('Network response was not ok');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showStatus('Something went wrong. Please try again or email me directly.', 'error');
        }
        
        resetButton();
    });
    
    function showStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `form-status form-status-${type}`;
    }
    
    function resetButton() {
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }, 1000);
    }
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Add real-time email validation feedback
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value && !validateEmail(this.value)) {
                this.classList.add('input-error');
                this.setAttribute('aria-invalid', 'true');
            } else {
                this.classList.remove('input-error');
                this.setAttribute('aria-invalid', 'false');
            }
        });
    }
});
