document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const icon = mobileBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
});

// --- WhatsApp Modal Logic ---
document.addEventListener('DOMContentLoaded', () => {
    const modalHTML = `
        <div class="modal-overlay" id="whatsappModal">
            <div class="modal-content">
                <button class="modal-close" id="closeModalBtn"><i class="fas fa-times"></i></button>
                <div class="modal-header">
                    <h3>Get Started</h3>
                    <p>Enter your details and we'll connect you on WhatsApp instantly.</p>
                </div>
                <form id="whatsappForm">
                    <div class="form-group">
                        <label for="waName">Full Name</label>
                        <input type="text" id="waName" class="form-control" required placeholder="Your Name">
                    </div>
                    <div class="form-group">
                        <label for="waCourse">Course of Interest</label>
                        <select id="waCourse" class="form-control" required>
                            <option value="General Assessment">General Assessment</option>
                            <option value="IELTS Preparation">IELTS Preparation</option>
                            <option value="Interview Training">Interview Training</option>
                            <option value="Spoken English">Spoken English</option>
                        </select>
                    </div>
                    <button type="submit" class="btn btn-whatsapp">
                        <i class="fab fa-whatsapp"></i> Continue to WhatsApp
                    </button>
                </form>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('whatsappModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const form = document.getElementById('whatsappForm');
    const courseSelect = document.getElementById('waCourse');
    
    // Open modal on clicking CTA buttons
    const enrollBtns = document.querySelectorAll('.whatsapp-enroll-btn');
    enrollBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Select the correct course in dropdown if data attribute is present
            const courseData = btn.getAttribute('data-course');
            if(courseData) {
                for(let i = 0; i < courseSelect.options.length; i++) {
                    if(courseSelect.options[i].value === courseData) {
                        courseSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            
            modal.classList.add('active');
        });
    });

    // Close modal
    const closeModal = () => {
        modal.classList.remove('active');
    };

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Handle form submission and redirect to WhatsApp
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('waName').value;
        const course = document.getElementById('waCourse').value;
        
        // This is the number you want the WhatsApp messages to go to.
        // Needs country code without '+', e.g., '919876543210' for India.
        const targetNumber = '919400940234'; 
        
        const message = `Hello EnglishXpress!\nMy name is ${name}. I am interested in the *${course}* program. Could you provide me with more details?`;
        
        const whatsappUrl = `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
        
        window.open(whatsappUrl, '_blank');
        closeModal();
        form.reset();
    });
});
