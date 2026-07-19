class Header extends HTMLElement {
    connectedCallback() {
        const pagina = window.location.pathname.split('/').pop() || 'index.html';

        this.innerHTML = `
        <header>
        <nav class="navbar">

            <a href="index.html" class="logo">
                <img src="img/logo-melka.svg" alt="Logo Melka Noz Macadâmia">
            </a>

            <button class="menu-toggle" aria-label="Abrir menu">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <div class="abas">
                <a href="index.html" class="${pagina === 'index.html' ? 'active' : ''}">Home</a>
                <a href="produtos.html" class="${pagina === 'produtos.html' ? 'active' : ''}">Produtos</a>
                <a href="contato.html" class="${pagina === 'contato.html' ? 'active' : ''}">Contato</a>
            </div>

            </nav>
        </header>
        `;

        const toggle = this.querySelector('.menu-toggle');
        const menu = this.querySelector('.abas');
        if (toggle && menu) {
            toggle.addEventListener('click', () => {
                menu.classList.toggle('active');
                toggle.classList.toggle('active');
                toggle.setAttribute('aria-label',
                    menu.classList.contains('active') ? 'Fechar menu' : 'Abrir menu'
                );
            });
        }
    }
}

customElements.define('header-component', Header);