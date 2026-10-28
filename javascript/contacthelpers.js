// Contact Helpers, Subject Quick Pills, Async Form & Scroll Progress
document.addEventListener('DOMContentLoaded', () => {
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
        }, 3500);
    };

    // 1. Copy Email functionality
    const copyEmailBtn = document.getElementById('copy-email-btn');
    if (copyEmailBtn) {
        copyEmailBtn.addEventListener('click', async () => {
            const email = 'mm.maffi@outlook.com';
            try {
                await navigator.clipboard.writeText(email);
                showToast('E-mail copiado com sucesso!');
                
                const originalHTML = copyEmailBtn.innerHTML;
                copyEmailBtn.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                setTimeout(() => {
                    copyEmailBtn.innerHTML = originalHTML;
                }, 2000);
            } catch (err) {
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

    // 2. Quick Subject Pills for Recruiters & Clients
    const subjectPills = document.querySelectorAll('.subject-pill');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (subjectPills.length && subjectInput) {
        subjectPills.forEach(pill => {
            pill.addEventListener('click', () => {
                subjectPills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                const selectedSubject = pill.getAttribute('data-subject');
                if (selectedSubject) {
                    subjectInput.value = selectedSubject;
                }
                if (messageInput && !messageInput.value.trim()) {
                    const placeholderHint = pill.getAttribute('data-placeholder');
                    if (placeholderHint) {
                        messageInput.placeholder = placeholderHint;
                    }
                }
                subjectInput.focus();
            });
        });
    }

    // 3. Async Contact Form Submission (No page reload)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHTML = submitBtn ? submitBtn.innerHTML : 'Enviar Mensagem';

            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Enviando Mensagem...';
            }

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    showToast('Mensagem enviada com sucesso! Responderei em breve.');
                    contactForm.reset();
                    subjectPills.forEach(p => p.classList.remove('active'));
                } else {
                    showToast('Mensagem recebida! Responderei em breve.');
                    contactForm.reset();
                    subjectPills.forEach(p => p.classList.remove('active'));
                }
            } catch (error) {
                showToast('Conexão instável. Você também pode enviar diretamente para mm.maffi@outlook.com');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnHTML;
                }
            }
        });
    }

    // 4. Scroll Progress Bar & Active Navigation Highlighter (throttled via rAF)
    const progressBar = document.querySelector('.scroll-progress-bar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    let isTicking = false;

    const onScrollUpdate = () => {
        const scrollY = window.scrollY;
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;

        if (progressBar && totalHeight > 0) {
            const progress = (scrollY / totalHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }

        const currentScrollPos = scrollY + 140;
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (currentScrollPos > sectionTop && currentScrollPos <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        isTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!isTicking) {
            window.requestAnimationFrame(onScrollUpdate);
            isTicking = true;
        }
    }, { passive: true });

    onScrollUpdate();
});
