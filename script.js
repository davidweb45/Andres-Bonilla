// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Expandable service cards
document.querySelectorAll('.service-item.expandable').forEach(item => {
    item.addEventListener('click', function() {
        this.classList.toggle('expanded');
    });
});

// Floating contact widget
const floatingContact = document.querySelector('.floating-contact');
const contactToggle = document.querySelector('.contact-toggle');

contactToggle.addEventListener('click', function() {
    floatingContact.classList.toggle('active');
});

// Close contact widget when clicking outside
document.addEventListener('click', function(e) {
    if (!floatingContact.contains(e.target)) {
        floatingContact.classList.remove('active');
    }
});

// Scroll progress indicator
window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

// Active section highlighting on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Touch-friendly interactions for mobile
if ('ontouchstart' in window) {
    document.querySelectorAll('.service-item.expandable').forEach(item => {
        item.addEventListener('touchstart', function() {
            // Add touch feedback
        });
    });
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        floatingContact.classList.remove('active');
    }
});

// Performance optimization: Lazy load images (if any)
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// Micro-interactions: Add loading states
document.querySelectorAll('a[href^="tel:"], a[href^="mailto:"], a[target="_blank"]').forEach(link => {
    link.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});