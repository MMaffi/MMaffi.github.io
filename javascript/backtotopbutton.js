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