/* ==========================================================================
   Project Technical Case Studies Data
   Single source of truth for the interactive Project Case Study Modal
   ========================================================================== */

window.PORTFOLIO_PROJECTS = {
    kyunfi: {
        title: 'Kyunfi — Gestão Financeira Pessoal de Alta Precisão',
        tagline: '"Seu dinheiro. Seu controle. Seu rumo." • Plataforma SaaS & PWA Full-Stack',
        badge: 'Destaque Principal • SaaS Financeiro',
        isOffline: false,
        image: './images/projeto_kyunfi.webp',
        description:
            'Plataforma completa, moderna e segura para controle financeiro pessoal, projetada com precisão matemática estrita para responder em tempo real quanto o usuário realmente pode gastar hoje ("Safe to Spend / Disponível Livre") sem comprometer faturas futuras, despesas recorrentes ou reservas blindadas.',
        highlights: [
            'Motor matemático de alta precisão com Decimal.js e DECIMAL(15,2) no MySQL (zero erros de ponto flutuante)',
            'Algoritmo exclusivo de Disponível Livre: desconta faturas abertas, despesas fixas de 30 dias e metas ativas',
            'Transações ACID atômicas (Sequelize + MySQL) com rollback automático para transferências, faturas e estornos',
            'Isolamento absoluto de usuário (Zero IDOR), autenticação JWT HttpOnly, Bcrypt (12 rounds) e 2FA TOTP nativo',
            'Projeção de fluxo de caixa preditivo a 90 dias, importação OFX, scanner inteligente, bot Telegram e Web Push',
            'Arquitetura limpa em camadas (App Router, Server Actions, Services, Repositories, Zod Schemas e Vitest)'
        ],
        tech: [
            'Next.js 16',
            'React 19',
            'TypeScript Strict',
            'MySQL',
            'Sequelize ORM',
            'Decimal.js',
            'Zod',
            'TailwindCSS',
            '2FA / JWT',
            'PWA & Web Push',
            'Vitest'
        ],
        demoUrl: 'https://kyunfi.com.br',
        demoLabel: 'Acessar Plataforma'
    },

    sitelens: {
        title: 'SiteLens Pro — Auditoria Inteligente de Sites',
        tagline: 'Diagnóstico técnico em tempo real de Performance, SEO e Segurança',
        badge: 'Ferramenta para Desenvolvedores • Online',
        isOffline: false,
        image: './images/projeto_sitelens.webp',
        description:
            'Plataforma moderna para auditoria técnica instantânea de qualquer URL pública, inspecionando Segurança HTTP, Core Web Vitals, SEO Técnico, Acessibilidade WCAG 2.1 e Stack Tecnológica com plano de ação prioritário.',
        highlights: [
            'Varredura em tempo real de headers de segurança HTTP (CSP, HSTS, X-Frame-Options, Referrer-Policy)',
            'Análise detalhada de SEO técnico, metatags, Open Graph, canonical e estrutura semântica',
            'Métricas de performance, Core Web Vitals e auditoria de acessibilidade WCAG 2.1',
            'Comparador de domínios e geração de diagnóstico técnico acionável'
        ],
        tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'API REST', 'Web Vitals'],
        demoUrl: 'https://site-lens-pro.vercel.app/',
        demoLabel: 'Ver Demo ao Vivo'
    },

    musicgallery: {
        title: 'Music Gallery — Galeria Full-Stack de Covers Musicais',
        tagline: 'Catálogo interativo integrado à YouTube API e PostgreSQL',
        badge: 'Aplicação Web Full-Stack • Online',
        isOffline: false,
        image: './images/projeto_musicgallery.webp',
        description:
            'Aplicação web full-stack criada para organizar, categorizar e reproduzir covers musicais com experiência imersiva, combinando front-end reativo em React, back-end Node.js e integração direta com a API do YouTube.',
        highlights: [
            'Integração com YouTube Data API para metadados, thumbnails e player otimizado',
            'Modelagem relacional em PostgreSQL com categorização por gênero, instrumento e artista',
            'API REST em Node.js com paginação e filtragem rápida de faixas',
            'Interface responsiva otimizada para navegação fluida em desktop e mobile'
        ],
        tech: ['React', 'Node.js', 'YouTube API', 'PostgreSQL', 'REST API'],
        demoUrl: 'https://musicgallery.vercel.app',
        demoLabel: 'Ver Demo ao Vivo'
    },

    firebird: {
        title: 'Gerenciador Firebird — Suite Desktop de Administração',
        tagline: 'Automação de backups, manutenção e diagnóstico de bancos Firebird SQL',
        badge: 'Aplicação Desktop Windows',
        isOffline: false,
        image: './images/projeto_gerenciadorfirebird.webp',
        description:
            'Software desktop desenvolvido em Python com interface gráfica moderna para simplificar a administração, rotinas de backup/restore, validação de integridade e manutenção de bancos de dados Firebird SQL.',
        highlights: [
            'Execução automatizada de gbak (Backup & Restore) com logs detalhados em tempo real',
            'Verificação e reparo de integridade (gfix) sem necessidade de linha de comando manual',
            'Persistência de perfis de conexão em JSON e fluxo ágil para administradores e equipes de suporte',
            'Empacotado com instalador executável (.exe) pronto para ambientes corporativos Windows'
        ],
        tech: ['Python', 'Tkinter GUI', 'Firebird SQL', 'JSON', 'Windows Installer'],
        demoUrl: 'https://github.com/MMaffi/gerenciador_firebird/releases/latest/download/GerenciadorFirebird_Installer.exe',
        demoLabel: 'Baixar Instalador .exe',
        repoUrl: 'https://github.com/MMaffi/gerenciador_firebird'
    },

    lembrei: {
        title: 'Lembrei — Sistema Inteligente de Lembretes & PWA',
        tagline: 'Arquitetura PWA com Web Push Notifications automáticas em background',
        badge: 'Case Técnico • Ambiente Offline',
        isOffline: true,
        image: './images/projeto_lembrei.webp',
        description:
            'Aplicação Web Progressiva (PWA) projetada com Next.js e TypeScript para gerenciamento inteligente de lembretes, tarefas e rotinas recorrentes, utilizando Service Workers e Web Push API para entrega confiável de alertas mesmo com o navegador fechado.',
        highlights: [
            'Arquitetura de Push Notifications via Web Push API com chaves VAPID e Service Workers ativos em background',
            'Manifesto PWA completo para instalação nativa em Android, iOS, Windows e macOS com cache estratégico',
            'Motor de agendamento para lembretes únicos e recorrentes com níveis de prioridade e ação direta na notificação',
            'Componentização modular em React + TypeScript Strict com foco em baixa latência e acessibilidade'
        ],
        tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'PWA', 'Service Workers', 'Web Push API'],
        offlineNotice: 'Projeto descontinuado / ambiente offline — documentação técnica mantida como estudo de arquitetura.'
    },

    meubar: {
        title: 'Meu Bar — Biblioteca Digital & Catálogo de Destilados',
        tagline: 'Arquitetura editorial interativa com modelagem sensorial e comparativo',
        badge: 'Case Técnico • Ambiente Offline',
        isOffline: true,
        image: './images/projeto_meubar.webp',
        description:
            'Plataforma web desenvolvida com Next.js, TypeScript e TailwindCSS para catalogação e exploração de bebidas e destilados, combinando modelagem estruturada de perfis sensoriais, notas de degustação e um comparador interativo de rótulos ("Duelo de Garrafas").',
        highlights: [
            'Motor comparativo interativo ("Duelo de Garrafas") com estado tipado para análise lado a lado de atributos e notas',
            'Modelagem de dados sensoriais cobrindo aromas, paladar, finalização, envelhecimento e harmonizações',
            'Pipeline de busca e filtros multicritério instantâneos por categoria, origem, especiarias e faixa de valor',
            'Interface editorial responsiva em Dark Mode com otimização de assets e renderização via API REST'
        ],
        tech: ['Next.js', 'React', 'TypeScript', 'TailwindCSS', 'API REST'],
        offlineNotice: 'Projeto descontinuado / ambiente offline — documentação técnica mantida como estudo de arquitetura.'
    }
};
