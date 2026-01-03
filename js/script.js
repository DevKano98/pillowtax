// Initialize EmailJS
if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_PUBLIC_KEY_HERE'); // Replace with your EmailJS public key
}

// ===========================
// MOBILE MENU TOGGLE
// ===========================

// Ensure DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && mobileMenu) {
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Prevent menu clicks from closing it
        mobileMenu.addEventListener('click', function(e) {
            e.stopPropagation();
        });

        // Close menu when clicking a mobile link
        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.stopPropagation();
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
        });
    }
});

// ===========================
// WAITLIST BUTTON - SCROLL TO CONTACT
// ===========================

const waitlistButtons = document.querySelectorAll('.waitlist-btn, .waitlist-btn-mobile');

waitlistButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            // Close mobile menu if open
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
            }
        }
    });
});

// ===========================
// SMOOTH SCROLL (SAFE VERSION)
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');

        // Ignore invalid anchors
        if (!targetId || targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Close mobile menu after navigation
        if (mobileMenu) {
            mobileMenu.classList.remove('active');
        }
    });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
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

document.querySelectorAll('.feature-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===========================
// EMAIL FORM HANDLING WITH EMAILJS
// ===========================

const emailForm = document.getElementById('emailForm');

if (emailForm) {
    emailForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const input = emailForm.querySelector('input[type="email"]');
        const button = emailForm.querySelector('button');
        const email = input.value.trim();

        if (!email) {
            alert('Please enter a valid email address.');
            return;
        }

        const originalText = button.textContent;
        button.textContent = 'Sending...';
        button.disabled = true;

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_WAITLIST_HERE', {
            to_email: 'hello@pillowtax.com',
            user_email: email,
            message: `New waitlist signup from: ${email}`
        })
        .then((response) => {
            console.log('Waitlist email sent successfully!', response);
            button.textContent = 'Added to waitlist ✓';
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                emailForm.reset();
                button.textContent = originalText;
                button.disabled = false;
                button.style.opacity = '1';
            }, 3000);
        })
        .catch((error) => {
            console.error('Error sending waitlist email:', error);
            alert('Error adding to waitlist. Please try again.');
            button.textContent = originalText;
            button.disabled = false;
        });
    });
}

// ===========================
// CONTACT FORM HANDLING WITH EMAILJS
// ===========================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        const button = contactForm.querySelector('button');
        const originalText = button.textContent;

        button.textContent = 'Sending...';
        button.disabled = true;

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_CONTACT_HERE', {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message,
            to_email: 'hello@pillowtax.com'
        })
        .then((response) => {
            console.log('Contact form sent successfully!', response);
            button.textContent = 'Message Sent ✓';
            button.style.opacity = '0.7';

            setTimeout(() => {
                contactForm.reset();
                button.textContent = originalText;
                button.disabled = false;
                button.style.opacity = '1';
            }, 3000);
        })
        .catch((error) => {
            console.error('Error sending contact form:', error);
            alert('Error sending message. Please try again.');
            button.textContent = originalText;
            button.disabled = false;
        });
    });
}

// ===========================
// PARALLAX EFFECT (DESKTOP ONLY)
// ===========================

const heroImage = document.querySelector('.image-card');

if (heroImage && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 10;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;

        heroImage.style.transform = `
            perspective(1000px)
            rotateX(${-y}deg)
            rotateY(${x}deg)
        `;
    });

    window.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
}

// ===========================
// FADE-IN SECTIONS
// ===========================

const fadeElements = document.querySelectorAll('.section-header, .section-desc');

const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            obs.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    fadeObserver.observe(el);
});