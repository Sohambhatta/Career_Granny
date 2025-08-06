/**
 * =====================================
 * CAREER GRANNY WEBSITE JAVASCRIPT
 * =====================================
 * 
 * This file contains all the interactive functionality for the Career Granny website.
 * It handles dynamic content, user interactions, animations, and responsive behavior.
 * 
 * MAIN FEATURES:
 * - Smooth navigation between sections
 * - Animated statistics counters with scroll triggers
 * - Event filtering and dynamic grid population
 * - Intelligent search functionality across careers/skills/resources
 * - Contact form validation and submission handling
 * - Responsive mobile navigation menu
 * - Typewriter text animation effects
 * - Scroll-based animations and reveal effects
 * - Dynamic content loading from data arrays
 * 
 * ORGANIZATION:
 * 1. Global Variables and Data Constants
 * 2. DOM Content Loaded Event Handler
 * 3. Navigation System Functions
 * 4. Search Functionality
 * 5. Event Management System
 * 6. Animation Functions (Typewriter, Counters, etc.)
 * 7. Form Handling and Validation
 * 8. Utility Functions and Helpers
 * 9. Responsive Design Handlers
 * 10. Performance Optimization Functions
 * 
 * @author Career Granny Development Team
 * @version 2.0.0
 * @lastUpdated August 2025
 * @requires Modern browser with ES6+ support
 */


/* 
=======================================
1. GLOBAL VARIABLES AND DATA CONSTANTS
=======================================

These constants store all the dynamic content data and configuration
values used throughout the website. This approach makes the content
easily maintainable and allows for future integration with a CMS or API.
*/

/**
 * SEARCH_DATA - Comprehensive search database
 * Contains searchable items across different categories (careers, skills, resources, events)
 * Each item includes title, type classification, and descriptive text
 * Used by the intelligent search functionality to provide relevant results
 */
const SEARCH_DATA = [
    // Career path options
    { title: 'Software Engineer', type: 'career', description: 'Design and develop software applications' },
    { title: 'Data Scientist', type: 'career', description: 'Analyze complex data to help companies make decisions' },
    { title: 'UX Designer', type: 'career', description: 'Create user-friendly interfaces and experiences' },
    { title: 'DevOps Engineer', type: 'career', description: 'Bridge development and operations teams' },
    { title: 'Product Manager', type: 'career', description: 'Guide product development from conception to launch' },
    { title: 'Cybersecurity Analyst', type: 'career', description: 'Protect organizations from digital threats' },
    
    // Technical skills and technologies
    { title: 'JavaScript', type: 'skill', description: 'Programming language for web development' },
    { title: 'Python', type: 'skill', description: 'Versatile programming language' },
    { title: 'Machine Learning', type: 'skill', description: 'AI technique for pattern recognition' },
    { title: 'Cloud Computing', type: 'skill', description: 'Distributed computing over the internet' },
    
    // Educational resources and guides
    { title: 'Resume Writing', type: 'resource', description: 'Guide to creating effective resumes' },
    { title: 'Interview Preparation', type: 'resource', description: 'Tips for acing technical interviews' },
    { title: 'Coding Bootcamps', type: 'resource', description: 'Intensive programming courses' },
    
    // Upcoming events and workshops
    { title: 'Tech Career Fair', type: 'event', description: 'Networking event with top tech companies' },
    { title: 'AI Workshop', type: 'event', description: 'Hands-on artificial intelligence workshop' },
    { title: 'Women in Tech Meetup', type: 'event', description: 'Networking for women in technology' }
];

/**
 * EVENTS_DATA - Complete events database
 * Contains all event information including dates, types, descriptions, and status
 * Used to dynamically populate the events page and enable filtering functionality
 * Each event includes:
 * - Unique ID for tracking and linking
 * - Display title and formatted date
 * - Type classification for filtering (workshop, networking, fundraiser, webinar)
 * - Registration status for user guidance
 * - Detailed description for user decision-making
 * - Emoji icon for visual appeal
 * - Link destination for registration/more info
 */
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

/**
 * Global state variables for managing UI interactions
 * These variables track the current state of various interactive components
 */
let currentCarouselIndex = 0;  // Tracks current position in image carousel
let isAnimating = false;       // Prevents rapid-fire animations during transitions


/* 
=======================================
2. DOM CONTENT LOADED EVENT HANDLER
=======================================

This is the main entry point for all JavaScript functionality.
It ensures the DOM is fully loaded before initializing any interactive features.
*/

/**
 * Main DOMContentLoaded Event Listener
 * Waits for the HTML document to be completely loaded and parsed
 * before executing any JavaScript functionality. This prevents errors
 * from trying to access elements that don't exist yet.
 */
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

/**
 * Master initialization function
 * Coordinates the setup of all website features in the correct order
 * Each setup function handles a specific aspect of the website functionality
 * 
 * INITIALIZATION ORDER:
 * 1. Navigation system (must be first for page routing)
 * 2. Search functionality (independent feature)
 * 3. Image carousel (if present on page)
 * 4. Event filtering system (for events page)
 * 5. Contact form validation (for contact page)
 * 6. Scroll-based animations (visual enhancements)
 * 7. Statistics counter animations (for impact page)
 * 8. Typewriter text effects (for hero sections)
 * 9. Dynamic event loading (populates events grid)
 * 10. Default page display (shows home section)
 */
function initializeWebsite() {
    // Core navigation functionality - must be initialized first
    setupNavigation();
    
    // Search functionality - independent of other systems
    setupSearch();
    
    // Visual components that enhance user experience
    setupCarousel();              // Image slideshow functionality
    setupEventFilters();          // Event category filtering
    setupContactForm();           // Form validation and submission
    setupScrollAnimations();      // Reveal animations on scroll
    setupStatsCounter();          // Animated number counters
    setupTypewriterEffect();      // Typing animation for headlines
    
    // Content population - should come after UI setup
    loadEvents();                 // Dynamically populate events grid
    
    // Initial page state - display home section by default
    showSection('home');
}


/* 
=======================================
3. NAVIGATION SYSTEM FUNCTIONS
=======================================

The navigation system handles multi-page navigation, mobile menu functionality,
scroll-based navbar styling, and smooth section transitions. It provides a
seamless user experience across all device sizes.
*/

/**
 * Set up navigation menu and mobile toggle
 * 
 * FUNCTIONALITY PROVIDED:
 * - Mobile hamburger menu toggle
 * - Automatic menu closing on link clicks  
 * - Scroll-based navbar styling changes
 * - Click-outside-to-close behavior
 * - Smooth transitions and animations
 * 
 * RESPONSIVE BEHAVIOR:
 * - Desktop: Horizontal menu always visible
 * - Mobile: Hamburger button toggles slide-down menu
 * - Tablet: Adapts based on screen width breakpoints
 */
function setupNavigation() {
    // Get navigation DOM elements
    const navToggle = document.getElementById('nav-toggle');      // Hamburger menu button
    const navMenu = document.getElementById('nav-menu');          // Navigation links container
    const navLinks = document.querySelectorAll('.nav-link');      // Individual navigation links
    const navbar = document.getElementById('navbar');             // Main navigation bar
    
    // ===== MOBILE MENU TOGGLE FUNCTIONALITY =====
    // Toggle mobile menu visibility when hamburger button is clicked
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            // Toggle active states for both menu and button
            navMenu.classList.toggle('active');    // Shows/hides mobile menu
            navToggle.classList.toggle('active');  // Animates hamburger to X
        });
    }
    
    // ===== NAVIGATION LINK CLICK HANDLING =====
    // Close mobile menu when any navigation link is clicked
    // This ensures smooth navigation flow on mobile devices
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if mobile menu is currently open
            if (navMenu.classList.contains('active')) {
                // Close mobile menu and reset hamburger animation
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
            // Note: Normal navigation continues after this (handled by browser)
        });
    });
    
    // ===== SCROLL-BASED NAVBAR STYLING =====
    // Changes navbar appearance based on scroll position
    // Provides visual feedback and improves readability
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            // Add 'scrolled' class when user scrolls down
            navbar.classList.add('scrolled');    // Triggers enhanced backdrop blur and shadow
        } else {
            // Remove 'scrolled' class when back at top
            navbar.classList.remove('scrolled'); // Returns to default subtle styling
        }
    });
    
    // ===== CLICK-OUTSIDE-TO-CLOSE BEHAVIOR =====
    // Closes mobile menu when user clicks outside the navigation area
    // Improves usability by providing intuitive menu dismissal
    document.addEventListener('click', function(e) {
        // Check if click was outside both the menu and toggle button
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            // Close mobile menu and reset states
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

/**
 * Show specific section and hide others
 * 
 * This function manages the single-page application (SPA) behavior
 * by showing only the requested section while hiding all others.
 * It provides smooth transitions and proper state management.
 * 
 * @param {string} sectionId - The ID of the section to display
 * 
 * USAGE EXAMPLES:
 * - showSection('home') - Display home page content
 * - showSection('about') - Display about page content
 * - showSection('contact') - Display contact page content
 * 
 * TRANSITION BEHAVIOR:
 * 1. Hide all sections with fade-out animation
 * 2. Show target section with fade-in animation
 * 3. Update navigation active states
 * 4. Scroll to top for better user experience
 */
function showSection(sectionId) {
    // Get all page sections and the target section
    const sections = document.querySelectorAll('.section');
    const targetSection = document.getElementById(sectionId);
    
    // Exit early if target section doesn't exist (error prevention)
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
