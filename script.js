// ===================================
// BENEVOLENT ISLAMIC SECONDARY SCHOOL
// Modern Website - JavaScript
// ==================================

// ============================================
// DOCUMENT READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
    initMobileMenu();
    initFormHandlers();
    initTabSystem();
    initScrollAnimations();
    initAccordions();
});

// ============================================
// CAROUSEL
// ============================================

function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;

    let currentSlide = 0;
    let autoPlayInterval;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and corresponding indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        resetAutoPlay();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        resetAutoPlay();
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
        resetAutoPlay();
    }

    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayInterval);
        startAutoPlay();
    }

    // Initialize first slide
    showSlide(0);

    // Add click handlers for arrow buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    // Add click handlers for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => goToSlide(index));
    });

    // Start auto-play
    startAutoPlay();

    // Pause auto-play on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
    }
}

// ============================================
// MOBILE MENU
// ============================================

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const body = document.body;

    if (!hamburger) return;

    // Toggle menu open/close
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Only on mobile: handle dropdown toggles
    if (window.innerWidth <= 767) {
        const dropdowns = document.querySelectorAll('.dropdown');
        
        dropdowns.forEach(dropdown => {
            const parentLink = dropdown.querySelector('a');
            
            // Toggle dropdown on parent link click
            parentLink.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Close all other dropdowns
                dropdowns.forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle this dropdown
                dropdown.classList.toggle('active');
            });
        });
        
        // Close menu when clicking submenu items
        const submenuLinks = document.querySelectorAll('.dropdown-menu a');
        submenuLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // Close menu when clicking regular (non-dropdown) links
    const regularLinks = document.querySelectorAll('.nav-menu > li:not(.dropdown) > a');
    regularLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
}

// ============================================
// FORM HANDLERS
// ============================================

function initFormHandlers() {
    const admissionsForm = document.getElementById('admissions-form');
    const contactForm = document.getElementById('contactForm');

    if (admissionsForm) {
        admissionsForm.addEventListener('submit', handleFormSubmit);
    }

    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
        // Add real-time validation
        contactForm.querySelectorAll('input, textarea').forEach(field => {
            field.addEventListener('blur', () => validateField(field));
            field.addEventListener('input', () => {
                if (field.parentElement.classList.contains('error')) {
                    validateField(field);
                }
            });
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Validate form
    if (!validateForm(formData)) {
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you! We will contact you shortly.', 'success');
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }, 1500);
}

function validateForm(formData) {
    const email = formData.get('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return false;
    }

    // Check for required fields
    for (let [key, value] of formData.entries()) {
        if (value.trim() === '') {
            return false;
        }
    }

    return true;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
        max-width: 90%;
    `;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// ============================================
// TAB SYSTEM
// ============================================

function initTabSystem() {
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            activateTab(tabName, button);
        });
    });
}

function activateTab(tabName, button) {
    const parent = button.closest('.curriculum-tabs').parentElement;
    
    // Remove active class from all buttons and tabs
    const buttons = parent.querySelectorAll('.tab-button');
    const tabs = parent.querySelectorAll('.tab-content');
    
    buttons.forEach(btn => btn.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Add active class to clicked button and corresponding tab
    button.classList.add('active');
    const activeTab = parent.querySelector(`#${tabName}-content`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all card elements
    const cards = document.querySelectorAll(
        '.program-card, .club-card, .news-card, .stat-card, .facility-card'
    );

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
}

// ============================================
// ACCORDIONS (for future use)
// ============================================

function initAccordions() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const accordion = header.closest('.accordion');
            const isActive = accordion.classList.contains('active');

            // Close all accordions
            document.querySelectorAll('.accordion').forEach(acc => {
                acc.classList.remove('active');
                const content = acc.querySelector('.accordion-content');
                if (content) {
                    content.style.maxHeight = '0px';
                }
            });

            // Open clicked accordion if it wasn't active
            if (!isActive) {
                accordion.classList.add('active');
                const content = accordion.querySelector('.accordion-content');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });
    });
}

// ============================================
// SMOOTH SCROLL OFFSET FOR STICKY NAV
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Debounce function for resize and scroll events
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

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Add animation styles dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================

// Ensure all interactive elements are keyboard accessible
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape key
    if (e.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        if (navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// ============================================
// EXTERNAL LINKS
// ============================================

// Add rel="noopener noreferrer" to external links
document.querySelectorAll('a[href^="http"]').forEach(link => {
    if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('rel', 'noopener noreferrer');
        link.setAttribute('target', '_blank');
    }
});

// ============================================
// LOCAL STORAGE FEATURES (Optional)
// ============================================

// Save form data to local storage before submission
function saveFormData(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    localStorage.setItem('formData', JSON.stringify(data));
}

// Restore form data from local storage
function restoreFormData(form) {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
        const data = JSON.parse(savedData);
        Object.keys(data).forEach(key => {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                field.value = data[key];
            }
        });
    }
}

// ============================================
// ANALYTICS & TRACKING (Optional)
// ============================================

// Track page views
function trackPageView() {
    if (typeof window.gtag === 'function') {
        window.gtag('config', 'GA_MEASUREMENT_ID', {
            page_path: window.location.pathname,
            page_title: document.title
        });
    }
}

// ============================================
// CONTACT FORM VALIDATION & HANDLING
// ============================================

function validateField(field) {
    const formGroup = field.parentElement;
    const errorSpan = formGroup.querySelector('.error-message');
    let isValid = true;
    let errorMessage = '';

    if (field.id === 'name') {
        if (field.value.trim().length < 2) {
            isValid = false;
            errorMessage = 'Please enter a valid name';
        }
    }

    if (field.id === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value.trim())) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }

    if (field.id === 'subject') {
        if (field.value.trim().length < 3) {
            isValid = false;
            errorMessage = 'Subject must be at least 3 characters';
        }
    }

    if (field.id === 'message') {
        if (field.value.trim().length < 10) {
            isValid = false;
            errorMessage = 'Message must be at least 10 characters';
        }
    }

    if (!isValid) {
        formGroup.classList.add('error');
        if (errorSpan) {
            errorSpan.textContent = errorMessage;
        }
        return false;
    } else {
        formGroup.classList.remove('error');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
        return true;
    }
}

function validateContactForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });

    return isValid;
}

function handleContactFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formMessage = document.getElementById('formMessage');

    if (!validateContactForm(form)) {
        formMessage.className = 'form-message error';
        formMessage.textContent = 'Please correct the errors above';
        return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // Collect form data
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message')
    };

    // Simulate sending email (in production, this would be sent to a backend)
    setTimeout(() => {
        // Show success message
        formMessage.className = 'form-message success';
        formMessage.textContent = '✓ Thank you! Your message has been sent successfully. We will respond within 24 hours.';
        
        // Reset form
        form.reset();
        
        // Clear error states
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });

        // Reset button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;

        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('success');
            formMessage.textContent = '';
        }, 5000);
    }, 1500);
}

// Track events
function trackEvent(eventName, eventData = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, eventData);
    }
}

// ============================================
// LAZY LOADING IMAGES
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('loading');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback for browsers that don't support Intersection Observer
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Initialize lazy loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLazyLoading);
} else {
    initLazyLoading();
}

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log('%c🎓 Welcome to Benevolent Islamic Secondary School', 'font-size: 16px; font-weight: bold; color: #000;');
console.log('%cExcellence in Education | 2025-2026', 'font-size: 12px; color: #666;');