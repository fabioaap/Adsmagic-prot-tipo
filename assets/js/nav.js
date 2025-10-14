const ICONS = {
  overview: "layout-dashboard",
  contatos: "users",
  vendas: "briefcase-business",
  funil: "filter",
  eventos: "calendar-days",
  links: "link-2",
  mensagens: "messages-square",
  relatorios: "bar-chart-3",
  integracoes: "puzzle",
  configuracoes: "settings",
  suporte: "life-buoy",
  logout: "log-out",
  default: "circle"
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
      { id: "mensagens", label: "Mensagens", href: "mensagens.html", icon: "mensagens", count: "4" }
    ]
  },
  {
    heading: "Sistema",
    items: [
      { id: "relatorios", label: "Relatórios", href: "relatorios.html", icon: "relatorios" },
      { id: "integracoes", label: "Integrações", href: "integracoes.html", icon: "integracoes", count: "5" },
      { id: "configuracoes", label: "Configurações", href: "configuracoes.html", icon: "configuracoes" },
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
  const iconName = ICONS[iconKey] ?? ICONS.default;
  return `<i data-lucide="${iconName}" aria-hidden="true"></i>`;
}

function handleNavClick(event) {
  const link = event.target.closest("a.app-nav-link");
  if (!link) return;

  const href = link.getAttribute("href");
  if (!href || href === "#") return;

  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }

  event.preventDefault();
  window.location.assign(link.href);
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

  if (window.lucide?.createIcons) {
    window.lucide.createIcons({ elements: nav.querySelectorAll("[data-lucide]") });
  }

  if (!nav.__navClickHandlerAttached) {
    nav.addEventListener("click", handleNavClick);
    nav.__navClickHandlerAttached = true;
  }
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
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
  initSidebar();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigation);
} else {
  initNavigation();
}
