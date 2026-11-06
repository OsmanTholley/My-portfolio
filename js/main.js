document.addEventListener('DOMContentLoaded', () => {
    const year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    const navbar = document.querySelector('.site-nav');
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.getElementById('navbarNav');

    if (navbar && 'IntersectionObserver' in window) {
        const topSentinel = document.createElement('span');
        topSentinel.className = 'nav-scroll-sentinel';
        topSentinel.setAttribute('aria-hidden', 'true');
        document.body.prepend(topSentinel);
        const navObserver = new IntersectionObserver(([entry]) => {
            navbar.classList.toggle('nav-scrolled', !entry.isIntersecting);
        });
        navObserver.observe(topSentinel);
    } else if (navbar) {
        window.addEventListener('scroll', () => navbar.classList.toggle('nav-scrolled', window.scrollY > 24), { passive: true });
    }

    if (navbarToggler && navbarCollapse && window.bootstrap) {
        const collapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
        navbarToggler.addEventListener('click', () => {
            collapse.toggle();
            navbarToggler.setAttribute('aria-expanded', String(navbarToggler.getAttribute('aria-expanded') !== 'true'));
        });
        navbarCollapse.querySelectorAll('.nav-link, .nav-contact').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 992) {
                    collapse.hide();
                    navbarToggler.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const selector = link.getAttribute('href');
            if (!selector || selector === '#') return;
            const target = document.querySelector(selector);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        });
    });

    const filterButtons = document.querySelectorAll('.filter-button');
    const projectItems = document.querySelectorAll('.project-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.dataset.filter;
            filterButtons.forEach(item => {
                const selected = item === button;
                item.classList.toggle('active', selected);
                item.setAttribute('aria-pressed', String(selected));
            });
            projectItems.forEach(item => {
                item.hidden = filter !== 'all' && item.dataset.category !== filter;
            });
        });
    });

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            if (!contactForm.reportValidity()) return;

            const formData = new FormData(contactForm);
            const name = String(formData.get('name') || '').trim();
            const email = String(formData.get('email') || '').trim();
            const subject = String(formData.get('subject') || '').trim();
            const message = String(formData.get('message') || '').trim();
            const fullMessage = `Hello Osman,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
            const method = event.submitter?.dataset.contactMethod || 'email';
            const status = document.getElementById('form-status');

            if (method === 'whatsapp') {
                const whatsappUrl = `https://wa.me/23230497625?text=${encodeURIComponent(`${subject}\n\n${fullMessage}`)}`;
                window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
                if (status) status.textContent = 'WhatsApp opened with your message. Review it there and press send when ready.';
                return;
            }

            const mailto = `mailto:tholleyosman87@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(fullMessage)}`;
            window.location.href = mailto;
            if (status) status.textContent = 'Your email app should open with the message ready. Review it and press send to finish.';
        });
    }

    const animatedItems = document.querySelectorAll('.project-card, .skill-panel, .about-photo');
    if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        animatedItems.forEach(item => {
            item.classList.add('reveal');
            revealObserver.observe(item);
        });
    }
});
