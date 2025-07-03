document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile navigation toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navbarToggler.addEventListener('click', function() {
        navbarCollapse.classList.toggle('show');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(navLink => {
        navLink.addEventListener('click', () => {
            navbarCollapse.classList.remove('show');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission handling
    const contactForm = document.getElementById('portfolio-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Format the message for WhatsApp
            const whatsappMessage = `New Contact Form Submission:%0A%0A` +
                                   `*Name:* ${name}%0A` +
                                   `*Email:* ${email}%0A` +
                                   `*Subject:* ${subject}%0A` +
                                   `*Message:* ${message}`;
            
            // Open WhatsApp with the pre-filled message
            window.open(`https://wa.me/23230497625?text=${whatsappMessage}`, '_blank');
            
            // Show success message
            const successAlert = `
                <div class="alert alert-success alert-dismissible fade show mt-3" role="alert">
                    <strong>Redirecting to WhatsApp...</strong> You'll now be able to send this message.
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            `;
            
            this.insertAdjacentHTML('afterend', successAlert);
            
            // Reset form
            this.reset();
            
            // Remove alert after 5 seconds
            setTimeout(() => {
                const alert = document.querySelector('.alert');
                if (alert) {
                    const bootstrapAlert = new bootstrap.Alert(alert);
                    bootstrapAlert.close();
                }
            }, 5000);
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(animateOnScroll, observerOptions);
    
    // Elements to animate
    const sections = document.querySelectorAll('section');
    const cards = document.querySelectorAll('.card');
    const progressBars = document.querySelectorAll('.progress-bar');
    
    sections.forEach(section => observer.observe(section));
    cards.forEach(card => observer.observe(card));
    
    // Animate progress bars when they come into view
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const width = progressBar.style.width;
                progressBar.style.width = '0';
                
                setTimeout(() => {
                    progressBar.style.width = width;
                    progressBar.style.transition = 'width 1.5s ease-out';
                }, 100);
                
                progressObserver.unobserve(progressBar);
            }
        });
    }, { threshold: 0.5 });
    
    progressBars.forEach(bar => progressObserver.observe(bar));

    // Typewriter effect for hero subtitle
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const professions = [
            "Network Engineer",
            "Web Developer",
            "Graphic Designer",
            "Tech Enthusiast"
        ];
        
        let currentProfession = 0;
        let charIndex = 0;
        let isDeleting = false;
        let isEnd = false;
        
        function type() {
            const fullTxt = professions[currentProfession];
            
            if (isDeleting) {
                heroSubtitle.textContent = fullTxt.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroSubtitle.textContent = fullTxt.substring(0, charIndex + 1);
                charIndex++;
            }
            
            if (!isDeleting && charIndex === fullTxt.length) {
                isEnd = true;
                isDeleting = true;
                setTimeout(type, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentProfession = (currentProfession + 1) % professions.length;
                setTimeout(type, 500);
            } else {
                const speed = isDeleting ? 100 : 150;
                setTimeout(type, speed);
            }
        }
        
        setTimeout(type, 1000);
    }

    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // Tooltip initialization
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Popover initialization
    const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.map(function(popoverTriggerEl) {
        return new bootstrap.Popover(popoverTriggerEl);
    });
});
