document.addEventListener('DOMContentLoaded', () => {
    // Filtro de categorias
    const filtros = document.querySelectorAll('.filtro-btn');
    const cards = document.querySelectorAll('.produto-card');

    filtros.forEach(btn => {
        btn.addEventListener('click', () => {
            filtros.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const categoria = btn.dataset.filtro;
            cards.forEach(card => {
                if (categoria === 'todas' || card.dataset.categoria.includes(categoria)) {
                    card.style.display = '';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    const modal = document.getElementById('modal-produto');
    const modalClose = document.getElementById('modal-close');

    const listaProdutos = {
        "produto1": {
            titulo: "Macadâmia Estilo 1",
            descricao: "Amêndoas inteiras e selecionadas de tamanho premium. Perfeitas para petiscos de luxo e presentes",
            imagem: "img/macadamias-otimizadas/estilo1.webp",
            embalagens: ["100g", "500g", "1.1kg", "2.5kg"]
        },
        "produto2": {
            titulo: "Macadâmia Estilo 2",
            descricao: "Inteiras e metades de amêndoas ideais para aperitivos e doces sofisticados",
            imagem: "img/macadamias-otimizadas/estilo2.webp",
            embalagens: ["100g", "500g", "1.1kg", "2.5kg"]
        },
        "produto4": {
            titulo: "Macadâmia Estilo 4",
            descricao: "Pedaços médios, excelentes para aperitivos e doces",
            imagem: "img/macadamias-otimizadas/estilo4.webp",
            embalagens: ["500g", "1.1kg", "2.5kg"]
        },
        "produto5": {
            titulo: "Macadâmia Estilo 5",
            descricao: "Cacos e lascas de macadâmia, o toque final perfeito para confeitaria e sorvetes",
            imagem: "img/macadamias-otimizadas/estilo5.webp",
            embalagens: ["2.5kg"]
        }
    };

    // cards já declarado acima no filtro

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const produtoId = card.dataset.produto;
            const dados = listaProdutos[produtoId];

           if (dados) {
                modal.querySelector('.modal-titulo').innerText = dados.titulo;
                modal.querySelector('.modal-descricao').innerText = dados.descricao;
                modal.querySelector('.modal-header-img').src = dados.imagem;

                // Gerenciar Embalagens
                const containerTarget = document.getElementById('container-dinamico-embalagens');
                containerTarget.innerHTML = ''; // Limpa o que tinha antes

                if (dados.embalagens && dados.embalagens.length > 0) {
                    const wrapper = document.createElement('div');
                    wrapper.className = 'embalagens-container';
                    
                    const label = document.createElement('label');
                    label.innerText = "Tamanhos disponíveis:";
                    wrapper.appendChild(label);

                    dados.embalagens.forEach(tamanho => {
                        const span = document.createElement('span');
                        span.className = 'embalagem-tag';
                        span.innerText = tamanho;
                        wrapper.appendChild(span);
                    });

                    containerTarget.appendChild(wrapper);
                }

                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    const fecharModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (modalClose) {
        modalClose.addEventListener('click', fecharModal);
    }

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            fecharModal();
        }
    });
});