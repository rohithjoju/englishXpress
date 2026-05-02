document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.fade-in-up');
    animateElements.forEach(el => observer.observe(el));

    // Form Submission Handling
    const contactForm = document.getElementById('mainContactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value || 'Not provided';
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Construct mailto link
            const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0APhone: ${phone}%0D%0A%0D%0AMessage:%0D%0A${message}`;
            const mailtoLink = `mailto:info@englishxpress.com?subject=${encodeURIComponent(subject)}&body=${body}`;

            // Open default email client
            window.location.href = mailtoLink;
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            
            submitBtn.innerText = 'Opening Email Client...';
            
            // Revert button after 3 seconds
            setTimeout(() => {
                submitBtn.innerText = originalText;
                contactForm.reset();
            }, 3000);
        });
    }
});
