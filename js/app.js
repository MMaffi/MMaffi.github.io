/* ==========================================================================
   MMaffi Portfolio — Unified High-Performance Application Controller
   - Single passive rAF scroll handler (cached metrics, pure GPU transforms)
   - IntersectionObserver nav spy & reveal animations (zero layout thrashing)
   - Theme persistence, mobile drawer, IDE code tabs, project filter & modal,
     contact helpers, async form & Easter Egg
   ========================================================================== */

(() => {
    'use strict';

    const RING_CIRCUMFERENCE = 2 * Math.PI * 22; // r=22 => 138.23

    document.addEventListener('DOMContentLoaded', () => {
        initTheme();
        initScrollController();
        initNavSpy();
        initRevealAnimations();
        initMobileMenu();
        initCodeShowcase();
        initProjectsSection();
        initProjectModal();
        initContactHelpers();
        initFooterExtras();
    });

    /* ----------------------------------------------------------------------
       Toast Helper
       ---------------------------------------------------------------------- */
    let toastTimer = null;
    function showToast(message) {
        const toast = document.getElementById('toast-notification');
        if (!toast) return;
        const textEl = toast.querySelector('.toast-text');
        if (textEl) textEl.textContent = message;

        toast.classList.add('is-visible');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
            toast.classList.remove('is-visible');
        }, 3200);
    }

    async function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    }

    /* ----------------------------------------------------------------------
       1. Theme Manager (synced on <html> to prevent FOUC)
       ---------------------------------------------------------------------- */
    function initTheme() {
        const root = document.documentElement;
        const toggleBtn = document.getElementById('theme-toggle');
        const metaTheme = document.querySelector('meta[name="theme-color"]');

        const syncUI = (isLight) => {
            root.classList.toggle('light-mode', isLight);
            if (metaTheme) {
                metaTheme.setAttribute('content', isLight ? '#f8fafc' : '#07080d');
            }
            if (toggleBtn) {
                toggleBtn.innerHTML = isLight
                    ? '<i class="fas fa-sun" aria-hidden="true"></i>'
                    : '<i class="fas fa-moon" aria-hidden="true"></i>';
                toggleBtn.setAttribute(
                    'aria-label',
                    isLight ? 'Ativar modo escuro' : 'Ativar modo claro'
                );
            }
        };

        const initialLight = root.classList.contains('light-mode');
        syncUI(initialLight);

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                document.body.classList.add('theme-transitioning');
                const nextLight = !root.classList.contains('light-mode');
                syncUI(nextLight);
                try {
                    localStorage.setItem('theme', nextLight ? 'light-mode' : 'dark-mode');
                } catch (_) {}
                window.setTimeout(() => {
                    document.body.classList.remove('theme-transitioning');
                }, 300);
            });
        }
    }

    /* ----------------------------------------------------------------------
       2. Single Passive rAF Scroll Controller (Zero Layout Thrashing)
       ---------------------------------------------------------------------- */
    function initScrollController() {
        const header = document.getElementById('site-header');
        const progressBar = document.getElementById('scroll-progress');
        const backToTopBtn = document.getElementById('back-to-top');
        const backToTopRing = document.getElementById('back-to-top-ring');

        let maxScroll = 1;
        let rafPending = false;
        let lastScrolledState = false;
        let lastTopVisibleState = false;

        const measureMaxScroll = () => {
            maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        };

        const updateFrame = () => {
            rafPending = false;
            const y = window.scrollY;
            const ratio = Math.min(1, Math.max(0, y / maxScroll));

            if (progressBar) {
                progressBar.style.transform = `scaleX(${ratio})`;
            }

            const isScrolled = y > 40;
            if (header && isScrolled !== lastScrolledState) {
                header.classList.toggle('is-scrolled', isScrolled);
                lastScrolledState = isScrolled;
            }

            const showTopBtn = y > 360;
            if (backToTopBtn && showTopBtn !== lastTopVisibleState) {
                backToTopBtn.classList.toggle('is-visible', showTopBtn);
                lastTopVisibleState = showTopBtn;
            }

            if (backToTopRing && showTopBtn) {
                const offset = RING_CIRCUMFERENCE * (1 - ratio);
                backToTopRing.style.strokeDashoffset = offset.toFixed(2);
            }
        };

        const scheduleUpdate = () => {
            if (!rafPending) {
                rafPending = true;
                window.requestAnimationFrame(updateFrame);
            }
        };

        measureMaxScroll();
        updateFrame();

        window.addEventListener('scroll', scheduleUpdate, { passive: true });
        window.addEventListener(
            'resize',
            () => {
                measureMaxScroll();
                scheduleUpdate();
            },
            { passive: true }
        );

        // Re-measure when layout height changes (e.g., filtering projects)
        if ('ResizeObserver' in window) {
            const ro = new ResizeObserver(() => {
                measureMaxScroll();
                scheduleUpdate();
            });
            ro.observe(document.body);
        }

        if (backToTopBtn) {
            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    /* ----------------------------------------------------------------------
       3. Active Navigation Highlight via IntersectionObserver (Zero Layout Reads)
       ---------------------------------------------------------------------- */
    function initNavSpy() {
        const sections = document.querySelectorAll('main section[id]');
        const navLinks = Array.from(document.querySelectorAll('.nav-menu .nav-link[href^="#"]'));
        if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

        const linkMap = new Map();
        navLinks.forEach((link) => {
            const id = link.getAttribute('href').slice(1);
            linkMap.set(id, link);
        });

        let activeId = 'home';
        const setActive = (id) => {
            if (!id || id === activeId || !linkMap.has(id)) return;
            activeId = id;
            navLinks.forEach((link) => link.classList.remove('active'));
            linkMap.get(id).classList.add('active');
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActive(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-28% 0px -58% 0px',
                threshold: 0
            }
        );

        sections.forEach((sec) => observer.observe(sec));
    }

    /* ----------------------------------------------------------------------
       4. Performant Scroll Reveal Animations
       ---------------------------------------------------------------------- */
    function initRevealAnimations() {
        const elements = document.querySelectorAll('.reveal:not(.is-visible)');
        if (!elements.length) return;

        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced || !('IntersectionObserver' in window)) {
            elements.forEach((el) => el.classList.add('is-visible'));
            return;
        }

        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08,
                rootMargin: '0px 0px -36px 0px'
            }
        );

        elements.forEach((el) => observer.observe(el));
    }

    /* ----------------------------------------------------------------------
       5. Accessible Mobile Drawer Menu
       ---------------------------------------------------------------------- */
    function initMobileMenu() {
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('nav-menu');
        const backdrop = document.getElementById('mobile-backdrop');
        if (!btn || !menu) return;

        const setOpen = (open) => {
            menu.classList.toggle('is-open', open);
            if (backdrop) backdrop.classList.toggle('is-open', open);
            btn.setAttribute('aria-expanded', String(open));
            btn.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
            btn.innerHTML = open
                ? '<i class="fas fa-times" aria-hidden="true"></i>'
                : '<i class="fas fa-bars" aria-hidden="true"></i>';
            document.body.style.overflow = open ? 'hidden' : '';
        };

        btn.addEventListener('click', () => {
            setOpen(!menu.classList.contains('is-open'));
        });

        if (backdrop) {
            backdrop.addEventListener('click', () => setOpen(false));
        }

        menu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setOpen(false));
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && menu.classList.contains('is-open')) {
                setOpen(false);
            }
        });
    }

    /* ----------------------------------------------------------------------
       6. Hero Interactive Code Showcase (Tabs + Copy Snippet)
       ---------------------------------------------------------------------- */
    function initCodeShowcase() {
        const tabs = document.querySelectorAll('.code-tab');
        const panels = document.querySelectorAll('.code-panel');
        const copyBtn = document.getElementById('copy-code-btn');

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                const target = tab.getAttribute('data-code-tab');
                tabs.forEach((t) => {
                    t.classList.remove('active');
                    t.setAttribute('aria-selected', 'false');
                });
                panels.forEach((p) => p.classList.remove('active'));

                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                const activePanel = document.getElementById(`code-panel-${target}`);
                if (activePanel) activePanel.classList.add('active');
            });
        });

        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                const activePanel = document.querySelector('.code-panel.active');
                if (!activePanel) return;

                const lines = Array.from(activePanel.querySelectorAll('.code-text')).map((el) => {
                    const prefix = el.classList.contains('indent-2')
                        ? '    '
                        : el.classList.contains('indent-1')
                            ? '  '
                            : '';
                    return prefix + el.textContent.trim();
                });

                try {
                    await copyToClipboard(lines.join('\n'));
                    copyBtn.innerHTML = '<i class="fas fa-check" style="color: #34d399;" aria-hidden="true"></i>';
                    showToast('Trecho de código copiado!');
                    setTimeout(() => {
                        copyBtn.innerHTML = '<i class="fas fa-copy" aria-hidden="true"></i>';
                    }, 1800);
                } catch (_) {
                    showToast('Não foi possível copiar o trecho.');
                }
            });
        }
    }

    /* ----------------------------------------------------------------------
       7. Projects Category Filter + Debounced Instant Search
       ---------------------------------------------------------------------- */
    function initProjectsSection() {
        const tabButtons = document.querySelectorAll('.filter-tabs .tab-btn');
        const cards = Array.from(document.querySelectorAll('#projects-grid .project-card'));
        const searchInput = document.getElementById('project-search-input');
        const searchClear = document.getElementById('project-search-clear');
        const emptyState = document.getElementById('projects-empty-state');
        const resetBtn = document.getElementById('reset-project-filters');
        const countLabel = document.getElementById('projects-count-label');

        if (!cards.length) return;

        // Precompute searchable lowercase text once for O(1) filter checks
        const cardIndex = cards.map((card) => ({
            el: card,
            category: card.getAttribute('data-category') || 'web',
            text: card.textContent.toLowerCase()
        }));

        // Dynamic tab badge counts
        const counts = { all: cards.length };
        cardIndex.forEach(({ category }) => {
            counts[category] = (counts[category] || 0) + 1;
        });
        tabButtons.forEach((btn) => {
            const filter = btn.getAttribute('data-filter');
            const badge = btn.querySelector('.tab-count');
            if (badge) badge.textContent = String(counts[filter] || 0);
        });

        let currentCategory = 'all';
        let currentQuery = '';

        const applyFilters = () => {
            const q = currentQuery.trim().toLowerCase();
            let visible = 0;

            cardIndex.forEach(({ el, category, text }) => {
                const matchCat = currentCategory === 'all' || category === currentCategory;
                const matchQuery = !q || text.includes(q);
                const show = matchCat && matchQuery;
                el.classList.toggle('is-hidden', !show);
                if (show) {
                    el.classList.add('is-visible');
                    visible++;
                }
            });

            if (countLabel) {
                countLabel.textContent = `Exibindo ${visible} de ${cards.length} projetos`;
            }

            if (emptyState) {
                emptyState.classList.toggle('is-visible', visible === 0);
            }
        };

        tabButtons.forEach((btn) => {
            btn.addEventListener('click', () => {
                const next = btn.getAttribute('data-filter');
                if (next === currentCategory) return;
                currentCategory = next;
                tabButtons.forEach((b) => {
                    const active = b === btn;
                    b.classList.toggle('active', active);
                    b.setAttribute('aria-selected', String(active));
                });
                applyFilters();
            });
        });

        if (searchInput) {
            let debounceTimer = null;
            searchInput.addEventListener('input', (e) => {
                currentQuery = e.target.value;
                if (searchClear) {
                    searchClear.classList.toggle('is-visible', currentQuery.length > 0);
                }
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(applyFilters, 110);
            });
        }

        if (searchClear && searchInput) {
            searchClear.addEventListener('click', () => {
                searchInput.value = '';
                currentQuery = '';
                searchClear.classList.remove('is-visible');
                searchInput.focus();
                applyFilters();
            });
        }

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                currentCategory = 'all';
                currentQuery = '';
                if (searchInput) searchInput.value = '';
                if (searchClear) searchClear.classList.remove('is-visible');
                tabButtons.forEach((b) => {
                    const isAll = b.getAttribute('data-filter') === 'all';
                    b.classList.toggle('active', isAll);
                    b.setAttribute('aria-selected', String(isAll));
                });
                applyFilters();
            });
        }
    }

    /* ----------------------------------------------------------------------
       8. Technical Case Study Modal
       ---------------------------------------------------------------------- */
    function initProjectModal() {
        const overlay = document.getElementById('project-modal');
        const closeBtn = document.getElementById('project-modal-close');
        const imgEl = document.getElementById('modal-project-image');
        const badgeEl = document.getElementById('modal-project-badge');
        const titleEl = document.getElementById('modal-project-title');
        const taglineEl = document.getElementById('modal-project-tagline');
        const descEl = document.getElementById('modal-project-desc');
        const highlightsEl = document.getElementById('modal-project-highlights');
        const techEl = document.getElementById('modal-project-tech');
        const linksEl = document.getElementById('modal-project-links');

        if (!overlay) return;

        let lastFocusedTrigger = null;

        const openModal = (key, triggerEl) => {
            const data = window.PORTFOLIO_PROJECTS && window.PORTFOLIO_PROJECTS[key];
            if (!data) return;

            lastFocusedTrigger = triggerEl || null;
            imgEl.src = data.image;
            imgEl.alt = data.title;

            badgeEl.className = data.isOffline ? 'modal-badge is-offline' : 'modal-badge';
            badgeEl.innerHTML = data.isOffline
                ? `<i class="fas fa-archive" aria-hidden="true"></i> ${data.badge}`
                : `<i class="fas fa-layer-group" aria-hidden="true"></i> ${data.badge}`;

            titleEl.textContent = data.title;
            taglineEl.textContent = data.tagline;
            descEl.textContent = data.description;

            highlightsEl.innerHTML = data.highlights
                .map((item) => `<li><i class="fas fa-check-circle" aria-hidden="true"></i><span>${item}</span></li>`)
                .join('');

            techEl.innerHTML = data.tech
                .map((tag) => `<span class="tech-tag">${tag}</span>`)
                .join('');

            let footerHtml = '';
            if (data.isOffline) {
                footerHtml = `
                    <div class="modal-status-notice">
                        <i class="fas fa-info-circle" aria-hidden="true"></i>
                        <span>${data.offlineNotice || 'Projeto offline — apenas especificações técnicas disponíveis.'}</span>
                    </div>
                `;
            } else {
                if (data.demoUrl) {
                    footerHtml += `
                        <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer"
                           class="project-btn project-btn-primary">
                            <i class="fas fa-external-link-alt" aria-hidden="true"></i> ${data.demoLabel || 'Ver Demo'}
                        </a>
                    `;
                }
                if (data.repoUrl) {
                    footerHtml += `
                        <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer"
                           class="project-btn project-btn-secondary">
                            <i class="fab fa-github" aria-hidden="true"></i> Repositório GitHub
                        </a>
                    `;
                }
            }
            linksEl.innerHTML = footerHtml;

            overlay.classList.add('is-open');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (closeBtn) closeBtn.focus();
        };

        const closeModal = () => {
            if (!overlay.classList.contains('is-open')) return;
            overlay.classList.remove('is-open');
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (lastFocusedTrigger) {
                lastFocusedTrigger.focus();
                lastFocusedTrigger = null;
            }
        };

        document.querySelectorAll('[data-project-modal]').forEach((btn) => {
            btn.addEventListener('click', () => {
                openModal(btn.getAttribute('data-project-modal'), btn);
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
                closeModal();
            }
        });
    }

    /* ----------------------------------------------------------------------
       9. Contact Helpers (Copy Email, Subject Pills, Async FormSubmit)
       ---------------------------------------------------------------------- */
    function initContactHelpers() {
        const copyEmailBtn = document.getElementById('copy-email-btn');
        if (copyEmailBtn) {
            copyEmailBtn.addEventListener('click', async () => {
                try {
                    await copyToClipboard('mm.maffi@outlook.com');
                    showToast('E-mail copiado com sucesso!');
                    const original = copyEmailBtn.innerHTML;
                    copyEmailBtn.innerHTML = '<i class="fas fa-check" aria-hidden="true"></i> Copiado!';
                    setTimeout(() => {
                        copyEmailBtn.innerHTML = original;
                    }, 2000);
                } catch (_) {
                    showToast('Copie manualmente: mm.maffi@outlook.com');
                }
            });
        }

        const pills = document.querySelectorAll('.subject-pill');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        pills.forEach((pill) => {
            pill.addEventListener('click', () => {
                pills.forEach((p) => p.classList.remove('active'));
                pill.classList.add('active');
                if (subjectInput) {
                    subjectInput.value = pill.getAttribute('data-subject') || '';
                    subjectInput.focus();
                }
                if (messageInput && !messageInput.value.trim()) {
                    const hint = pill.getAttribute('data-placeholder');
                    if (hint) messageInput.placeholder = hint;
                }
            });
        });

        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalHTML = submitBtn ? submitBtn.innerHTML : '';

                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i> Enviando...';
                }

                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: new FormData(contactForm),
                        headers: { Accept: 'application/json' }
                    });
                    if (response.ok) {
                        showToast('Mensagem enviada com sucesso! Responderei em breve.');
                    } else {
                        showToast('Mensagem recebida! Responderei em breve.');
                    }
                    contactForm.reset();
                    pills.forEach((p) => p.classList.remove('active'));
                } catch (_) {
                    showToast('Conexão instável. Você pode enviar direto para mm.maffi@outlook.com');
                } finally {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = originalHTML;
                    }
                }
            });
        }
    }

    /* ----------------------------------------------------------------------
       10. Dynamic Year & Footer 5-Click Easter Egg
       ---------------------------------------------------------------------- */
    function initFooterExtras() {
        const yearSpan = document.getElementById('current-year');
        if (yearSpan) {
            yearSpan.textContent = String(new Date().getFullYear());
        }

        const footerLogo = document.getElementById('footer-logo');
        const easterEgg = document.getElementById('easter-egg-animation');
        if (!footerLogo || !easterEgg) return;

        let clickCount = 0;
        let clickTimer = null;

        footerLogo.addEventListener('click', () => {
            clickCount++;
            clearTimeout(clickTimer);
            clickTimer = setTimeout(() => {
                clickCount = 0;
            }, 2000);

            if (clickCount === 5) {
                clickCount = 0;
                easterEgg.classList.remove('is-hidden');
                easterEgg.setAttribute('aria-hidden', 'false');
                setTimeout(() => {
                    window.location.href = 'https://mmaffi.github.io/OLD_PORTFOLIO/index.html';
                }, 5600);
            }
        });
    }
})();
