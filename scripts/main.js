// Nesab Vehicle Oil - Main JavaScript

// Global variables
let oilFinderData = {
    vehicleType: '',
    fuelType: '',
    usage: ''
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeOilFinder();
    initializeProductCarousel();
    initializeScrollAnimations();
    initializeViscosityCalculator();
    
    // Initialize language system
    if (window.LanguageSystem) {
        window.LanguageSystem.initializeLanguageSwitcher();
    }
});

// Navigation functionality
function initializeNavigation() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
}

// Oil Finder Tool
function initializeOilFinder() {
    // Vehicle type selection
    document.querySelectorAll('.vehicle-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            oilFinderData.vehicleType = this.dataset.type;
            nextOilFinderStep(2);
        });
    });
    
    // Fuel type selection
    document.querySelectorAll('.fuel-type-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            oilFinderData.fuelType = this.dataset.fuel;
            nextOilFinderStep(3);
        });
    });
    
    // Usage selection
    document.querySelectorAll('.usage-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            oilFinderData.usage = this.dataset.usage;
            showOilFinderResults();
        });
    });
}

function nextOilFinderStep(stepNumber) {
    // Hide current step
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show next step
    setTimeout(() => {
        document.getElementById(`step-${stepNumber}`).classList.add('active');
    }, 200);
}

function showOilFinderResults() {
    // Hide current step
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Generate recommendation
    const recommendation = generateOilRecommendation(oilFinderData);
    
    // Display results
    const resultContainer = document.getElementById('recommendation-result');
    resultContainer.innerHTML = `
        <div class="bg-gray-700 rounded-lg p-4 mb-4">
            <div class="flex items-center mb-3">
                <div class="text-3xl mr-3">${recommendation.icon}</div>
                <div>
                    <h5 class="font-bold text-lg">${recommendation.name}</h5>
                    <p class="text-sm text-gray-400">${recommendation.type}</p>
                </div>
            </div>
            <div class="space-y-2 text-sm">
                <div><strong>Viscosity:</strong> ${recommendation.viscosity}</div>
                <div><strong>Specifications:</strong> ${recommendation.specs}</div>
                <div><strong>Price:</strong> <span class="copper-accent">${recommendation.price}</span></div>
            </div>
            <p class="text-sm text-gray-300 mt-3">${recommendation.description}</p>
        </div>
        <button onclick="addToQuote('${recommendation.id}')" class="w-full bg-copper text-white px-4 py-2 rounded-lg hover:bg-opacity-80 transition-all">
            Add to Quote
        </button>
    `;
    
    // Show results step
    setTimeout(() => {
        document.getElementById('step-results').classList.add('active');
    }, 200);
}

function generateOilRecommendation(data) {
    const recommendations = {
        car: {
            gasoline: {
                city: {
                    name: '5W-30 Full Synthetic',
                    type: 'Premium Synthetic Engine Oil',
                    viscosity: '5W-30',
                    specs: 'API SP, ILSAC GF-6A',
                    price: 'ETB 450/liter',
                    description: 'Perfect for modern gasoline engines with excellent fuel economy and wear protection.',
                    icon: '🚗',
                    id: '5w30-synth'
                },
                highway: {
                    name: '5W-30 Full Synthetic',
                    type: 'High-Performance Synthetic Oil',
                    viscosity: '5W-30',
                    specs: 'API SP, ILSAC GF-6A',
                    price: 'ETB 450/liter',
                    description: 'Excellent high-temperature stability for extended highway driving.',
                    icon: '🚗',
                    id: '5w30-synth'
                },
                heavy: {
                    name: '10W-40 Semi-Synthetic',
                    type: 'Heavy Duty Engine Oil',
                    viscosity: '10W-40',
                    specs: 'API SN, ACEA A3/B4',
                    price: 'ETB 380/liter',
                    description: 'Enhanced protection for demanding driving conditions and heavier loads.',
                    icon: '🚗',
                    id: '10w40-semi'
                },
                mixed: {
                    name: '5W-40 Full Synthetic',
                    type: 'Premium Synthetic Engine Oil',
                    viscosity: '5W-40',
                    specs: 'API SP, ACEA A3/B4',
                    price: 'ETB 480/liter',
                    description: 'Versatile synthetic oil for mixed driving conditions and temperature ranges.',
                    icon: '🚗',
                    id: '5w40-synth'
                }
            },
            diesel: {
                city: {
                    name: '5W-30 Diesel Synthetic',
                    type: 'Light Duty Diesel Oil',
                    viscosity: '5W-30',
                    specs: 'API CK-4, ACEA C3',
                    price: 'ETB 460/liter',
                    description: 'Low-SAPS synthetic diesel oil for modern diesel engines with DPF.',
                    icon: '🚗',
                    id: '5w30-diesel'
                },
                highway: {
                    name: '15W-40 Diesel Oil',
                    type: 'Heavy Duty Diesel Engine Oil',
                    viscosity: '15W-40',
                    specs: 'API CK-4, ACEA E7',
                    price: 'ETB 380/liter',
                    description: 'Proven diesel engine oil for highway and commercial applications.',
                    icon: '🚗',
                    id: '15w40-diesel'
                },
                heavy: {
                    name: '15W-40 Heavy Duty',
                    type: 'Commercial Diesel Oil',
                    viscosity: '15W-40',
                    specs: 'API CK-4, ACEA E9',
                    price: 'ETB 400/liter',
                    description: 'Maximum protection for heavy-duty applications and severe service.',
                    icon: '🚗',
                    id: '15w40-heavy'
                },
                mixed: {
                    name: '10W-40 Diesel Synthetic',
                    type: 'Synthetic Diesel Blend',
                    viscosity: '10W-40',
                    specs: 'API CK-4, ACEA E6',
                    price: 'ETB 420/liter',
                    description: 'Balanced synthetic blend for mixed diesel operating conditions.',
                    icon: '🚗',
                    id: '10w40-diesel'
                }
            }
        },
        truck: {
            diesel: {
                city: {
                    name: '15W-40 Commercial',
                    type: 'Commercial Vehicle Oil',
                    viscosity: '15W-40',
                    specs: 'API CK-4, ACEA E9',
                    price: 'ETB 400/liter',
                    description: 'Designed for commercial vehicles operating in urban environments.',
                    icon: '🚛',
                    id: '15w40-commercial'
                },
                highway: {
                    name: '15W-40 Fleet Oil',
                    type: 'Fleet Engine Oil',
                    viscosity: '15W-40',
                    specs: 'API CK-4, ACEA E7',
                    price: 'ETB 390/liter',
                    description: 'Economical fleet oil for long-haul and highway operations.',
                    icon: '🚛',
                    id: '15w40-fleet'
                },
                heavy: {
                    name: '20W-50 Heavy Duty',
                    type: 'Extreme Duty Oil',
                    viscosity: '20W-50',
                    specs: 'API CK-4, ACEA E7',
                    price: 'ETB 420/liter',
                    description: 'Maximum protection for heavy loads and severe operating conditions.',
                    icon: '🚛',
                    id: '20w50-heavy'
                },
                mixed: {
                    name: '15W-40 All-Purpose',
                    type: 'Multi-Purpose Diesel Oil',
                    viscosity: '15W-40',
                    specs: 'API CK-4, ACEA E9',
                    price: 'ETB 400/liter',
                    description: 'Versatile diesel oil suitable for mixed commercial vehicle operations.',
                    icon: '🚛',
                    id: '15w40-mixed'
                }
            }
        }
        // Add more vehicle types as needed
    };
    
    // Default recommendation if no specific match
    const defaultRec = {
        name: '15W-40 Multi-Grade',
        type: 'Universal Engine Oil',
        viscosity: '15W-40',
        specs: 'API SN/CF',
        price: 'ETB 350/liter',
        description: 'Relable multi-grade oil suitable for most engines and operating conditions.',
        icon: '🔧',
        id: '15w40-universal'
    };
    
    // Try to get specific recommendation, fallback to default
    try {
        return recommendations[data.vehicleType][data.fuelType][data.usage] || defaultRec;
    } catch (e) {
        return defaultRec;
    }
}

function resetOilFinder() {
    oilFinderData = {
        vehicleType: '',
        fuelType: '',
        usage: ''
    };
    
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show first step
    setTimeout(() => {
        document.getElementById('step-1').classList.add('active');
    }, 200);
}

function scrollToOilFinder() {
    document.querySelector('.oil-finder').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
}

// Product Carousel
function initializeProductCarousel() {
    const carousel = document.getElementById('product-carousel');
    if (carousel) {
        new Splide('#product-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                768: {
                    perPage: 1,
                    gap: '1rem'
                },
                1024: {
                    perPage: 2
                }
            }
        }).mount();
    }
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

// Viscosity Calculator
function initializeViscosityCalculator() {
    // Calculator is initialized, functionality handled by calculateViscosity function
}

function calculateViscosity() {
    const tempMin = parseInt(document.getElementById('temp-min').value);
    const tempMax = parseInt(document.getElementById('temp-max').value);
    const usageType = document.getElementById('usage-type').value;
    
    // Calculate recommended viscosity based on temperature range and usage
    const recommendation = getViscosityRecommendation(tempMin, tempMax, usageType);
    
    // Display results
    const resultDiv = document.getElementById('viscosity-result');
    const gradeDiv = document.getElementById('viscosity-grade');
    const explanationDiv = document.getElementById('viscosity-explanation');
    
    gradeDiv.textContent = recommendation.grade;
    explanationDiv.textContent = recommendation.explanation;
    
    resultDiv.classList.remove('hidden');
    
    // Animate result appearance
    anime({
        targets: resultDiv,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 500,
        easing: 'easeOutQuad'
    });
}

function getViscosityRecommendation(tempMin, tempMax, usageType) {
    // Viscosity recommendation logic based on temperature and usage
    let grade, explanation;
    
    if (tempMin < -20) {
        // Very cold conditions
        if (usageType === 'heavy') {
            grade = '0W-40';
            explanation = 'Extreme cold start protection with high-temperature stability for heavy loads.';
        } else {
            grade = '0W-30';
            explanation = 'Maximum cold-flow performance for extreme winter conditions.';
        }
    } else if (tempMin < 0) {
        // Cold conditions
        if (usageType === 'heavy') {
            grade = '5W-40';
            explanation = 'Excellent cold start with enhanced protection for demanding conditions.';
        } else {
            grade = '5W-30';
            explanation = 'Optimal balance of cold-start performance and fuel efficiency.';
        }
    } else if (tempMax > 40) {
        // Hot conditions
        if (usageType === 'heavy') {
            grade = '15W-50';
            explanation = 'Maximum high-temperature protection for severe service conditions.';
        } else {
            grade = '10W-40';
            explanation = 'Enhanced thermal stability for hot climate operation.';
        }
    } else {
        // Moderate conditions
        if (usageType === 'heavy') {
            grade = '10W-40';
            explanation = 'Extra protection for heavy loads and demanding driving conditions.';
        } else if (usageType === 'highway') {
            grade = '5W-30';
            explanation = 'Fuel-efficient formula optimized for highway driving.';
        } else {
            grade = '5W-30';
            explanation = 'Versatile all-season oil suitable for mixed driving conditions.';
        }
    }
    
    return { grade, explanation };
}

// Add to Quote functionality
function addToQuote(productId) {
    // Get existing quote items from localStorage
    let quoteItems = JSON.parse(localStorage.getItem('nesabQuote') || '[]');
    
    // Add new item if not already in quote
    if (!quoteItems.includes(productId)) {
        quoteItems.push(productId);
        localStorage.setItem('nesabQuote', JSON.stringify(quoteItems));
        
        // Show success message
        showNotification('Added to quote! View your quote in the contact section.', 'success');
    } else {
        showNotification('Item already in quote.', 'info');
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm ${
        type === 'success' ? 'bg-green-600' : 
        type === 'error' ? 'bg-red-600' : 'bg-blue-600'
    } text-white`;
    
    notification.innerHTML = `
        <div class="flex items-center justify-between">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white hover:text-gray-200">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    anime({
        targets: notification,
        opacity: [0, 1],
        translateX: [100, 0],
        duration: 300,
        easing: 'easeOutQuad'
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        anime({
            targets: notification,
            opacity: [1, 0],
            translateX: [0, 100],
            duration: 300,
            easing: 'easeInQuad',
            complete: () => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }
        });
    }, 5000);
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add loading animation for buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button[type="submit"], .btn-loading')) {
        const btn = e.target;
        const originalText = btn.textContent;
        
        btn.disabled = true;
        btn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
        `;
        
        // Reset after 2 seconds (simulate loading)
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = originalText;
        }, 2000);
    }
});

// Initialize particle background effect (optional)
function initializeParticleBackground() {
    // This would use p5.js to create a particle system
    // For now, we'll keep it simple with CSS animations
}

// Utility functions
function formatPrice(price) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Export functions for use in other pages
window.NesabApp = {
    addToQuote,
    showNotification,
    formatPrice,
    debounce
};