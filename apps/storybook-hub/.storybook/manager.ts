import { addons } from "storybook/internal/manager-api";
import { create } from "storybook/internal/theming";
import "./apple-fonts.css";

// Tema Apple-like: Minimalista, elegante e sofisticado
const appleTheme = create({
  base: "light",
  
  // Branding estilo Apple
  brandTitle: "Adsmagic",
  brandUrl: "https://github.com/fabioaap/Adsmagic-prot-tipo",
  brandTarget: "_blank",
  
  // Cores principais (paleta Apple: azul SF e cinzas neutros)
  colorPrimary: "#007AFF", // SF Blue
  colorSecondary: "#5856D6", // SF Purple
  
  // UI - Estilo Apple: branco puro, cinzas suaves
  appBg: "#F5F5F7", // Apple Light Gray
  appContentBg: "#FFFFFF", // Branco puro
  appBorderColor: "rgba(0, 0, 0, 0.08)", // Borda quase invisível
  appBorderRadius: 16, // Bordas generosas
  
  // Tipografia - SF Pro (fontes oficiais Apple)
  fontBase: '"SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  fontCode: '"SF Mono", "Menlo", "Monaco", "Consolas", monospace',
  
  // Texto - Hierarquia Apple
  textColor: "#1D1D1F", // Preto suave Apple
  textInverseColor: "#FFFFFF",
  textMutedColor: "#86868B", // Cinza médio Apple
  
  // Toolbar - Minimalista
  barTextColor: "#1D1D1F",
  barSelectedColor: "#007AFF",
  barBg: "rgba(255, 255, 255, 0.8)", // Glassmorphism
  
  // Inputs - Clean e refinado
  inputBg: "#FFFFFF",
  inputBorder: "rgba(0, 0, 0, 0.1)",
  inputTextColor: "#1D1D1F",
  inputBorderRadius: 12,
});

addons.setConfig({
  theme: appleTheme,
  
  // Comportamento da sidebar
  sidebar: {
    showRoots: true,
    collapsedRoots: [], // Todas seções expandidas por padrão
  },
  
  // Toolbar
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
  
  // Atalhos customizados
  enableShortcuts: true,
  
  // Panel inicial
  initialActive: "canvas",
});
