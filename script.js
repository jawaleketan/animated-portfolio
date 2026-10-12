

// ==========================================
// Smooth Scroll for Navigation Links
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// Intersection Observer for Scroll Animations
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add a slight stagger to multiple elements appearing at once
            setTimeout(() => {
                entry.target.classList.add('active');
            }, index * 100);

            // Trigger skill bar animations
            if (entry.target.classList.contains('skill-item')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const width = progressBar.style.width;
                    progressBar.style.width = '0';
                    setTimeout(() => {
                        progressBar.style.width = width;
                    }, 200);
                }
            }
        }
    });
}, observerOptions);

// Observe elements for scroll animations
const revealElements = document.querySelectorAll('.timeline-item, .highlight-card, .portfolio-item, .skill-item, .contact-card, .education-item');
revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// ==========================================
// Navbar Background on Scroll
// ==========================================
const nav = document.querySelector('.nav');
let lastScroll = 0;

const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow to nav on scroll
    if (currentScroll > 50) {
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        nav.style.boxShadow = 'none';
    }

    // Back to top button visibility
    if (currentScroll > 500) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }

    lastScroll = currentScroll;
});

// Back to top click handler
if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// Image Modal (Zoom Performance)
// ==========================================
function initImageModal() {
    const images = document.querySelectorAll('.portfolio-image img, .cert-image-container img, .case-study-image img');

    // Create modal elements only once
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';

    const closeModalBtn = document.createElement('button');
    closeModalBtn.className = 'close-modal';
    closeModalBtn.innerHTML = '&times;';
    closeModalBtn.setAttribute('aria-label', 'Close modal');

    const modalImg = document.createElement('img');
    modalImg.className = 'modal-content';

    modal.appendChild(closeModalBtn);
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    images.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target === closeModalBtn) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Call the initializer
initImageModal();

// ==========================================
// Dynamic Card Tilt Effect (Optional Enhancement)
// ==========================================
const cards = document.querySelectorAll('.highlight-card, .portfolio-item, .contact-card, .certification-card');

cards.forEach(card => {
    card.style.cursor = 'pointer'; // Ensure pointer cursor for all cards

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

        // Dynamic spotlight effect
        const spotlightX = (x / rect.width) * 100;
        const spotlightY = (y / rect.height) * 100;
        card.style.background = `radial-gradient(circle at ${spotlightX}% ${spotlightY}%, var(--surface-hover) 0%, var(--surface-glass) 80%)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        card.style.background = '';
    });
});

// ==========================================
// Typing Effect for Hero Title (Optional)
// ==========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Uncomment to enable typing effect
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 50);
// }

// ==========================================
// Skills Progress Animation on Scroll
// ==========================================
const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const skillItem = entry.target;
            const progressBar = skillItem.querySelector('.skill-progress');

            if (progressBar) {
                const targetWidth = progressBar.getAttribute('data-width') || progressBar.style.width;
                if (!progressBar.getAttribute('data-width')) {
                    progressBar.setAttribute('data-width', targetWidth);
                }

                progressBar.style.width = '0';

                const allSkills = Array.from(document.querySelectorAll('.skill-item'));
                const index = allSkills.indexOf(skillItem);

                // Sequence the animations
                setTimeout(() => {
                    // 1. Entrance (3D slide in)
                    skillItem.classList.add('active');

                    // 2. Flicker (briefly before filling)
                    setTimeout(() => {
                        skillItem.classList.add('flicker');

                        // 3. Liquid Fill
                        setTimeout(() => {
                            progressBar.style.width = targetWidth;
                            // Remove flicker class once stable
                            setTimeout(() => {
                                skillItem.classList.remove('flicker');
                            }, 1000);
                        }, 400); // Fill starts after flicker
                    }, 400); // Flicker starts after entrance
                }, index * 200); // Stagger the waterfall
            }

            skillObserver.unobserve(skillItem);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.skill-item').forEach(item => {
    skillObserver.observe(item);
});

// ==========================================
// Active Navigation Link Highlighting
// ==========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

function highlightNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ==========================================
// Add Parallax Effect to Hero Background
// ==========================================
const heroBackground = document.querySelector('.hero-background');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ==========================================
// Initialize on Page Load
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // Add initial animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.classList.add('fade-in');
    }

    // Trigger initial scroll check
    highlightNavLink();

    console.log('Portfolio website loaded successfully! 🚀');
});

// ==========================================
// Performance Optimization: Debounce Scroll Events
// ==========================================
function debounce(func, wait = 10) {
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

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
    // Scroll-dependent functions here
}, 10));

// ==========================================
// Case Study Expand/Collapse Functionality
// ==========================================
const caseStudyToggles = document.querySelectorAll('.case-study-toggle');
const caseStudyCloseButtons = document.querySelectorAll('.case-study-close-bottom');

function toggleCaseStudy(caseStudy, forceState) {
    const toggle = caseStudy.querySelector('.case-study-toggle');
    const content = caseStudy.querySelector('.case-study-content');
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    const newState = forceState !== undefined ? forceState : !isExpanded;

    // Toggle expanded state
    toggle.setAttribute('aria-expanded', newState);
    if (newState) {
        content.classList.remove('collapsed');
    } else {
        content.classList.add('collapsed');
    }

    // Add bounce animation to button if it exists
    if (toggle) {
        toggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            toggle.style.transform = '';
        }, 150);
    }
}

caseStudyToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
        const caseStudy = this.closest('.case-study');
        toggleCaseStudy(caseStudy);
    });
});

caseStudyCloseButtons.forEach(button => {
    button.addEventListener('click', function () {
        const caseStudy = this.closest('.case-study');
        toggleCaseStudy(caseStudy, false);
    });
});

