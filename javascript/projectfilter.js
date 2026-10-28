// Project Category Tabs Filter, Instant Search & Technical Case Study Modal
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const searchInput = document.getElementById('project-search-input');
    const searchClearBtn = document.getElementById('project-search-clear');
    const emptyState = document.getElementById('projects-empty-state');
    const resetSearchBtn = document.getElementById('reset-project-filters');

    let currentCategory = 'all';
    let currentSearch = '';

    // 1. Update dynamic counts on tabs
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

    // 2. Unified Filter Logic (Category + Search Query)
    const applyProjectFilters = () => {
        const normalizedQuery = currentSearch.trim().toLowerCase();
        let visibleCount = 0;

        projectCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            const cardText = card.textContent.toLowerCase();
            const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
            const matchesSearch = !normalizedQuery || cardText.includes(normalizedQuery);
            const shouldShow = matchesCategory && matchesSearch;

            if (shouldShow) {
                visibleCount++;
                if (card.classList.contains('is-hidden') || card.classList.contains('animating-out')) {
                    card.classList.remove('is-hidden', 'animating-out');
                    card.classList.add('animating-in');
                }
            } else {
                card.classList.remove('animating-in');
                card.classList.add('animating-out');
                setTimeout(() => {
                    if (card.classList.contains('animating-out')) {
                        card.classList.add('is-hidden');
                    }
                }, 220);
            }
        });

        if (emptyState) {
            emptyState.classList.toggle('visible', visibleCount === 0);
        }
    };

    // Category Tab Clicks
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            if (currentCategory === filter) return;

            currentCategory = filter;
            tabButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');

            applyProjectFilters();
        });
    });

    // Search Input Handling
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearch = e.target.value;
            if (searchClearBtn) {
                searchClearBtn.classList.toggle('visible', currentSearch.length > 0);
            }
            applyProjectFilters();
        });
    }

    if (searchClearBtn && searchInput) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearch = '';
            searchClearBtn.classList.remove('visible');
            searchInput.focus();
            applyProjectFilters();
        });
    }

    if (resetSearchBtn) {
        resetSearchBtn.addEventListener('click', () => {
            currentCategory = 'all';
            currentSearch = '';
            if (searchInput) searchInput.value = '';
            if (searchClearBtn) searchClearBtn.classList.remove('visible');
            tabButtons.forEach(b => {
                const isAll = b.getAttribute('data-filter') === 'all';
                b.classList.toggle('active', isAll);
                b.setAttribute('aria-selected', isAll ? 'true' : 'false');
            });
            applyProjectFilters();
        });
    }

    // 3. Technical Case Study Modal Data & Logic
    const projectDetailsData = {
        kyunfi: {
            title: 'Kyunfi — Gestão Financeira Pessoal de Alta Precisão',
            tagline: '"Seu dinheiro. Seu controle. Seu rumo." • Plataforma SaaS & PWA Full-Stack',
            badge: 'Destaque Principal • SaaS Financeiro',
            image: './images/projeto_kyunfi.webp',
            description: 'Plataforma completa, moderna e segura para controle financeiro pessoal, projetada com precisão matemática estrita para responder em tempo real quanto o usuário realmente pode gastar hoje ("Safe to Spend / Disponível Livre") sem comprometer faturas futuras, despesas recorrentes ou reservas blindadas.',
            highlights: [
                'Motor matemático de alta precisão com Decimal.js e DECIMAL(15,2) no MySQL (zero erros de ponto flutuante)',
                'Algoritmo exclusivo de Disponível Livre: desconta faturas abertas, despesas fixas de 30 dias e metas ativas',
                'Transações ACID atômicas (Sequelize + MySQL) com rollback automático para transferências, faturas e estornos',
                'Isolamento absoluto de usuário (Zero IDOR), autenticação JWT HttpOnly, Bcrypt (12 rounds) e 2FA TOTP nativo',
                'Projeção de fluxo de caixa preditivo a 90 dias, importação OFX, scanner inteligente, bot Telegram e Web Push',
                'Arquitetura limpa em camadas (App Router, Server Actions, Services, Repositories, Zod Schemas e Vitest)'
            ],
            tech: ['Next.js 16', 'React 19', 'TypeScript Strict', 'MySQL', 'Sequelize ORM', 'Decimal.js', 'Zod', 'TailwindCSS', '2FA / JWT', 'PWA & Web Push', 'Vitest'],
            demoUrl: 'https://kyunfi.vercel.app',
            demoLabel: 'Acessar Plataforma'
        },
        lembrei: {
            title: 'Lembrei — Sistema Inteligente de Lembretes & PWA',
            tagline: 'Produtividade contínua com notificações nativas em background',
            badge: 'Aplicação Web & PWA',
            image: './images/projeto_lembrei.webp',
            description: 'Aplicação web progressiva (PWA) instalável para gerenciamento inteligente de lembretes, tarefas e rotina, equipada com Web Push Notifications automáticas que alertam o usuário mesmo com o navegador fechado.',
            highlights: [
                'Notificações Push nativas via Web Push API e Service Workers em background',
                'Aplicativo PWA instalável em Android, iOS, Windows e macOS com experiência de app nativo',
                'Agendamento inteligente de alertas recorrentes e organização por prioridades',
                'Interface responsiva em Dark Mode com foco em velocidade de lançamento'
            ],
            tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'PWA', 'Service Workers', 'Web Push API'],
            demoUrl: 'https://lembrei-lembrei.vercel.app',
            demoLabel: 'Ver Demo ao Vivo'
        },
        meubar: {
            title: 'Meu Bar — Biblioteca Digital & Catálogo de Destilados',
            tagline: 'Experiência sensorial interativa e gestão de coleção',
            badge: 'Aplicação Web Full-Stack',
            image: './images/projeto_meubar.webp',
            description: 'Catálogo interativo e biblioteca digital de bebidas e destilados, permitindo explorar notas de degustação, perfis sensoriais detalhados, avaliações e comparativos diretos ("duelo de garrafas").',
            highlights: [
                'Sistema comparativo interativo ("Duelo de Garrafas") para análise lado a lado de rótulos',
                'Mapeamento de perfis sensoriais, notas aromáticas e harmonizações',
                'Filtros dinâmicos instantâneos por categoria, envelhecimento, país e faixa de preço',
                'Design editorial sofisticado com animações fluidas e alta performance'
            ],
            tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'API REST'],
            demoUrl: 'https://meubar-drinks.vercel.app',
            demoLabel: 'Ver Demo ao Vivo'
        },
        sitelens: {
            title: 'SiteLens Pro — Auditoria Inteligente de Sites',
            tagline: 'Diagnóstico técnico em tempo real de Performance, SEO e Segurança',
            badge: 'Ferramenta para Desenvolvedores',
            image: './images/projeto_sitelens.webp',
            description: 'Plataforma moderna para auditoria técnica instantânea de qualquer URL pública, inspecionando Segurança HTTP, Core Web Vitals, SEO Técnico, Acessibilidade WCAG 2.1 e Stack Tecnológica com plano de ação prioritário.',
            highlights: [
                'Varredura em tempo real de headers de segurança HTTP (CSP, HSTS, X-Frame-Options)',
                'Análise detalhada de SEO técnico, metatags, Open Graph e estrutura semântica',
                'Métricas de performance, Core Web Vitals e acessibilidade WCAG 2.1',
                'Comparador de domínios e geração de diagnóstico técnico acionável'
            ],
            tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'API REST', 'Web Vitals'],
            demoUrl: 'https://site-lens-pro.vercel.app/',
            demoLabel: 'Ver Demo ao Vivo'
        },
        firebird: {
            title: 'Gerenciador Firebird — Suite Desktop de Administração',
            tagline: 'Automação de backups, manutenção e diagnóstico de bancos Firebird SQL',
            badge: 'Aplicação Desktop Windows',
            image: './images/projeto_gerenciadorfirebird.webp',
            description: 'Software desktop desenvolvido em Python com interface gráfica moderna para simplificar a administração, rotinas de backup/restore, validação de integridade e manutenção de bancos de dados Firebird.',
            highlights: [
                'Execução automatizada de gbak (Backup & Restore) com logs detalhados em tempo real',
                'Verificação e reparo de integridade (gfix) sem necessidade de linha de comando manual',
                'Persistência de perfis de conexão e agendamento prático para administradores e suporte',
                'Distribuído com instalador executável (.exe) pronto para ambientes corporativos Windows'
            ],
            tech: ['Python', 'Tkinter GUI', 'Firebird SQL', 'JSON', 'Windows Installer'],
            demoUrl: 'https://github.com/MMaffi/gerenciador_firebird/releases/latest/download/GerenciadorFirebird_Installer.exe',
            demoLabel: 'Baixar Instalador .exe',
            repoUrl: 'https://github.com/MMaffi/gerenciador_firebird'
        }
    };

    const modalOverlay = document.getElementById('project-modal');
    const modalCloseBtn = document.getElementById('project-modal-close');
    const modalImage = document.getElementById('modal-project-image');
    const modalBadge = document.getElementById('modal-project-badge');
    const modalTitle = document.getElementById('modal-project-title');
    const modalTagline = document.getElementById('modal-project-tagline');
    const modalDesc = document.getElementById('modal-project-desc');
    const modalHighlights = document.getElementById('modal-project-highlights');
    const modalTech = document.getElementById('modal-project-tech');
    const modalLinks = document.getElementById('modal-project-links');

    const openProjectModal = (projectKey) => {
        const data = projectDetailsData[projectKey];
        if (!data || !modalOverlay) return;

        modalImage.src = data.image;
        modalImage.alt = data.title;
        modalBadge.innerHTML = `<i class="fas fa-layer-group"></i> ${data.badge}`;
        modalTitle.textContent = data.title;
        modalTagline.textContent = data.tagline;
        modalDesc.textContent = data.description;

        modalHighlights.innerHTML = data.highlights
            .map(item => `<li><i class="fas fa-check-circle"></i> <span>${item}</span></li>`)
            .join('');

        modalTech.innerHTML = data.tech
            .map(tag => `<span class="tech-tag">${tag}</span>`)
            .join('');

        let linksHtml = '';
        if (data.demoUrl) {
            linksHtml += `
                <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link project-link-primary">
                    <i class="fas fa-external-link-alt"></i> ${data.demoLabel || 'Ver Demo'}
                </a>
            `;
        }
        if (data.repoUrl) {
            linksHtml += `
                <a href="${data.repoUrl}" target="_blank" rel="noopener noreferrer" class="project-link project-link-secondary">
                    <i class="fab fa-github"></i> Repositório GitHub
                </a>
            `;
        }
        modalLinks.innerHTML = linksHtml;

        modalOverlay.classList.add('open');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    };

    const closeProjectModal = () => {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('open');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('[data-project-modal]').forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.getAttribute('data-project-modal');
            openProjectModal(key);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeProjectModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeProjectModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('open')) {
            closeProjectModal();
        }
    });
});
