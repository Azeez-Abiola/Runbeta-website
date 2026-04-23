// Navigation Scroll Effect
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Simple Scroll Reveal Animation (AOS alternative)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Testimonial Carousel Logic
const cards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prev-test');
const nextBtn = document.getElementById('next-test');
let currentIndex = 0;

// Set Active Nav Link
const currentPath = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

function updateCarousel() {
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        if (index === currentIndex) {
            card.classList.add('active');
        } else if (index === (currentIndex - 1 + cards.length) % cards.length) {
            card.classList.add('prev');
        } else if (index === (currentIndex + 1) % cards.length) {
            card.classList.add('next');
        }
    });
}

// Auto-advance carousel
let carouselInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
}, 5000);

if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
        clearInterval(carouselInterval);
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        clearInterval(carouselInterval);
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    });
}

// FAQ Accordion Logic
document.querySelectorAll('.faq-item').forEach(item => {
    item.querySelector('.faq-question').addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items in the same category
        const parent = item.closest('.faq-container');
        parent.querySelectorAll('.faq-item').forEach(otherItem => {
            otherItem.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// FAQ Tab Logic
const faqTabs = document.querySelectorAll('.faq-tab');
const faqCategories = document.querySelectorAll('.faq-category');

if (faqTabs.length > 0) {
    faqTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const category = tab.dataset.category;
            
            // Update tabs
            faqTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Update categories
            faqCategories.forEach(cat => {
                cat.classList.remove('active');
                if (cat.id === category) {
                    cat.classList.add('active');
                }
            });
        });
    });
}

// Hero Typewriter Logic
const typewriterEl = document.getElementById('typewriter');
if (typewriterEl) {
    const words = ["Home Services", "Expert Repairs", "Deep Cleaning", "AC Servicing", "Handyman Help"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Tab Logic (Sidebar switching)
document.querySelectorAll('.tab-option').forEach(option => {
    option.addEventListener('click', () => {
        const parent = option.closest('.tabbed-info');
        const tabId = option.getAttribute('data-tab');

        // Remove active class from all options in this section
        parent.querySelectorAll('.tab-option').forEach(opt => opt.classList.remove('active'));
        parent.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

        // Add active class
        option.classList.add('active');
        parent.querySelector(`#${tabId}`).classList.add('active');
    });
});

// Modal Logic
const modal = document.getElementById('serviceModal');
const modalOverlay = document.querySelector('.modal-overlay');
const closeModal = document.querySelector('.close-modal');

if (modal) {
    document.querySelectorAll('.card-v2-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const card = btn.closest('.card-v2');
            const title = card.querySelector('.card-v2-label').textContent;
            
            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalTag').textContent = "Service Detail";
            document.getElementById('modalDesc').textContent = `Looking for expert ${title}? Our verified professionals are ready to help. At RunBeta, we ensure every artisan is background-checked and skill-verified for your peace of mind.`;
            
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scroll
        });
    });

    closeModal.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Count-Up Animation
function formatNumber(num, isDecimal) {
    if (isDecimal) return num.toFixed(1);
    if (num >= 1000) return Math.floor(num / 1000) + 'K';
    return Math.floor(num).toString();
}

function animateCountUp(el) {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const isDecimal = el.dataset.decimal === 'true';
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = eased * target;

        el.textContent = formatNumber(current, isDecimal) + suffix;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

const countUpElements = document.querySelectorAll('.count-up');
if (countUpElements.length > 0) {
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCountUp(entry.target);
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    countUpElements.forEach(el => countObserver.observe(el));
}
