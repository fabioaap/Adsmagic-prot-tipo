const ICONS = {
  overview: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12a8 8 0 0116 0"/><path d="M12 4v16"/></svg>`,
  contatos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 20a4 4 0 018 0"/><path d="M5 7a4 4 0 108 0 4 4 0 00-8 0z"/><path d="M17 11l2 2 4-4"/></svg>`,
  vendas: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/><path d="M8 7l1-3h6l1 3"/><path d="M9 12v5"/><path d="M15 12v5"/></svg>`,
  funil: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16"/><path d="M6 5l3 6v5l6 3v-8l3-6"/></svg>`,
  eventos: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/></svg>`,
  links: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.5 13.5l-1 1a5 5 0 107.07 7.07l1-1"/><path d="M13.5 10.5l1-1a5 5 0 10-7.07-7.07l-1 1"/><path d="M8 16l8-8"/></svg>`,
  mensagens: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8.5z"/></svg>`,
  automacao: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2v4"/><path d="M12 18v4"/><rect x="7" y="6" width="10" height="12" rx="2"/><path d="M9 10h6"/><path d="M9 14h3"/></svg>`,
  relatorios: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 3h18v18H3z"/><path d="M7 14l3 3 7-7"/></svg>`,
  integracoes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 3H3v4"/><path d="M17 3h4v4"/><path d="M7 21H3v-4"/><path d="M17 21h4v-4"/><path d="M3 7l5 5-5 5"/><path d="M21 7l-5 5 5 5"/></svg>`,
  configuracoes: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9A1.65 1.65 0 0010 4.6V4a2 2 0 014 0v.09a1.65 1.65 0 001 1.51h.09a1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,
  "meus-projetos": `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 21V8l9-5 9 5v13"/><path d="M13 13h4v8h-4z"/><path d="M7 13h4v8H7z"/></svg>`,
  suporte: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 10a6 6 0 10-12 0v4"/><path d="M6 18a2 2 0 004 0"/><path d="M14 18a2 2 0 004 0"/><path d="M22 10h-2a8 8 0 10-16 0H2"/></svg>`,
  logout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></svg>`,
  default: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/></svg>`
};

const NAV_GROUPS = [
  {
    heading: "Principal",
    items: [
      { id: "overview", label: "Visão geral", href: "index.html", icon: "overview", activeBadge: "Ativo" },
      { id: "contatos", label: "Contatos", href: "contatos.html", icon: "contatos", count: "24" },
      { id: "vendas", label: "Vendas", href: "vendas.html", icon: "vendas", count: "12" },
      { id: "funil", label: "Funil", href: "funil.html", icon: "funil", count: "7" },
      { id: "eventos", label: "Eventos", href: "eventos.html", icon: "eventos", count: "3" }
    ]
  },
  {
    heading: "Rastreamento",
    items: [
      { id: "links", label: "Links", href: "links.html", icon: "links", count: "11" },
      { id: "mensagens", label: "Mensagens", href: "mensagens.html", icon: "mensagens", count: "4" },
      { id: "automacao", label: "Automação", href: "automacao.html", icon: "automacao", count: "6" }
    ]
  },
  {
    heading: "Sistema",
    items: [
      { id: "relatorios", label: "Relatórios", href: "relatorios.html", icon: "relatorios" },
      { id: "integracoes", label: "Integrações", href: "integracoes.html", icon: "integracoes", count: "5" },
      { id: "configuracoes", label: "Configurações", href: "configuracoes.html", icon: "configuracoes" },
      { id: "meus-projetos", label: "Meus projetos", href: "meus-projetos.html", icon: "meus-projetos" },
      { id: "suporte", label: "Suporte", href: "suporte.html", icon: "suporte" }
    ]
  },
  {
    heading: "Conta",
    className: "pt-2",
    items: [{ id: "logout", label: "Sair", href: "#", icon: "logout", variant: "danger" }]
  }
];

const STORAGE_KEY = "adsmagic:sidebar-collapsed";

function readStoredCollapsed() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch (error) {
    console.warn("Não foi possível ler o estado da sidebar no localStorage.", error);
    return false;
  }
}

function writeStoredCollapsed(collapsed) {
  try {
    window.localStorage.setItem(STORAGE_KEY, collapsed ? "1" : "0");
  } catch (error) {
    console.warn("Não foi possível salvar o estado da sidebar no localStorage.", error);
  }
}

function getIconMarkup(iconKey) {
  return ICONS[iconKey] ?? ICONS.default;
}

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

        const badgeLabel = item.id === activeId ? item.activeBadge ?? item.count : item.count;
        const count = badgeLabel ? `<span class="app-nav-count" aria-hidden="true">${badgeLabel}</span>` : "";

        return `
          <a href="${item.href}" class="${classes.join(" ")}" data-label="${item.label}" aria-label="${item.label}">
            <span class="app-nav-icon">${getIconMarkup(item.icon ?? item.id)}</span>
            <span class="app-nav-text">${item.label}</span>
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

function applySidebarState(sidebar, collapsed) {
  sidebar.classList.toggle("is-collapsed", collapsed);
  sidebar.setAttribute("data-collapsed", collapsed ? "true" : "false");

  const toggle = sidebar.querySelector("[data-sidebar-toggle]");
  const expand = sidebar.querySelector("[data-sidebar-expand]");
  if (toggle) {
    toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
    toggle.setAttribute("aria-label", collapsed ? "Expandir menu" : "Recolher menu");
  }
  if (expand) {
    expand.setAttribute("aria-expanded", collapsed ? "false" : "true");
  }
}

function initSidebar() {
  const sidebar = document.querySelector(".app-sidebar");
  if (!sidebar) return;

  const toggleButton = sidebar.querySelector("[data-sidebar-toggle]");
  const expandButton = sidebar.querySelector("[data-sidebar-expand]");

  let collapsed = readStoredCollapsed();
  applySidebarState(sidebar, collapsed);

  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      collapsed = !collapsed;
      writeStoredCollapsed(collapsed);
      applySidebarState(sidebar, collapsed);
    });
  }

  if (expandButton) {
    expandButton.addEventListener("click", () => {
      collapsed = false;
      writeStoredCollapsed(collapsed);
      applySidebarState(sidebar, collapsed);
    });
  }
}

function initNavigation() {
  document.querySelectorAll(".app-nav").forEach(renderNav);
  initSidebar();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigation);
} else {
  initNavigation();
}
