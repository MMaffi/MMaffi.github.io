// Inicializar partículas
document.addEventListener('DOMContentLoaded', function() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6c63ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c63ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
});

// Theme Toggle
const themeToggles = document.querySelectorAll('.theme-toggle');
const body = document.body;

// Aplica o tema salvo ou padrão
const savedTheme = localStorage.getItem('theme') || 'dark-mode';
body.classList.add(savedTheme);
themeToggles.forEach(themeToggle => {
    themeToggle.innerHTML = savedTheme === 'dark-mode'
        ? '<i class="fas fa-moon"></i>'
        : '<i class="fas fa-sun"></i>';
    themeToggle.style.transform = savedTheme === 'dark-mode' ? 'rotate(0deg)' : 'rotate(180deg)';
});

themeToggles.forEach(themeToggle => {
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeToggles.forEach(btn => {
                btn.innerHTML = '<i class="fas fa-sun"></i>';
                btn.style.transform = 'rotate(180deg)';
            });
            localStorage.setItem('theme', 'light-mode');
        } else {
            body.classList.remove('light-mode');
            body.classList.add('dark-mode');
            themeToggles.forEach(btn => {
                btn.innerHTML = '<i class="fas fa-moon"></i>';
                btn.style.transform = 'rotate(0deg)';
            });
            localStorage.setItem('theme', 'dark-mode');
        }
    });
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Advanced Back to Top Button with Water Effect
const backToTopBtn = document.querySelector('.back-to-top');
const waterFill = document.querySelector('.water-fill');

window.addEventListener('scroll', () => {
    const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const scrollPercentage = (scrollPosition / scrollTotal) * 100;
    
    if (scrollPosition > 300) {
        backToTopBtn.classList.add('show');
        waterFill.style.height = `${Math.min(scrollPercentage, 100)}%`;
    } else {
        backToTopBtn.classList.remove('show');
        waterFill.style.height = '0%';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Advanced Scroll Animations
const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');

const fadeInOnScroll = () => {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', fadeInOnScroll);
fadeInOnScroll();

// Floating elements animation
const floatingElements = document.querySelectorAll('.floating-element');
floatingElements.forEach((el, index) => {
    el.style.animationDelay = `${index * 2}s`;
});