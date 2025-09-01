// Contact form handler for Web3Forms
// Completely FREE with unlimited submissions - Works with GitHub Pages

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.php-email-form');
    
    // Web3Forms Access Key - Replace with your actual key from web3forms.com
    const WEB3FORMS_ACCESS_KEY = 'd4bb06a9-8264-4177-91ed-9e68fd9dbb52';
    
    // Test function to verify form is working
    function testFormConnection() {
        console.log('🔍 Testing form connection...');
        console.log('Form found:', !!contactForm);
        if (contactForm) {
            console.log('Form action:', contactForm.action);
            console.log('Form method:', contactForm.method);
            console.log('Form fields found:', contactForm.querySelectorAll('input, textarea').length);
            console.log('Access key configured:', !!WEB3FORMS_ACCESS_KEY);
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
            
            // Add required Web3Forms parameters
            formData.set('access_key', WEB3FORMS_ACCESS_KEY);
            formData.set('from_name', 'eBytes Technology Contact Form');
            
            // Use subject directly from input
            const cleanSubject = subject || 'New Contact Form Submission';
            formData.set('subject', cleanSubject);
            
            // Ensure message has meaningful content
            if (!message || message.trim().length < 10) {
                showMessage('error', 'Please provide a detailed message (at least 10 characters)');
                return;
            }
            
            // Debug: Log what we're sending
            console.log('📧 Form data being sent:', {
                access_key: WEB3FORMS_ACCESS_KEY,
                name: name,
                email: email,
                subject: cleanSubject,
                message: message
            });
            
            // Validate form data
            if (!name || !email || !cleanSubject || !message) {
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
                console.log('Success value:', data.success, 'Type:', typeof data.success);
                
                // Check for success in the response - Web3Forms returns success: true
                if (data.success === true || data.success === "true" || data.success === 1) {
                    console.log('✅ Success detected, showing success message');
                    showMessage('success', 'Your message has been sent. Thank you!');
                    contactForm.reset();
                    console.log('✅ Email sent successfully!');
                    console.log('📧 Check your email at: president@ebytestechnology.com');
                    console.log('📧 Also check spam/junk folder!');
                } else {
                    console.log('❌ Success not detected, showing error message');
                    // Handle different error cases
                    if (data.message && data.message.includes('spam')) {
                        showMessage('error', 'Message was flagged as spam. Please try again with different content or contact us directly.');
                        console.error('❌ Spam detected:', data.message);
                    } else if (data.message) {
                        showMessage('error', data.message);
                        console.error('❌ Web3Forms Error:', data.message);
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
