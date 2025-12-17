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

