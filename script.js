// Countdown target fixed to Jan 15, 2026
const countdownTarget = new Date('2026-01-15T00:00:00');

const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
};

function updateCountdown() {
    const now = new Date();
    const diff = countdownTarget - now;

    if (diff <= 0) {
        countdownElements.days.textContent = '00';
        countdownElements.hours.textContent = '00';
        countdownElements.minutes.textContent = '00';
        countdownElements.seconds.textContent = '00';
        return;
    }

    const seconds = Math.floor(diff / 1000) % 60;
    const minutes = Math.floor(diff / (1000 * 60)) % 60;
    const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    countdownElements.days.textContent = String(days).padStart(2, '0');
    countdownElements.hours.textContent = String(hours).padStart(2, '0');
    countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
    countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
}

if (countdownElements.days) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Register Service Worker for PWA functionality (iOS support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration.scope);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Apple-specific: Prevent zoom on double tap (iOS Safari)
let lastTouchEnd = 0;
document.addEventListener('touchend', (event) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// Apple-specific: Optimize for iOS viewport changes
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', () => {
        // Ensure content adjusts when iOS Safari UI appears/disappears
        document.documentElement.style.setProperty('--viewport-height', `${window.visualViewport.height}px`);
    });
}

// Social Proof - Dynamic waitlist count (you can update this with real data)
function updateWaitlistCount() {
    // Base count - update this with your actual waitlist count
    const baseCount = 500;

    // Add a small random increment to show growth (remove in production)
    const waitlistEl = document.getElementById('waitlist-count');

    if (waitlistEl) {
        // You can replace this with an API call to get real numbers
        const currentCount = baseCount + Math.floor(Math.random() * 10);
        waitlistEl.textContent = currentCount.toLocaleString() + '+';
    }
}

// Update counts on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateWaitlistCount);
} else {
    updateWaitlistCount();
}

// Social Sharing - Update URLs with current page URL
function updateSocialShareUrls() {
    const currentUrl = encodeURIComponent(window.location.href);

    document.querySelectorAll('.share-twitter, .share-btn.share-twitter').forEach(link => {
        if (link.href.includes('twitter.com')) {
            link.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent('Join the waitlist for Find My Coach - the app connecting athletes with expert coaches!')}&url=${currentUrl}`;
        }
    });

    document.querySelectorAll('.share-facebook, .share-btn.share-facebook').forEach(link => {
        if (link.href.includes('facebook.com')) {
            link.href = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateSocialShareUrls);
} else {
    updateSocialShareUrls();
}

// Mobile Menu Toggle
function initMobileMenu() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
        });

        // Close menu when clicking on a link
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target)) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
            }
        });
    }
}

// Initialize mobile menu on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
} else {
    initMobileMenu();
}

// FAQ Accordion Functionality
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');
            const isExpanded = question.getAttribute('aria-expanded') === 'true';

            // Close all FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            faqQuestions.forEach(q => {
                q.setAttribute('aria-expanded', 'false');
            });

            // Open clicked item if it wasn't active
            if (!isActive || !isExpanded) {
                faqItem.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });
    });
}

// Initialize FAQ on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFAQ);
} else {
    initFAQ();
}

// Why Choose Us Slider Functionality
function initWhyChooseSlider() {
    const slides = document.querySelectorAll('.why-choose-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    if (slides.length === 0) return;

    function showSlide(index) {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));

        // Add active class to current slide and indicator
        slides[index].classList.add('active');
        indicators[index].classList.add('active');
        currentSlide = index;
    }

    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    }

    // Event listeners for navigation buttons
    if (nextBtn) {
        nextBtn.addEventListener('click', nextSlide);
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', prevSlide);
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
}

// Initialize slider on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhyChooseSlider);
} else {
    initWhyChooseSlider();
}
