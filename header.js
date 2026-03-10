class Header extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `  
        <header>
        <nav class="navbar">

            <a href="index.html" class="logo">
                <img src="img/logo-melka.svg" alt="Logo Melka Noz Macadâmia">
            </a>
            
            <div class="abas">
                <a href="index.html">Home</a>
                <a href="produtos.html">Produtos</a>
                <a href="contato.html">Contato</a>
            </div>
             
            </nav>
        </header>
        `;
    }
}

customElements.define('header-component', Header);