// Intersection Observer for scroll animations
document.addEventListener('DOMContentLoaded', function() {
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
    const projectCards = document.querySelectorAll('.project-card');
    const skillItems = document.querySelectorAll('.skill-item');
    
    sections.forEach(section => observer.observe(section));
    projectCards.forEach(card => observer.observe(card));
    skillItems.forEach(item => observer.observe(item));
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-level');
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                setTimeout(() => {
                    entry.target.style.width = width;
                }, 100);
                
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => skillObserver.observe(bar));
});