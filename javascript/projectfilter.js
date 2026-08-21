// Project Category Tabs Filter
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!tabButtons.length || !projectCards.length) return;

    // Update dynamic counts on tabs
    const updateCategoryCounts = () => {
        const counts = {
            all: projectCards.length
        };

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (category) {
                counts[category] = (counts[category] || 0) + 1;
            }
        });

        tabButtons.forEach(btn => {
            const filterValue = btn.getAttribute('data-filter');
            const countElement = btn.querySelector('.tab-count');
            if (countElement) {
                countElement.textContent = counts[filterValue] || 0;
            }
        });
    };

    updateCategoryCounts();

    // Filter Click Handling
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            if (button.classList.contains('active')) return;

            // Update active states
            tabButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');

            // Animate card transitions
            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const shouldShow = filter === 'all' || cardCategory === filter;

                if (shouldShow) {
                    if (card.classList.contains('is-hidden')) {
                        card.classList.remove('is-hidden');
                        card.classList.remove('animating-out');
                        card.classList.add('animating-in');
                    }
                } else {
                    card.classList.add('animating-out');
                    setTimeout(() => {
                        if (card.classList.contains('animating-out')) {
                            card.classList.add('is-hidden');
                        }
                    }, 250);
                }
            });
        });
    });
});
