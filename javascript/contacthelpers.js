// Contact Helpers & Scroll Progress
document.addEventListener('DOMContentLoaded', () => {
    // 1. Copy Email functionality
    const copyEmailBtn = document.getElementById('copy-email-btn');
    const toastNotification = document.getElementById('toast-notification');
    let toastTimeout;

    const showToast = (message) => {
        if (!toastNotification) return;
        const toastText = toastNotification.querySelector('.toast-text');
        if (toastText) toastText.textContent = message;

        toastNotification.classList.add('show');
        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    };

    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'mm.maffi@outlook.com';
            try {
                await navigator.clipboard.writeText(email);
                showToast('E-mail copiado com sucesso!');
                
                // Visual feedback on the button
                const originalHTML = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHTML;
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = email;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                showToast('E-mail copiado com sucesso!');
            }
        });
    }

    // 2. Scroll Progress Bar
    const progressBar = document.querySelector('.scroll-progress-bar');
    const updateScrollProgress = () => {
        if (!progressBar) return;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
            const progress = (window.scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    updateScrollProgress();

    // 3. Highlight Active Navigation Links on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

    const highlightActiveNav = () => {
        const scrollY = window.pageYOffset + 120;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', highlightActiveNav, { passive: true });
});
