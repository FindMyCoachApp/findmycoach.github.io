// Register Service Worker for PWA functionality (iOS support)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered successfully:', registration.scope);

                // Check for updates
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;
                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            // New service worker available, prompt user to refresh
                            if (confirm('A new version is available! Refresh to update?')) {
                                window.location.reload();
                            }
                        }
                    });
                });
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}

// Offline/Online Detection
const offlineIndicator = document.getElementById('offline-indicator');

function updateOnlineStatus() {
    if (navigator.onLine) {
        if (offlineIndicator) {
            offlineIndicator.classList.remove('show');
            setTimeout(() => {
                offlineIndicator.style.display = 'none';
            }, 300);
        }
    } else {
        if (offlineIndicator) {
            offlineIndicator.style.display = 'block';
            setTimeout(() => {
                offlineIndicator.classList.add('show');
            }, 100);
        }
    }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus();

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

// Improved Mobile Navigation - Close menu on scroll
function initMobileNavScroll() {
    const mainNav = document.getElementById('main-nav');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Close menu if scrolling down significantly
        if (mainNav && mainNav.classList.contains('active')) {
            if (Math.abs(scrollTop - lastScrollTop) > 50) {
                menuToggle.setAttribute('aria-expanded', 'false');
                mainNav.classList.remove('active');
            }
        }

        lastScrollTop = scrollTop;
    }, { passive: true });
}

// Initialize mobile nav scroll behavior
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileNavScroll);
} else {
    initMobileNavScroll();
}

// Prevent body scroll when mobile menu is open
function preventBodyScroll() {
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        const observer = new MutationObserver(() => {
            if (mainNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        observer.observe(mainNav, { attributes: true, attributeFilter: ['class'] });
    }
}

// Initialize body scroll prevention
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preventBodyScroll);
} else {
    preventBodyScroll();
}

// Smooth scroll with offset for fixed header on mobile
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialize smooth scroll
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSmoothScroll);
} else {
    initSmoothScroll();
}

// Add loading state for better mobile UX
function addLoadingStates() {
    document.querySelectorAll('a[href], button').forEach(element => {
        element.addEventListener('click', function () {
            if (this.tagName === 'A' && this.href && !this.href.startsWith('#')) {
                // Add loading state for external links
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';

                setTimeout(() => {
                    this.style.opacity = '';
                    this.style.pointerEvents = '';
                }, 1000);
            }
        });
    });
}

// Initialize loading states
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLoadingStates);
} else {
    addLoadingStates();
}

// Performance optimization: Lazy load images
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize lazy loading
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', lazyLoadImages);
} else {
    lazyLoadImages();
}

(function initHomeAboutAnimations() {
    const sections = document.querySelectorAll('.fade-in-section');
    if (!sections.length) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
        sections.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    });

    sections.forEach(el => observer.observe(el));
})();

(function initStepsToggle() {
    const tabs = document.querySelectorAll('.home-steps-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            document.querySelectorAll('.home-steps-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            const activePanel = document.getElementById('panel-' + target);
            if (activePanel) activePanel.classList.add('active');
        });
    });
})();

(function initAppPreviewCarousel() {
    const track = document.getElementById('home-app-track');
    if (!track) return;

    const carousel = track.closest('.home-app-carousel');
    const section = track.closest('.home-app');
    if (!carousel || !section) return;

    const slides = Array.from(track.querySelectorAll('.home-app-slide'));
    if (!slides.length) return;

    const prevBtn = carousel.querySelector('.home-app-nav--prev');
    const nextBtn = carousel.querySelector('.home-app-nav--next');
    const dots = Array.from(section.querySelectorAll('.home-app-dot'));

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function smoothBehavior() {
        return reducedMotion.matches ? 'auto' : 'smooth';
    }

    function getActiveIndex() {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (maxScroll > 0 && track.scrollLeft >= maxScroll - 1) {
            return slides.length - 1;
        }
        const trackRect = track.getBoundingClientRect();
        const reference = trackRect.left + 1;
        let bestIndex = 0;
        let bestDistance = Infinity;
        slides.forEach(function (slide, index) {
            const rect = slide.getBoundingClientRect();
            const distance = Math.abs(rect.left - reference);
            if (distance < bestDistance) {
                bestDistance = distance;
                bestIndex = index;
            }
        });
        return bestIndex;
    }

    function updateUi() {
        const activeIndex = getActiveIndex();

        dots.forEach(function (dot, index) {
            const isActive = index === activeIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        const maxScroll = track.scrollWidth - track.clientWidth - 1;
        if (prevBtn) prevBtn.disabled = track.scrollLeft <= 1;
        if (nextBtn) nextBtn.disabled = track.scrollLeft >= maxScroll;
    }

    function getStep() {
        const first = slides[0];
        if (!first) return track.clientWidth;
        const rect = first.getBoundingClientRect();
        const styles = window.getComputedStyle(track);
        const gap = parseFloat(styles.columnGap || styles.gap || '0') || 0;
        return rect.width + gap;
    }

    function scrollByStep(direction) {
        track.scrollBy({ left: direction * getStep(), behavior: smoothBehavior() });
    }

    function scrollToIndex(index) {
        const target = slides[index];
        if (!target) return;
        const trackRect = track.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const delta = targetRect.left - trackRect.left;
        track.scrollBy({ left: delta, behavior: smoothBehavior() });
    }

    let scrollRaf = 0;
    track.addEventListener('scroll', function () {
        if (scrollRaf) return;
        scrollRaf = window.requestAnimationFrame(function () {
            scrollRaf = 0;
            updateUi();
        });
    }, { passive: true });

    if (prevBtn) prevBtn.addEventListener('click', function () { scrollByStep(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { scrollByStep(1); });

    dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
            const index = parseInt(dot.getAttribute('data-index') || '0', 10);
            scrollToIndex(index);
        });
    });

    track.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            scrollByStep(1);
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            scrollByStep(-1);
        } else if (e.key === 'Home') {
            e.preventDefault();
            scrollToIndex(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            scrollToIndex(slides.length - 1);
        }
    });

    window.addEventListener('resize', function () {
        if (scrollRaf) return;
        scrollRaf = window.requestAnimationFrame(function () {
            scrollRaf = 0;
            updateUi();
        });
    }, { passive: true });

    updateUi();
})();
