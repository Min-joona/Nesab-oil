// Nesab Vehicle Oils - Contact Page JavaScript
// Handles multi-step form, FAQ interactions, and service integration

// Form state management
let currentStep = 1;
const totalSteps = 3;

// Initialize contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeContactPage();
    initializeFAQ();
    setupFormSubmission();
    initializeServiceIntegration();
});

/**
 * Initialize contact page with data from URL parameters and localStorage
 */
function initializeContactPage() {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Handle service type from URL
    const serviceParam = urlParams.get('service');
    if (serviceParam) {
        const serviceMap = {
            'consultation': 'technical-consultation',
            'oil-analysis': 'oil-analysis',
            'training': 'training'
        };
        const serviceTypeField = document.querySelector('select[name="serviceType"]');
        if (serviceTypeField && serviceMap[serviceParam]) {
            serviceTypeField.value = serviceMap[serviceParam];
            showNotification(`Service inquiry loaded: ${serviceMap[serviceParam].replace('-', ' ')}`, 'info');
        }
    }
    
    // Handle fleet inquiry
    if (urlParams.get('fleet') === 'true') {
        const serviceTypeField = document.querySelector('select[name="serviceType"]');
        if (serviceTypeField) serviceTypeField.value = 'fleet-management';
        showNotification('Fleet inquiry loaded. Please complete the form.', 'info');
    }
    
    // Handle quote request
    if (urlParams.get('quote') === 'true') {
        const serviceTypeField = document.querySelector('select[name="serviceType"]');
        if (serviceTypeField) serviceTypeField.value = 'bulk-order';
        showNotification('Quote request loaded. Please complete the form.', 'info');
    }
    
    // Load data from localStorage
    loadServiceDataFromStorage();
}

/**
 * Load and apply service data from localStorage
 */
function loadServiceDataFromStorage() {
    // Service type from services page
    const serviceType = localStorage.getItem('serviceType');
    if (serviceType) {
        const serviceMap = {
            'consultation': 'technical-consultation',
            'oil-analysis': 'oil-analysis',
            'training': 'training'
        };
        const serviceTypeField = document.querySelector('select[name="serviceType"]');
        if (serviceTypeField) {
            serviceTypeField.value = serviceMap[serviceType] || '';
        }
        localStorage.removeItem('serviceType');
    }
    
    // Fleet data from calculator
    const fleetData = localStorage.getItem('fleetData');
    if (fleetData) {
        try {
            const data = JSON.parse(fleetData);
            const fleetSizeField = document.querySelector('select[name="fleetSize"]');
            const serviceTypeField = document.querySelector('select[name="serviceType"]');
            
            // Auto-select fleet size based on vehicle count
            if (data.vehicles && fleetSizeField) {
                const vehicles = parseInt(data.vehicles);
                if (vehicles <= 5) fleetSizeField.value = '1-5';
                else if (vehicles <= 20) fleetSizeField.value = '6-20';
                else if (vehicles <= 50) fleetSizeField.value = '21-50';
                else if (vehicles <= 100) fleetSizeField.value = '51-100';
                else fleetSizeField.value = '100+';
            }
            
            if (serviceTypeField) serviceTypeField.value = 'fleet-management';
            
            // Add fleet details to message
            setTimeout(() => {
                const messageField = document.querySelector('textarea[name="message"]');
                if (messageField && !messageField.value.includes('Fleet Details:')) {
                    messageField.value = `Fleet Details: ${data.vehicles} vehicles, change frequency: ${data.frequency} months\n\n${messageField.value}`;
                }
            }, 500);
            
        } catch (e) {
            console.warn('Failed to parse fleet data:', e);
        }
        localStorage.removeItem('fleetData');
    }
    
    // Delivery zone
    const deliveryZone = localStorage.getItem('deliveryZone');
    if (deliveryZone) {
        const deliveryLocationField = document.querySelector('input[name="deliveryLocation"]');
        if (deliveryLocationField) {
            // Capitalize first letter
            deliveryLocationField.value = deliveryZone.charAt(0).toUpperCase() + deliveryZone.slice(1);
        }
        localStorage.removeItem('deliveryZone');
    }
}

/**
 * Initialize FAQ accordion interactions
 */
function initializeFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const icon = this.querySelector('svg');
            
            if (!answer || !icon) return;
            
            // Toggle answer visibility
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                icon.style.transform = 'rotate(180deg)';
            } else {
                answer.classList.add('hidden');
                icon.style.transform = 'rotate(0deg)';
            }
        });
    });
}

/**
 * Navigate to next form step with validation
 */
function nextStep() {
    if (!validateCurrentStep()) return;
    
    if (currentStep < totalSteps) {
        // Hide current step
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
        }
        
        // Show next step
        currentStep++;
        const nextStepElement = document.getElementById(`step-${currentStep}`);
        if (nextStepElement) {
            nextStepElement.classList.add('active');
        }
        
        updateProgress();
    }
}

/**
 * Navigate to previous form step
 */
function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        const currentStepElement = document.getElementById(`step-${currentStep}`);
        if (currentStepElement) {
            currentStepElement.classList.remove('active');
        }
        
        // Show previous step
        currentStep--;
        const prevStepElement = document.getElementById(`step-${currentStep}`);
        if (prevStepElement) {
            prevStepElement.classList.add('active');
        }
        
        updateProgress();
    }
}

/**
 * Update progress bar and step counter
 */
function updateProgress() {
    const progressPercent = (currentStep / totalSteps) * 100;
    
    const currentStepSpan = document.getElementById('current-step');
    if (currentStepSpan) currentStepSpan.textContent = currentStep;
    
    const progressPercentSpan = document.getElementById('progress-percent');
    if (progressPercentSpan) progressPercentSpan.textContent = Math.round(progressPercent);
    
    const progressFill = document.getElementById('progress-fill');
    if (progressFill) progressFill.style.width = `${progressPercent}%`;
}

/**
 * Validate current step's required fields
 * @returns {boolean} - Validation status
 */
function validateCurrentStep() {
    const currentStepElement = document.getElementById(`step-${currentStep}`);
    if (!currentStepElement) return false;
    
    const requiredFields = currentStepElement.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ef4444';
            isValid = false;
            
            // Reset border after delay
            setTimeout(() => {
                field.style.borderColor = 'rgba(156, 163, 175, 0.3)';
            }, 3000);
        } else {
            field.style.borderColor = 'rgba(156, 163, 175, 0.3)';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

/**
 * Setup form submission handler
 */
function setupFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateCurrentStep()) return;
        
        const submitBtn = this.querySelector('button[type="submit"]');
        if (!submitBtn) return;
        
        // Show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        
        // Simulate form submission
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            
            showNotification('Message sent successfully! We\'ll contact you within 24 hours.', 'success');
            
            // Reset form and steps
            this.reset();
            currentStep = 1;
            
            document.querySelectorAll('.form-step').forEach(step => {
                step.classList.remove('active');
            });
            
            const firstStep = document.getElementById('step-1');
            if (firstStep) firstStep.classList.add('active');
            
            updateProgress();
        }, 2000);
    });
}

/**
 * Open location in Google Maps
 */
function openDirections() {
    const address = "Bole Road, Addis Ababa, Ethiopia";
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
}

/**
 * Initialize service integration handlers
 */
function initializeServiceIntegration() {
    // Add any service-specific initialization here
    // Currently handled by loadServiceDataFromStorage()
}

// Export functions for global access (used by inline onclick handlers)
window.nextStep = nextStep;
window.prevStep = prevStep;
window.openDirections = openDirections;