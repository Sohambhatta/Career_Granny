/**
 * CAREER GRANNY WEBSITE JAVASCRIPT
 * 
 * This file contains all the interactive functionality for the Career Granny website.
 * Features include:
 * - Smooth navigation between sections
 * - Animated statistics counter
 * - Event carousel functionality
 * - Search functionality
 * - Form handling
 * - Dynamic content loading
 * - Responsive mobile menu
 * - Typewriter effect
 * - Scroll animations
 * 
 * @author Career Granny Development Team
 * @version 1.0.0
 */

// ===== GLOBAL VARIABLES AND CONSTANTS =====
const SEARCH_DATA = [
    { title: 'Software Engineer', type: 'career', description: 'Design and develop software applications' },
    { title: 'Data Scientist', type: 'career', description: 'Analyze complex data to help companies make decisions' },
    { title: 'UX Designer', type: 'career', description: 'Create user-friendly interfaces and experiences' },
    { title: 'DevOps Engineer', type: 'career', description: 'Bridge development and operations teams' },
    { title: 'Product Manager', type: 'career', description: 'Guide product development from conception to launch' },
    { title: 'Cybersecurity Analyst', type: 'career', description: 'Protect organizations from digital threats' },
    { title: 'JavaScript', type: 'skill', description: 'Programming language for web development' },
    { title: 'Python', type: 'skill', description: 'Versatile programming language' },
    { title: 'Machine Learning', type: 'skill', description: 'AI technique for pattern recognition' },
    { title: 'Cloud Computing', type: 'skill', description: 'Distributed computing over the internet' },
    { title: 'Resume Writing', type: 'resource', description: 'Guide to creating effective resumes' },
    { title: 'Interview Preparation', type: 'resource', description: 'Tips for acing technical interviews' },
    { title: 'Coding Bootcamps', type: 'resource', description: 'Intensive programming courses' },
    { title: 'Tech Career Fair', type: 'event', description: 'Networking event with top tech companies' },
    { title: 'AI Workshop', type: 'event', description: 'Hands-on artificial intelligence workshop' },
    { title: 'Women in Tech Meetup', type: 'event', description: 'Networking for women in technology' }
];

const EVENTS_DATA = [
    {
        id: 1,
        title: 'AI Career Workshop',
        date: '2025-02-15',
        type: 'workshop',
        status: 'Open Registration',
        description: 'Learn about AI career paths and get hands-on experience with machine learning tools.',
        image: '🤖',
        link: '#ai-workshop'
    },
    {
        id: 2,
        title: 'Tech Career Fair',
        date: '2025-02-22',
        type: 'networking',
        status: 'Featured Event',
        description: 'Connect with recruiters from top tech companies and explore job opportunities.',
        image: '🏢',
        link: '#career-fair'
    },
    {
        id: 3,
        title: 'Coding Bootcamp Fundraiser',
        date: '2025-03-01',
        type: 'fundraiser',
        status: 'Limited Spots',
        description: 'Support our scholarship program while learning coding fundamentals.',
        image: '💻',
        link: '#coding-fundraiser'
    },
    {
        id: 4,
        title: 'Women in Tech Panel',
        date: '2025-03-08',
        type: 'webinar',
        status: 'Free Event',
        description: 'Inspiring panel discussion with successful women leaders in technology.',
        image: '👩‍💻',
        link: '#women-tech-panel'
    },
    {
        id: 5,
        title: 'Data Science Bootcamp',
        date: '2025-03-15',
        type: 'workshop',
        status: 'Early Bird',
        description: 'Intensive 2-day bootcamp covering data analysis, visualization, and machine learning.',
        image: '📊',
        link: '#data-science-bootcamp'
    },
    {
        id: 6,
        title: 'Startup Networking Night',
        date: '2025-03-22',
        type: 'networking',
        status: 'Open Registration',
        description: 'Meet entrepreneurs and explore opportunities in the startup ecosystem.',
        image: '🚀',
        link: '#startup-networking'
    },
    {
        id: 7,
        title: 'Cybersecurity Workshop',
        date: '2025-03-29',
        type: 'workshop',
        status: 'Advanced Level',
        description: 'Learn about cybersecurity threats and defense strategies.',
        image: '🔒',
        link: '#cybersecurity-workshop'
    },
    {
        id: 8,
        title: 'Annual Gala Fundraiser',
        date: '2025-04-05',
        type: 'fundraiser',
        status: 'VIP Tickets',
        description: 'Elegant fundraising gala to support our mission and celebrate achievements.',
        image: '🎭',
        link: '#annual-gala'
    }
];

let currentCarouselIndex = 0;
let isAnimating = false;

// ===== DOM CONTENT LOADED EVENT =====
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

/**
 * Initialize all website functionality
 */
function initializeWebsite() {
    setupNavigation();
    setupSearch();
    setupCarousel();
    setupEventFilters();
    setupContactForm();
    setupScrollAnimations();
    setupStatsCounter();
    setupTypewriterEffect();
    loadEvents();
    
    // Show home section by default
    showSection('home');
}

// ===== NAVIGATION FUNCTIONALITY =====

/**
 * Set up navigation menu and mobile toggle
 */
function setupNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            
            // Update active nav link
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Scroll effect for navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

/**
 * Show specific section and hide others
 * @param {string} sectionId - The ID of the section to show
 */
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    const targetSection = document.getElementById(sectionId);
    
    if (!targetSection) return;
    
    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section with animation
    setTimeout(() => {
        targetSection.classList.add('active');
        
        // Trigger animations for the section
        triggerSectionAnimations(sectionId);
        
        // Special handling for stats section
        if (sectionId === 'stats') {
            startStatsCounter();
        }
    }, 100);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Trigger animations for specific sections
 * @param {string} sectionId - The ID of the section
 */
function triggerSectionAnimations(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    
    // Add animation classes based on section
    const animatableElements = section.querySelectorAll('.team-member, .resource-card, .event-card-full, .stat-card');
    
    animatableElements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add('animate-slide-up');
        }, index * 100);
    });
}

// ===== SEARCH FUNCTIONALITY =====

/**
 * Set up search functionality
 */
function setupSearch() {
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    // Toggle search visibility with Ctrl+K
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            toggleSearch();
        }
        
        if (e.key === 'Escape') {
            hideSearch();
        }
    });
    
    // Search input event listeners
    searchInput.addEventListener('input', handleSearch);
    searchInput.addEventListener('focus', function() {
        if (this.value.trim()) {
            showSearchResults();
        }
    });
    
    // Search button click
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const query = searchInput.value.trim();
            if (query) {
                performSearch(query);
            }
        });
    }
    
    // Hide search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchContainer.contains(e.target)) {
            hideSearchResults();
        }
    });
}

/**
 * Toggle search visibility
 */
function toggleSearch() {
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');
    
    if (searchContainer.classList.contains('active')) {
        hideSearch();
    } else {
        searchContainer.classList.add('active');
        setTimeout(() => searchInput.focus(), 300);
    }
}

/**
 * Hide search interface
 */
function hideSearch() {
    const searchContainer = document.getElementById('search-container');
    searchContainer.classList.remove('active');
    hideSearchResults();
}

/**
 * Handle search input
 */
function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim().toLowerCase();
    
    if (query.length < 2) {
        hideSearchResults();
        return;
    }
    
    const results = SEARCH_DATA.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query) ||
        item.type.toLowerCase().includes(query)
    );
    
    displaySearchResults(results);
}

/**
 * Display search results
 * @param {Array} results - Array of search results
 */
function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    
    if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
        searchResults.innerHTML = results.map(result => `
            <div class="search-result-item" onclick="handleSearchResultClick('${result.type}', '${result.title}')">
                <strong>${result.title}</strong>
                <div style="font-size: 0.875rem; color: var(--text-secondary); margin-top: 4px;">
                    ${result.description}
                </div>
                <div style="font-size: 0.75rem; color: var(--primary-color); margin-top: 4px; text-transform: uppercase;">
                    ${result.type}
                </div>
            </div>
        `).join('');
    }
    
    showSearchResults();
}

/**
 * Show search results
 */
function showSearchResults() {
    const searchResults = document.getElementById('search-results');
    searchResults.style.display = 'block';
}

/**
 * Hide search results
 */
function hideSearchResults() {
    const searchResults = document.getElementById('search-results');
    searchResults.style.display = 'none';
}

/**
 * Handle search result click
 * @param {string} type - Type of result (career, skill, resource, event)
 * @param {string} title - Title of the result
 */
function handleSearchResultClick(type, title) {
    hideSearch();
    
    // Navigate to appropriate section based on type
    switch(type) {
        case 'career':
        case 'skill':
            showSection('resources');
            break;
        case 'resource':
            showSection('resources');
            break;
        case 'event':
            showSection('events');
            break;
        default:
            showSection('home');
    }
    
    // Show notification
    showNotification(`Showing results for: ${title}`, 'info');
}

/**
 * Perform comprehensive search
 * @param {string} query - Search query
 */
function performSearch(query) {
    console.log(`Performing search for: ${query}`);
    // This would integrate with backend search functionality
}

// ===== CAROUSEL FUNCTIONALITY =====

/**
 * Setup event carousel
 */
function setupCarousel() {
    const carouselTrack = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    if (!carouselTrack) return;
    
    // Load initial events
    loadCarouselEvents();
    
    // Button event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => moveCarousel('prev'));
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => moveCarousel('next'));
    }
    
    // Auto-advance carousel every 5 seconds
    setInterval(() => {
        if (!isAnimating) {
            moveCarousel('next');
        }
    }, 5000);
    
    // Touch/swipe support for mobile
    setupCarouselTouch();
}

/**
 * Load events into carousel
 */
function loadCarouselEvents() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;
    
    // Show first 6 events in carousel
    const carouselEvents = EVENTS_DATA.slice(0, 6);
    
    carouselTrack.innerHTML = carouselEvents.map(event => `
        <div class="event-card" onclick="handleEventClick('${event.link}')">
            <div class="event-image">${event.image}</div>
            <div class="event-date">${formatDate(event.date)}</div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
            <a href="${event.link}" class="event-link">Learn More →</a>
        </div>
    `).join('');
}

/**
 * Move carousel in specified direction
 * @param {string} direction - 'prev' or 'next'
 */
function moveCarousel(direction) {
    if (isAnimating) return;
    
    const carouselTrack = document.getElementById('carousel-track');
    const cards = carouselTrack.querySelectorAll('.event-card');
    const cardWidth = cards[0].offsetWidth + 16; // Including gap
    const maxIndex = Math.max(0, cards.length - 3); // Show 3 cards at a time
    
    isAnimating = true;
    
    if (direction === 'next') {
        currentCarouselIndex = (currentCarouselIndex + 1) % (maxIndex + 1);
    } else {
        currentCarouselIndex = currentCarouselIndex === 0 ? maxIndex : currentCarouselIndex - 1;
    }
    
    const translateX = -currentCarouselIndex * cardWidth;
    carouselTrack.style.transform = `translateX(${translateX}px)`;
    
    setTimeout(() => {
        isAnimating = false;
    }, 500);
}

/**
 * Setup touch/swipe support for carousel
 */
function setupCarouselTouch() {
    const carouselTrack = document.getElementById('carousel-track');
    if (!carouselTrack) return;
    
    let startX = 0;
    let isDragging = false;
    
    carouselTrack.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    carouselTrack.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    carouselTrack.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        
        if (Math.abs(diffX) > 50) { // Minimum swipe distance
            if (diffX > 0) {
                moveCarousel('next');
            } else {
                moveCarousel('prev');
            }
        }
        
        isDragging = false;
    });
}

// ===== EVENTS FUNCTIONALITY =====

/**
 * Setup event filtering
 */
function setupEventFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter events
            const filter = this.getAttribute('data-filter');
            filterEvents(filter);
        });
    });
}

/**
 * Load all events into events section
 */
function loadEvents() {
    const eventsGrid = document.getElementById('events-grid');
    if (!eventsGrid) return;
    
    eventsGrid.innerHTML = EVENTS_DATA.map(event => `
        <div class="event-card-full" data-type="${event.type}" onclick="handleEventClick('${event.link}')">
            <div class="event-meta">
                <span class="event-type">${event.type}</span>
                <span class="event-status">${event.status}</span>
            </div>
            <div class="event-image">${event.image}</div>
            <div class="event-date">${formatDate(event.date)}</div>
            <h3 class="event-title">${event.title}</h3>
            <p class="event-description">${event.description}</p>
            <a href="${event.link}" class="event-link">Register Now →</a>
        </div>
    `).join('');
}

/**
 * Filter events by type
 * @param {string} filter - Filter type ('all' or specific event type)
 */
function filterEvents(filter) {
    const eventCards = document.querySelectorAll('.event-card-full');
    
    eventCards.forEach(card => {
        const eventType = card.getAttribute('data-type');
        
        if (filter === 'all' || eventType === filter) {
            card.style.display = 'block';
            card.classList.add('animate-slide-up');
        } else {
            card.style.display = 'none';
        }
    });
}

/**
 * Handle event card click
 * @param {string} link - Event link
 */
function handleEventClick(link) {
    console.log(`Navigating to event: ${link}`);
    showNotification('Event registration would open here!', 'info');
    // In a real implementation, this would navigate to the event details page
}

/**
 * Format date for display
 * @param {string} dateString - Date in YYYY-MM-DD format
 * @returns {string} Formatted date string
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// ===== CONTACT FORM FUNCTIONALITY =====

/**
 * Setup contact form
 */
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleFormSubmission(this);
    });
    
    // Setup form field animations
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                this.classList.add('has-value');
            } else {
                this.classList.remove('has-value');
            }
        });
    });
}

/**
 * Handle form submission
 * @param {HTMLFormElement} form - The form element
 */
function handleFormSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form data
    if (!validateFormData(data)) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        console.log('Form submitted:', data);
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        
        // Reset form
        form.reset();
        
        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Remove has-value classes
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => input.classList.remove('has-value'));
        
    }, 2000);
}

/**
 * Validate form data
 * @param {Object} data - Form data
 * @returns {boolean} True if valid, false otherwise
 */
function validateFormData(data) {
    const { name, email, subject, message } = data;
    
    if (!name.trim()) {
        showNotification('Please enter your name.', 'error');
        return false;
    }
    
    if (!email.trim() || !isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!subject.trim()) {
        showNotification('Please enter a subject.', 'error');
        return false;
    }
    
    if (!message.trim()) {
        showNotification('Please enter your message.', 'error');
        return false;
    }
    
    return true;
}

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid email format
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===== STATISTICS COUNTER =====

/**
 * Setup statistics counter
 */
function setupStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    // Create intersection observer for stats animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startStatsCounter();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.getElementById('stats');
    if (statsSection) {
        observer.observe(statsSection);
    }
}

/**
 * Start the statistics counter animation
 */
function startStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100; // Animation duration roughly 2 seconds
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                stat.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target.toLocaleString();
            }
        };
        
        updateCounter();
    });
}

// ===== TYPEWRITER EFFECT =====

/**
 * Setup typewriter effect for hero section
 */
function setupTypewriterEffect() {
    const typewriterElement = document.getElementById('typewriter');
    if (!typewriterElement) return;
    
    const phrases = [
        'One Student at a Time',
        'Through AI-Powered Guidance',
        'Building Tech Leaders',
        'Creating Opportunities',
        'Inspiring Innovation'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function typeWriter() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before typing next phrase
        }
        
        setTimeout(typeWriter, typeSpeed);
    }
    
    // Start typewriter effect after a short delay
    setTimeout(typeWriter, 1000);
}

// ===== SCROLL ANIMATIONS =====

/**
 * Setup scroll-based animations
 */
function setupScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    const animatableElements = document.querySelectorAll(
        '.team-member, .resource-card, .event-card, .stat-card, .contact-item'
    );
    
    animatableElements.forEach(element => {
        observer.observe(element);
    });
}

// ===== UTILITY FUNCTIONS =====

/**
 * Show notification to user
 * @param {string} message - Notification message
 * @param {string} type - Notification type ('success', 'error', 'info')
 */
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#8B5CF6'};
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            hideNotification(notification);
        }
    }, 5000);
}

/**
 * Hide notification
 * @param {HTMLElement} notification - Notification element
 */
function hideNotification(notification) {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.remove();
        }
    }, 300);
}

/**
 * Smooth scroll to element
 * @param {string} elementId - Target element ID
 */
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
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

/**
 * Throttle function to limit function calls
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 * @returns {Function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== EVENT LISTENERS FOR GLOBAL FUNCTIONALITY =====

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Recalculate carousel positions if needed
    currentCarouselIndex = 0;
    const carouselTrack = document.getElementById('carousel-track');
    if (carouselTrack) {
        carouselTrack.style.transform = 'translateX(0)';
    }
}, 250));

// Handle keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // Escape key - close any open modals/overlays
    if (e.key === 'Escape') {
        hideSearch();
    }
    
    // Arrow keys for carousel navigation (when carousel is focused)
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const carousel = document.querySelector('.events-carousel:hover');
        if (carousel && !isAnimating) {
            e.preventDefault();
            moveCarousel(e.key === 'ArrowLeft' ? 'prev' : 'next');
        }
    }
});

// Handle visibility change (tab switching)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        console.log('Tab hidden - pausing animations');
    } else {
        // Resume animations when tab becomes visible
        console.log('Tab visible - resuming animations');
    }
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

/**
 * Setup accessibility features
 */
function setupAccessibility() {
    // Skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.prepend(skipLink);
    
    // Ensure all interactive elements are keyboard accessible
    const interactiveElements = document.querySelectorAll('button, .btn, .nav-link, .event-card');
    interactiveElements.forEach(element => {
        if (!element.getAttribute('tabindex') && element.tagName !== 'BUTTON' && element.tagName !== 'A') {
            element.setAttribute('tabindex', '0');
        }
        
        // Add keyboard event listeners for elements that aren't buttons or links
        if (element.tagName !== 'BUTTON' && element.tagName !== 'A') {
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });
}

// Initialize accessibility features
document.addEventListener('DOMContentLoaded', setupAccessibility);

// ===== PERFORMANCE OPTIMIZATIONS =====

/**
 * Lazy load images when they come into view
 */
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ===== BROWSER COMPATIBILITY =====

/**
 * Check for and polyfill missing features
 */
function checkBrowserCompatibility() {
    // Check for IntersectionObserver support
    if (!window.IntersectionObserver) {
        console.warn('IntersectionObserver not supported - falling back to scroll events');
        // Implement fallback for scroll animations
        window.addEventListener('scroll', throttle(function() {
            const animatableElements = document.querySelectorAll('.team-member, .resource-card, .stat-card');
            animatableElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    element.classList.add('animate-slide-up');
                }
            });
        }, 100));
    }
    
    // Check for CSS custom properties support
    if (!CSS.supports('color', 'var(--primary-color)')) {
        console.warn('CSS custom properties not supported - applying fallback styles');
        // Apply fallback styles
        document.body.style.setProperty('--primary-color', '#8B5CF6');
    }
}

// Initialize compatibility checks
document.addEventListener('DOMContentLoaded', checkBrowserCompatibility);

console.log('Career Granny Website JavaScript Loaded Successfully! 🚀');
