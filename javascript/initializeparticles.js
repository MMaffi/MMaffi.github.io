// Responsive and Performance-Optimized Particles Initialization
document.addEventListener('DOMContentLoaded', function () {
    if (typeof particlesJS === 'undefined') return;

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

    // Dynamically adjust particle density and interactivity based on device tier
    const particleCount = isMobile ? 28 : (isTablet ? 45 : 70);
    const particleSpeed = isMobile ? 1.0 : 1.8;
    const lineDistance = isMobile ? 110 : 140;

    particlesJS('particles-js', {
        particles: {
            number: {
                value: particleCount,
                density: {
                    enable: true,
                    value_area: isMobile ? 600 : 800
                }
            },
            color: {
                value: "#6366f1"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: isMobile ? 0.35 : 0.45,
                random: true
            },
            size: {
                value: isMobile ? 2 : 2.8,
                random: true
            },
            line_linked: {
                enable: true,
                distance: lineDistance,
                color: "#6366f1",
                opacity: isMobile ? 0.12 : 0.18,
                width: 1
            },
            move: {
                enable: true,
                speed: particleSpeed,
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
                // Disable hover on touch devices to conserve CPU and battery
                onhover: {
                    enable: !isMobile,
                    mode: "repulse"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                repulse: {
                    distance: 100,
                    duration: 0.4
                },
                push: {
                    particles_nb: isMobile ? 2 : 4
                }
            }
        },
        retina_detect: true
    });
});