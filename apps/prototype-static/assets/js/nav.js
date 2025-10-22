const ICONS = {
  overview: "layout-dashboard",
  projetos: "gallery-vertical-end",
  "chevrons-up-down": "chevrons-up-down",
  "building-2": "building-2",
  factory: "factory",
  "shield-alert": "shield-alert",
  plus: "plus",
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
    heading: "Projetos",
    items: [
      {
        id: "projetos",
        label: "Projetos",
        href: "projetos.html",
        icon: "projetos",
        trailingIcon: "chevrons-up-down",
        dropdown: {
          heading: "Projetos",
          items: [
            { id: "acme-inc", label: "Acme Inc.", icon: "building-2", shortcut: "Ctrl+1" },
            { id: "acme-corp", label: "Acme Corp.", icon: "factory", shortcut: "Ctrl+2" },
            { id: "evil-corp", label: "Evil Corp.", icon: "shield-alert", shortcut: "Ctrl+3" }
          ],
          action: { label: "Adicionar projeto", icon: "plus" }
        }
      }
    ]
  },
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

function closeNavDropdowns(nav) {
  nav.querySelectorAll("[data-nav-dropdown-panel]").forEach((panel) => {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    panel.style.left = "";
    panel.style.top = "";
    panel.style.visibility = "";
    panel.style.removeProperty("--dropdown-arrow-top");
  });

  nav.querySelectorAll("[data-nav-dropdown-trigger]").forEach((trigger) => {
    trigger.setAttribute("aria-expanded", "false");
  });
}

function positionNavDropdown(nav, dropdownId) {
  const panel = nav.querySelector(`[data-nav-dropdown-panel="${dropdownId}"]`);
  const navItem = nav.querySelector(`[data-nav-item="${dropdownId}"]`);
  if (!panel || !navItem) {
    return;
  }

  const sidebar = nav.closest(".app-sidebar");
  const isCollapsed =
    sidebar?.classList.contains("is-collapsed") || sidebar?.getAttribute("data-collapsed") === "true";

  const trigger =
    nav.querySelector(`[data-nav-dropdown-trigger="${dropdownId}"]`) ||
    navItem.querySelector("a.app-nav-link") ||
    navItem;

  const triggerRect = trigger.getBoundingClientRect();
  const panelRect = panel.getBoundingClientRect();
  const gutter = 16;

  const collapsedOffset = isCollapsed ? 12 : 0;
  const preferredLeft = triggerRect.right + gutter + collapsedOffset;
  const maxLeft = window.innerWidth - panelRect.width - gutter;
  const left = Math.min(Math.max(gutter, preferredLeft), Math.max(gutter, maxLeft));

  const preferredTop = triggerRect.top;
  const maxTop = window.innerHeight - panelRect.height - gutter;
  const top = Math.min(Math.max(gutter, preferredTop), Math.max(gutter, maxTop));

  panel.style.left = `${left}px`;
  panel.style.top = `${top}px`;

  const arrowOffset = triggerRect.top + triggerRect.height / 2 - top;
  const clampedArrow = Math.max(20, Math.min(panelRect.height - 20, arrowOffset));
  panel.style.setProperty("--dropdown-arrow-top", `${clampedArrow}px`);
}

function toggleNavDropdown(nav, dropdownId, forceOpen) {
  const trigger = nav.querySelector(`[data-nav-dropdown-trigger="${dropdownId}"]`);
  const panel = nav.querySelector(`[data-nav-dropdown-panel="${dropdownId}"]`);
  if (!trigger || !panel) {
    return;
  }

  const isOpen = panel.classList.contains("is-open");
  const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !isOpen;

  closeNavDropdowns(nav);

  if (shouldOpen) {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    trigger.setAttribute("aria-expanded", "true");
    panel.style.visibility = "hidden";
    window.requestAnimationFrame(() => {
      positionNavDropdown(nav, dropdownId);
      panel.style.visibility = "";
    });
  }
}

let navDropdownGlobalHandlersAttached = false;

function ensureGlobalNavDropdownHandlers() {
  if (navDropdownGlobalHandlersAttached) {
    return;
  }

  document.addEventListener("click", (event) => {
    document.querySelectorAll(".app-nav").forEach((nav) => {
      if (!nav.contains(event.target)) {
        closeNavDropdowns(nav);
      }
    });
  });

  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape") {
        document.querySelectorAll(".app-nav").forEach((nav) => {
          closeNavDropdowns(nav);
        });
      }
    },
    true
  );

  navDropdownGlobalHandlersAttached = true;
}

function handleNavClick(event) {
  const dropdownTrigger = event.target.closest("[data-nav-dropdown-trigger]");
  if (dropdownTrigger) {
    event.preventDefault();
    event.stopPropagation();
    const nav = dropdownTrigger.closest(".app-nav");
    if (nav) {
      toggleNavDropdown(nav, dropdownTrigger.dataset.navDropdownTrigger);
    }
    return;
  }

  const dropdownLink = event.target.closest(".app-nav-dropdown-link");
  if (dropdownLink) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  const link = event.target.closest("a.app-nav-link");
  if (!link) return;

  const nav = link.closest(".app-nav");
  const sidebar = nav?.closest(".app-sidebar");
  const isCollapsed =
    sidebar?.classList.contains("is-collapsed") || sidebar?.getAttribute("data-collapsed") === "true";

  const dropdownId = link.getAttribute("data-nav-dropdown-id");
  if (dropdownId && isCollapsed) {
    event.preventDefault();
    event.stopPropagation();
    toggleNavDropdown(nav, dropdownId);
    return;
  }

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

  if (nav) {
    closeNavDropdowns(nav);
  }

  event.preventDefault();
  window.location.assign(link.href);
}

function handleNavKeydown(event) {
  const nav = event.currentTarget;

  const dropdownTrigger = event.target.closest("[data-nav-dropdown-trigger]");
  if (dropdownTrigger) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleNavDropdown(nav, dropdownTrigger.dataset.navDropdownTrigger);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeNavDropdowns(nav);
      dropdownTrigger.blur();
    }
    return;
  }

  if (event.key === "Escape") {
    closeNavDropdowns(nav);
  }
}

function renderNav(nav) {
  const activeId = nav.dataset.active || "";

  nav.innerHTML = NAV_GROUPS.map((group, groupIndex) => {
    const itemsHtml = group.items
      .map((item) => {
        const linkClasses = ["app-nav-link"];

        if (item.variant === "danger") {
          linkClasses.push("is-danger");
        }

        if (item.id === activeId) {
          linkClasses.push("is-active");
        }

        const hasDropdown = Boolean(item.dropdown);

        const trailingIcon = hasDropdown && item.trailingIcon
          ? `<span class="app-nav-trailing" role="button" tabindex="0" data-nav-dropdown-trigger="${item.id}" aria-label="Abrir menu de ${item.label}" aria-haspopup="true" aria-expanded="false">${getIconMarkup(item.trailingIcon)}</span>`
          : item.trailingIcon
          ? `<span class="app-nav-icon app-nav-icon--trailing">${getIconMarkup(item.trailingIcon)}</span>`
          : "";

        const dropdownList =
          item.dropdown?.items?.map(
            (dropdownItem) => `
              <li>
                <a href="#" class="app-nav-dropdown-link" role="menuitem" data-dropdown-item-id="${dropdownItem.id}">
                  <span class="app-nav-dropdown-icon">${getIconMarkup(dropdownItem.icon ?? dropdownItem.id)}</span>
                  <span class="app-nav-dropdown-text">${dropdownItem.label}</span>
                  ${
                    dropdownItem.shortcut
                      ? `<span class="app-nav-dropdown-shortcut">${dropdownItem.shortcut}</span>`
                      : ""
                  }
                </a>
              </li>
            `
          ).join("") ?? "";

        const dropdownAction =
          item.dropdown?.action
            ? `
              <button type="button" class="app-nav-dropdown-action">
                <span class="app-nav-dropdown-action-icon">${getIconMarkup(item.dropdown.action.icon ?? "plus")}</span>
                <span class="app-nav-dropdown-action-text">${item.dropdown.action.label}</span>
              </button>
            `
            : "";

        const dropdownHtml = hasDropdown
          ? `
            <div class="app-nav-dropdown" data-nav-dropdown-panel="${item.id}" aria-hidden="true">
              <p class="app-nav-dropdown-heading">${item.dropdown.heading}</p>
              <div class="app-nav-dropdown-content">
                <ul class="app-nav-dropdown-list" role="menu">
                  ${dropdownList}
                </ul>
                ${dropdownAction}
              </div>
            </div>
          `
          : "";

        const dropdownAttr = hasDropdown ? ` data-nav-dropdown-id="${item.id}"` : "";

        return `
          <div class="app-nav-item" data-nav-item="${item.id}">
            <a href="${item.href}" class="${linkClasses.join(" ")}"${dropdownAttr} data-label="${item.label}" aria-label="${item.label}">
              <span class="app-nav-icon">${getIconMarkup(item.icon ?? item.id)}</span>
              <span class="app-nav-text">${item.label}</span>
              ${trailingIcon}
            </a>
            ${dropdownHtml}
          </div>
        `;
      })
      .join("");

    const groupClasses = ["app-nav-group"];

    if (group.className) {
      groupClasses.push(group.className);
    }

    return `
      <div class="${groupClasses.join(" ")}">
        <p class="app-nav-heading" data-label-id="${groupIndex}">${group.heading}</p>
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

  if (!nav.__navKeydownHandlerAttached) {
    nav.addEventListener("keydown", handleNavKeydown);
    nav.__navKeydownHandlerAttached = true;
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

function initStatusDropdowns() {
  const dropdowns = document.querySelectorAll("[data-status-dropdown]");
  dropdowns.forEach((dropdown) => {
    const trigger = dropdown.querySelector("[data-status-trigger]");
    const menu = dropdown.querySelector("[data-status-menu]");

    if (!trigger || !menu) {
      return;
    }

    let isOpen = false;

    function handleClickOutside(event) {
      if (!dropdown.contains(event.target)) {
        setOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.focus();
      }
    }

    function setOpen(open) {
      isOpen = open;
      dropdown.classList.toggle("is-open", open);
      trigger.setAttribute("aria-expanded", open ? "true" : "false");
      menu.classList.toggle("hidden", !open);
      menu.setAttribute("aria-hidden", open ? "false" : "true");

      if (open) {
        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleEscape, true);
      } else {
        document.removeEventListener("click", handleClickOutside);
        document.removeEventListener("keydown", handleEscape, true);
      }
    }

    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setOpen(!isOpen);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    menu.addEventListener("click", (event) => {
      const closeTarget = event.target.closest("[data-close-menu]");
      if (closeTarget) {
        setOpen(false);
      }
    });

    setOpen(false);
  });
}

function initNavigation() {
  document.querySelectorAll(".app-nav").forEach(renderNav);
  ensureGlobalNavDropdownHandlers();
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
  initSidebar();
  initStatusDropdowns();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initNavigation);
} else {
  initNavigation();
}


