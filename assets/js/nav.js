const NAV_GROUPS = [
  {
    heading: "Menu",
    items: [
      { id: "overview", label: "Visão geral", href: "index.html", activeBadge: "Ativo" },
      { id: "contatos", label: "Contatos", href: "contatos.html", count: "24", activeBadge: "Ativo" },
      { id: "links", label: "Links", href: "links.html", count: "11" },
      { id: "mensagens", label: "Mensagens", href: "mensagens.html", count: "4" },
      { id: "vendas", label: "Vendas", href: "vendas.html", count: "12", activeBadge: "Ativo" },
      { id: "funil", label: "Funil", href: "funil.html", count: "Em breve", activeBadge: "Ativo" },
      { id: "eventos", label: "Eventos", href: "eventos.html", count: "3" },
      { id: "integracoes", label: "Integrações", href: "integracoes.html", count: "5" },
      { id: "automacao", label: "Automação", href: "#" },
      { id: "relatorios", label: "Relatórios", href: "#" },
      { id: "configuracoes", label: "Configurações", href: "#" }
    ]
  },
  {
    heading: "Conta",
    className: "pt-2",
    items: [
      { id: "logout", label: "Sair", href: "#", variant: "danger" }
    ]
  }
];

function renderNav(nav) {
  const activeId = nav.dataset.active || "";

  nav.innerHTML = NAV_GROUPS.map((group) => {
    const itemsHtml = group.items
      .map((item) => {
        const classes = ["app-nav-link"];

        if (item.variant === "danger") {
          classes.push("is-danger");
        }

        if (item.id === activeId) {
          classes.push("is-active");
        }

        const badgeLabel =
          item.id === activeId
            ? item.activeBadge ?? item.count
            : item.count;

        const count = badgeLabel
          ? `<span class="app-nav-count">${badgeLabel}</span>`
          : "";

        return `
          <a href="${item.href}" class="${classes.join(" ")}">
            <span>${item.label}</span>
            ${count}
          </a>
        `;
      })
      .join("");

    const groupClasses = ["app-nav-group"];

    if (group.className) {
      groupClasses.push(group.className);
    }

    return `
      <div class="${groupClasses.join(" ")}">
        <p class="app-nav-heading">${group.heading}</p>
        ${itemsHtml}
      </div>
    `;
  }).join("");
}

function initNavigation() {
  document.querySelectorAll(".app-nav").forEach(renderNav);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigation);
} else {
  initNavigation();
}
