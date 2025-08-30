// Contact form handler for Web3Forms
// Completely FREE with unlimited submissions - Works with GitHub Pages

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.php-email-form');
    
    // Test function to verify form is working
    function testFormConnection() {
        console.log('🔍 Testing form connection...');
        console.log('Form found:', !!contactForm);
        if (contactForm) {
            console.log('Form action:', contactForm.action);
            console.log('Form method:', contactForm.method);
            console.log('Form fields found:', contactForm.querySelectorAll('input, textarea').length);
        }
    }
    
    // Run test on page load
    testFormConnection();
    
    if (contactForm) {
        // Web3Forms configuration
        contactForm.action = 'https://api.web3forms.com/submit';
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
                         // Get form data
             const formData = new FormData(this);
             const name = formData.get('name');
             const email = formData.get('email');
             const subject = formData.get('subject');
             const message = formData.get('message');
             
                          // Ensure subject is properly set for Web3Forms
             formData.set('subject', subject || 'Contact Form Submission');
             
             // Debug: Log what we're sending
             console.log('📧 Form data being sent:', {
                 name: name,
                 email: email,
                 subject: subject,
                 message: message
             });
             
             // Validate form data
            if (!name || !email || !subject || !message) {
                showMessage('error', 'Please fill in all fields');
                return;
            }
            
            if (!isValidEmail(email)) {
                showMessage('error', 'Please enter a valid email address');
                return;
            }
            
            // Show loading state
            showLoading(true);
            
            // Send to Web3Forms
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
                         .then(response => {
                 console.log('Response status:', response.status);
                 if (!response.ok) {
                     throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                 }
                 return response.json();
             })
             .then(data => {
                 showLoading(false);
                 console.log('Web3Forms Response:', data);
                 console.log('Response details:', {
                     success: data.success,
                     message: data.message,
                     email: data.email,
                     timestamp: data.timestamp
                 });
                 
                 if (data.success) {
                     showMessage('success', 'Your message has been sent. Thank you!');
                     contactForm.reset();
                     console.log('✅ Email sent successfully!');
                     console.log('📧 Check your email at: president@ebytestechnology.com');
                     console.log('📧 Also check spam/junk folder!');
                 } else {
                     // Handle spam detection
                     if (data.message && data.message.includes('spam')) {
                         showMessage('error', 'Message was flagged as spam. Please try again with different content or contact us directly.');
                         console.error('❌ Spam detected:', data.message);
                     } else {
                         showMessage('error', 'Failed to send message. Please try again.');
                         console.error('❌ Web3Forms Error:', data);
                     }
                 }
             })
            .catch(error => {
                showLoading(false);
                showMessage('error', 'An error occurred. Please try again.');
                console.error('Network Error:', error);
            });
        });
    }
    
    function showLoading(show) {
        const loadingDiv = document.querySelector('.loading');
        const submitButton = document.querySelector('button[type="submit"]');
        
        if (loadingDiv) {
            loadingDiv.style.display = show ? 'block' : 'none';
        }
        
        if (submitButton) {
            submitButton.disabled = show;
        }
    }
    
    function showMessage(type, message) {
        const errorDiv = document.querySelector('.error-message');
        const successDiv = document.querySelector('.sent-message');
        
        // Hide all message divs
        if (errorDiv) errorDiv.style.display = 'none';
        if (successDiv) successDiv.style.display = 'none';
        
        // Show appropriate message
        if (type === 'error' && errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        } else if (type === 'success' && successDiv) {
            successDiv.textContent = message;
            successDiv.style.display = 'block';
        }
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
