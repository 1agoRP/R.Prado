// Script principal do site
document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const btnMenu = document.getElementById('btn-menu');
    const menu = document.getElementById('menu-mobile');
    const overlay = document.getElementById('overlay-menu');
    const btnFechar = document.querySelector('.btn-fechar');
    const menuLinks = document.querySelectorAll('.menu-mobile nav ul li a');

    if (btnMenu) {
        btnMenu.addEventListener('click', () => {
            menu.classList.add('abrir-menu');
            btnMenu.setAttribute('aria-expanded', 'true');
            menu.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    }

    if (btnFechar) {
        btnFechar.addEventListener('click', () => {
            fecharMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            fecharMenu();
        });
    }

    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            fecharMenu();
        });
    });

    function fecharMenu() {
        menu.classList.remove('abrir-menu');
        btnMenu.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header fixo com mudança de estilo ao rolar
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animação de elementos ao entrar na viewport
    const animatedElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // FAQ Accordion
    const faqButtons = document.querySelectorAll('.faq-pergunta');
    
    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const expanded = button.getAttribute('aria-expanded') === 'true';
            
            // Fechar todos os outros itens
            faqButtons.forEach(otherButton => {
                if (otherButton !== button) {
                    otherButton.setAttribute('aria-expanded', 'false');
                }
            });
            
            button.setAttribute('aria-expanded', !expanded);
        });
    });

    // Slider de Depoimentos
    const depoimentos = document.querySelectorAll('.depoimento-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.depoimento-prev');
    const nextBtn = document.querySelector('.depoimento-next');
    let currentIndex = 0;
    
    function showDepoimento(index) {
        depoimentos.forEach((depoimento, i) => {
            depoimento.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    if (depoimentos.length > 0) {
        showDepoimento(0);
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = depoimentos.length - 1;
                showDepoimento(newIndex);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                let newIndex = currentIndex + 1;
                if (newIndex >= depoimentos.length) newIndex = 0;
                showDepoimento(newIndex);
            });
        }
        
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                showDepoimento(i);
            });
        });
    }

// Calculadora de Orçamento com urgência dinâmica
const calcularBtn = document.getElementById('calcular-orcamento');
const tipoServicoSelect = document.getElementById('tipo-servico');
const urgenciaSelect = document.getElementById('urgencia');

// Definir opções de urgência para cada tipo de serviço
const urgenciaPorServico = {
    transcricao: [
        { value: 'normal', text: 'Normal (10-12 dias úteis)', multiplicador: 1, prazo: '10-12 dias úteis' },
        { value: 'rapido', text: 'Rápido (5-8 dias úteis)', multiplicador: 1.3, prazo: '5-8 dias úteis' },
        { value: 'urgente', text: 'Urgente (3-4 dias úteis)', multiplicador: 1.6, prazo: '3-4 dias úteis' }
    ],
    atualizacao: [
        { value: 'normal', text: 'Normal (15-20 dias úteis)', multiplicador: 1, prazo: '15-20 dias úteis' },
        { value: 'rapido', text: 'Rápido (8-12 dias úteis)', multiplicador: 1.4, prazo: '8-12 dias úteis' },
        { value: 'urgente', text: 'Urgente (5-7 dias úteis)', multiplicador: 1.8, prazo: '5-7 dias úteis' }
    ],
    digitalizacao: [
        { value: 'normal', text: 'Normal (Prazo a definir)', multiplicador: 1, prazo: 'Prazo a definir conforme volume' },
        { value: 'rapido', text: 'Rápido (Prazo a definir)', multiplicador: 1.2, prazo: 'Prazo a definir conforme volume' }
        // Digitalização não tem opção urgente
    ]
};

// Função para atualizar as opções de urgência
function atualizarOpcoes() {
    const tipoSelecionado = tipoServicoSelect.value;
    const opcoes = urgenciaPorServico[tipoSelecionado] || urgenciaPorServico.transcricao;
    
    // Limpar opções existentes
    urgenciaSelect.innerHTML = '';
    
    // Adicionar novas opções
    opcoes.forEach(opcao => {
        const option = document.createElement('option');
        option.value = opcao.value;
        option.textContent = opcao.text;
        urgenciaSelect.appendChild(option);
    });
}

// Atualizar opções quando o tipo de serviço mudar
if (tipoServicoSelect) {
    tipoServicoSelect.addEventListener('change', atualizarOpcoes);
    // Inicializar com as opções do primeiro serviço
    atualizarOpcoes();
}

if (calcularBtn) {
    calcularBtn.addEventListener('click', () => {
        const tipoServico = tipoServicoSelect.value;
        const qtdPaginas = parseInt(document.getElementById('qtd-paginas').value);
        const urgenciaSelecionada = urgenciaSelect.value;
        
        let valorBase = 0;
        let multiplicadorUrgencia = 1;
        let prazoEstimado = '';
        
        // Definir valor base por página de acordo com o serviço
        switch(tipoServico) {
            case 'transcricao':
                valorBase = 22;
                break;
            case 'atualizacao':
                valorBase = 60;
                break;
            case 'digitalizacao':
                valorBase = 0.18;
                break;
            default:
                valorBase = 15;
        }
        
        // Buscar multiplicador e prazo específicos para o serviço selecionado
        const opcoes = urgenciaPorServico[tipoServico] || urgenciaPorServico.transcricao;
        const opcaoSelecionada = opcoes.find(opcao => opcao.value === urgenciaSelecionada);
        
        if (opcaoSelecionada) {
            multiplicadorUrgencia = opcaoSelecionada.multiplicador;
            prazoEstimado = opcaoSelecionada.prazo;
        } else {
            // Fallback para o caso padrão
            multiplicadorUrgencia = 1;
            prazoEstimado = '10-12 dias úteis';
        }
        
        // Cálculo do valor total
        const valorTotal = valorBase * qtdPaginas * multiplicadorUrgencia;
        
        // Atualizar resultado
        document.querySelector('.valor-estimado').textContent = `R$ ${valorTotal.toFixed(2)}`;
        document.querySelector('.prazo-estimado span').textContent = prazoEstimado;
    });
}

    // Atualizar ano no rodapé
    const anoAtual = document.getElementById('ano-atual');
    if (anoAtual) {
        anoAtual.textContent = new Date().getFullYear();
    }

    // Validação de formulário
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const mensagem = document.getElementById('mensagem');
            const politicaPrivacidade = document.getElementById('politica-privacidade');
            
            let isValid = true;
            
            if (!nome.value.trim()) {
                highlightInvalidField(nome);
                isValid = false;
            } else {
                removeInvalidHighlight(nome);
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                highlightInvalidField(email);
                isValid = false;
            } else {
                removeInvalidHighlight(email);
            }
            
            if (!mensagem.value.trim()) {
                highlightInvalidField(mensagem);
                isValid = false;
            } else {
                removeInvalidHighlight(mensagem);
            }
            
            if (politicaPrivacidade && !politicaPrivacidade.checked) {
                highlightInvalidField(politicaPrivacidade.parentElement);
                isValid = false;
            } else if (politicaPrivacidade) {
                removeInvalidHighlight(politicaPrivacidade.parentElement);
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }

    function highlightInvalidField(field) {
        field.style.borderColor = 'red';
        field.style.backgroundColor = 'rgba(255, 0, 0, 0.05)';
    }

    function removeInvalidHighlight(field) {
        field.style.borderColor = '';
        field.style.backgroundColor = '';
    }

    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});

// Política de Privacidade
function configurarModalPolitica() {
    const modal = document.getElementById('modal-politica');
    const btnAbrirLinks = document.querySelectorAll('.link-politica, footer a[href="#"]');
    const btnFechar = document.querySelector('.fechar-modal');
    const btnAceitar = document.querySelector('.btn-aceitar');
    const politicaAceita = localStorage.getItem('politicaAceita');
    
    // Atualizar data da política
    const dataElement = document.getElementById('data-politica');
    if (dataElement) {
        const dataAtual = new Date();
        dataElement.textContent = dataAtual.toLocaleDateString('pt-BR');
    }
    
    /*
    // Mostrar modal se política não foi aceita ou quando clicar nos links
    if (!politicaAceita) {
        setTimeout(() => {
            modal.classList.add('ativo');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }, 2000);
    }*/
    
    btnAbrirLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.add('ativo');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Fechar modal
    function fecharModal() {
        modal.classList.remove('ativo');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
    
    if (btnFechar) {
        btnFechar.addEventListener('click', fecharModal);
    }
    
    if (btnAceitar) {
        btnAceitar.addEventListener('click', () => {
            localStorage.setItem('politicaAceita', 'true');
            fecharModal();
        });
    }
    
    // Fechar ao clicar fora do conteúdo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('ativo')) {
            fecharModal();
        }
    });
}

// Chamar a função quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', configurarModalPolitica);
