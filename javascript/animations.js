// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// High-Performance Scroll Animations via IntersectionObserver
const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');

if ('IntersectionObserver' in window) {
    const appearObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    });

    fadeElements.forEach(el => appearObserver.observe(el));
} else {
    // Fallback for older browsers
    fadeElements.forEach(el => el.classList.add('visible'));
}

// Floating elements animation delay
const floatingElements = document.querySelectorAll('.floating-element');
floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 2}s`;
});

// Interactive Hero Code Showcase Tabs
document.addEventListener('DOMContentLoaded', () => {
    const codeTabs = document.querySelectorAll('.code-tab');
    const codePanels = document.querySelectorAll('.code-panel');

    if (codeTabs.length && codePanels.length) {
        codeTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetPanel = tab.getAttribute('data-code-tab');
                codeTabs.forEach(t => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                codePanels.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                const panel = document.getElementById(`code-panel-${targetPanel}`);
                if (panel) panel.classList.add('active');
            });
        });
    }
});
