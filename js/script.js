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

    function showPanel(target) {
        document.querySelectorAll('.home-steps-panel').forEach(panel => {
            const isActive = panel.id === 'panel-' + target;
            panel.classList.toggle('active', isActive);
            panel.toggleAttribute('hidden', !isActive);
        });
    }

    showPanel('coaches');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.tab;

            tabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');

            showPanel(target);
        });
    });
})();

(function initAppShowcase() {
    var section = document.getElementById('app-preview');
    if (!section) return;

    var tabs = Array.from(section.querySelectorAll('.home-app-feature'));
    var screens = Array.from(section.querySelectorAll('.home-app-screen'));
    if (!tabs.length || !screens.length) return;

    function setActive(index) {
        tabs.forEach(function (tab, i) {
            var isActive = i === index;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
            tab.tabIndex = isActive ? 0 : -1;
        });

        screens.forEach(function (screen, i) {
            var isActive = i === index;
            screen.classList.toggle('is-active', isActive);
            screen.hidden = !isActive;
        });
    }

    tabs.forEach(function (tab, index) {
        tab.addEventListener('click', function () {
            setActive(index);
        });

        tab.addEventListener('keydown', function (e) {
            var nextIndex = index;

            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
                e.preventDefault();
                nextIndex = (index + 1) % tabs.length;
            } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
                e.preventDefault();
                nextIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (e.key === 'Home') {
                e.preventDefault();
                nextIndex = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                nextIndex = tabs.length - 1;
            } else {
                return;
            }

            setActive(nextIndex);
            tabs[nextIndex].focus();
        });
    });

    setActive(0);
})();

(function initWaitlistLinks() {
    var config = window.SITE_CONFIG || {};
    var waitlist = config.waitlist || {};
    var isMs = (document.documentElement.lang || '').toLowerCase().indexOf('ms') === 0;
    var prefix = isMs ? ((config.i18n && config.i18n.msPrefix) || 'ms/') : '';
    var waitlistUrl = prefix + (waitlist.pageUrl || 'waitlist.html');
    var coachRole = waitlist.coachRole || 'coach';

    function withRole(url, role) {
        if (!role) return url;
        return url + (url.indexOf('?') >= 0 ? '&' : '?') + 'role=' + encodeURIComponent(role);
    }

    document.querySelectorAll('[data-waitlist-link]').forEach(function (el) {
        el.setAttribute('href', waitlistUrl);
    });

    document.querySelectorAll('[data-waitlist-role="coach"]').forEach(function (el) {
        el.setAttribute('href', withRole(waitlistUrl, coachRole));
    });

    document.querySelectorAll('a[href*="docs.google.com/forms"]').forEach(function (el) {
        el.setAttribute('href', waitlistUrl);
    });
})();

(function initDynamicStats() {
    var config = window.SITE_CONFIG || {};
    var count = (config.stats && config.stats.waitlistCount) || '50+';

    document.querySelectorAll('[data-waitlist-count]').forEach(function (el) {
        var isMs = (document.documentElement.lang || '').toLowerCase().indexOf('ms') === 0;
        el.textContent = isMs
            ? count + ' orang telah mendaftar'
            : count + ' people have already signed up';
    });
})();

(function initScrollSpy() {
    var nav = document.getElementById('main-nav');
    if (!nav) return;

    var links = Array.from(nav.querySelectorAll('a[href^="#"]'));
    if (!links.length) return;

    var sections = links
        .map(function (link) {
            var id = link.getAttribute('href').slice(1);
            var section = document.getElementById(id);
            return section ? { id: id, link: link, section: section } : null;
        })
        .filter(Boolean);

    if (!sections.length) return;

    function updateActive() {
        var scrollPos = window.scrollY + 120;
        var current = sections[0];

        sections.forEach(function (item) {
            if (item.section.offsetTop <= scrollPos) {
                current = item;
            }
        });

        sections.forEach(function (item) {
            item.link.classList.toggle('is-active', item.id === current.id);
        });
    }

    window.addEventListener('scroll', updateActive, { passive: true });
    updateActive();
})();

(function initCookieConsent() {
    var banner = document.getElementById('cookie-consent');
    if (!banner) return;

    var storageKey = 'fmc-cookie-consent';
    var stored = localStorage.getItem(storageKey);

    if (stored) {
        if (stored === 'accepted') {
            window.FMC_ANALYTICS_CONSENT = true;
        }
        return;
    }

    banner.hidden = false;

    var acceptBtn = banner.querySelector('.cookie-consent-accept');
    var declineBtn = banner.querySelector('.cookie-consent-decline');

    function dismiss(value) {
        localStorage.setItem(storageKey, value);
        banner.hidden = true;
        if (value === 'accepted') {
            window.FMC_ANALYTICS_CONSENT = true;
            if (typeof window.loadFmcAnalytics === 'function') {
                window.loadFmcAnalytics();
            }
        }
    }

    if (acceptBtn) acceptBtn.addEventListener('click', function () { dismiss('accepted'); });
    if (declineBtn) declineBtn.addEventListener('click', function () { dismiss('essential'); });
})();

(function initPWAInstallBanner() {
    var installBanner = document.getElementById('install-banner');
    if (!installBanner) return;

    var installBtn = installBanner.querySelector('.install-btn');
    var dismissBtn = installBanner.querySelector('.install-dismiss');
    var storageKey = 'install-banner-dismissed';
    var deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        deferredPrompt = e;

        if (localStorage.getItem(storageKey)) return;

        installBanner.classList.add('show');
        installBanner.style.display = 'block';
    });

    if (installBtn) {
        installBtn.addEventListener('click', async function () {
            if (!deferredPrompt) return;

            deferredPrompt.prompt();
            await deferredPrompt.userChoice;
            deferredPrompt = null;
            installBanner.classList.remove('show');
        });
    }

    if (dismissBtn) {
        dismissBtn.addEventListener('click', function () {
            localStorage.setItem(storageKey, 'true');
            installBanner.classList.remove('show');
            setTimeout(function () {
                installBanner.style.display = 'none';
            }, 300);
        });
    }

    window.addEventListener('appinstalled', function () {
        deferredPrompt = null;
        installBanner.classList.remove('show');
    });
})();

(function initCoachEarningsCalc() {
    var calc = document.getElementById('coach-earnings-calc');
    if (!calc) return;

    var sessionsInput = document.getElementById('coach-sessions');
    var sessionsOut = document.getElementById('coach-sessions-out');
    var rateInput = document.getElementById('coach-rate');
    var grossEl = document.getElementById('coach-gross');
    var netEl = document.getElementById('coach-net');
    var lossEl = document.getElementById('coach-commission-loss');
    var membership = 30;
    var commissionRate = 0.15;

    function formatAmount(value) {
        return Math.round(value).toLocaleString('en-MY');
    }

    function update() {
        var sessions = parseInt(sessionsInput.value, 10) || 0;
        var rate = parseFloat(rateInput.value) || 0;
        var gross = sessions * rate;
        var net = Math.max(gross - membership, 0);
        var commissionLoss = Math.round(gross * commissionRate);

        sessionsOut.textContent = sessions;
        sessionsInput.setAttribute('aria-valuenow', String(sessions));
        grossEl.textContent = formatAmount(gross);
        netEl.textContent = formatAmount(net);
        lossEl.textContent = formatAmount(commissionLoss);
    }

    sessionsInput.addEventListener('input', update);
    rateInput.addEventListener('input', update);
    update();
})();

(function initWaitlistRole() {
    var page = document.querySelector('.waitlist-page');
    if (!page) return;

    var config = window.SITE_CONFIG || {};
    var waitlist = config.waitlist || {};
    var storageKey = waitlist.roleStorageKey || 'fmc-waitlist-role';
    var coachRole = waitlist.coachRole || 'coach';
    var params = new URLSearchParams(window.location.search);
    var role = params.get('role');

    if (role === coachRole) {
        sessionStorage.setItem(storageKey, coachRole);
    }

    var isCoach = sessionStorage.getItem(storageKey) === coachRole || role === coachRole;
    var athleteView = document.getElementById('waitlist-athlete');
    var coachView = document.getElementById('waitlist-coach');
    var coachAside = document.getElementById('waitlist-coach-aside');
    var breadcrumbCurrent = document.getElementById('waitlist-breadcrumb-current');
    var fallbackLink = document.getElementById('waitlist-thank-you-link');
    var isMs = (document.documentElement.lang || '').toLowerCase().indexOf('ms') === 0;
    var prefix = isMs ? ((config.i18n && config.i18n.msPrefix) || 'ms/') : '';
    var thankYouUrl = prefix + (waitlist.thankYouUrl || 'thank-you.html') + '?role=' + coachRole;

    if (isCoach) {
        page.classList.add('waitlist-page--coach');
        document.title = isMs
            ? 'Sertai Senarai Tunggu Jurulatih | Find My Coach'
            : 'Join the Coach Waitlist | Find My Coach';

        if (athleteView) athleteView.hidden = true;
        if (coachView) coachView.hidden = false;
        if (coachAside) coachAside.hidden = false;
        if (breadcrumbCurrent) {
            breadcrumbCurrent.textContent = isMs ? 'Senarai Tunggu Jurulatih' : 'Coach Waitlist';
        }
        if (fallbackLink) fallbackLink.setAttribute('href', thankYouUrl);

        document.querySelectorAll('.lang-switch-link[href*="waitlist"]').forEach(function (link) {
            var href = link.getAttribute('href');
            if (href && href.indexOf('role=') < 0) {
                link.setAttribute('href', href + (href.indexOf('?') >= 0 ? '&' : '?') + 'role=' + encodeURIComponent(coachRole));
            }
        });
    }
})();

(function initThankYouRole() {
    var page = document.querySelector('.thank-you-page');
    if (!page) return;

    var config = window.SITE_CONFIG || {};
    var waitlist = config.waitlist || {};
    var storageKey = waitlist.roleStorageKey || 'fmc-waitlist-role';
    var coachRole = waitlist.coachRole || 'coach';
    var params = new URLSearchParams(window.location.search);
    var isCoach = params.get('role') === coachRole || sessionStorage.getItem(storageKey) === coachRole;
    var athleteView = document.getElementById('thank-you-athlete');
    var coachView = document.getElementById('thank-you-coach');
    var isMs = (document.documentElement.lang || '').toLowerCase().indexOf('ms') === 0;

    if (!isCoach) return;

    page.classList.add('thank-you-page--coach');
    document.title = isMs
        ? 'Terima Kasih | Anda Dalam Senarai Tunggu Jurulatih | Find My Coach'
        : 'Thank You | You\'re on the Coach Waitlist | Find My Coach';

    if (athleteView) athleteView.hidden = true;
    if (coachView) coachView.hidden = false;
})();
