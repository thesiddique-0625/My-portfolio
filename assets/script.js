// Mobile menu toggle
const mobileBtn = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');
if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close menu when a link is clicked
document.querySelectorAll('#navLinks a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll reveal using Intersection Observer
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
revealElements.forEach(el => observer.observe(el));

// Scroll to top button visibility
const scrollBtn = document.getElementById('scrollToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});
if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ---------- GOOGLE SHEETS INTEGRATION (FIXED) ----------
// REPLACE WITH YOUR DEPLOYED GOOGLE APPS SCRIPT URL
const scriptURL = 'https://script.google.com/macros/s/AKfycbwnPL6L9EsAbHSNfRlDNBPadI_SWQpiOT6r0XFQnRWgXcR6GPL2hu6gSnDpj2UCYYoU/exec';

const form = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (form) {
    form.addEventListener('submit', e => {
        e.preventDefault();
        formStatus.textContent = 'Sending...';
        formStatus.style.color = 'var(--cyprus)';

        // Collect form data
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',        // Important for Apps Script web app
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(() => {
            // With no-cors, we can't read response, so assume success
            formStatus.textContent = 'Message sent successfully!';
            formStatus.style.color = 'green';
            form.reset();
        })
        .catch(error => {
            console.error('Error!', error.message);
            formStatus.textContent = 'Error sending message. Please try again.';
            formStatus.style.color = 'red';
        });
    });
}

// Preloader: hide when page is fully loaded and re‑enable scrolling
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Slight delay to ensure smooth transition
        setTimeout(() => {
            preloader.classList.add('hidden');
            // Allow scrolling again
            document.body.classList.remove('preloader-active');
        }, 3000);
    }
});
