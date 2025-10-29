import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { 
  Folder, 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Filter, 
  Calendar, 
  Link2, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Sliders, 
  Headphones, 
  LogOut,
  ChevronLeft,
  ChevronDown 
} from 'lucide-react';

interface NavLink {
  path: string;
  label: string;
  icon: any;
  isDanger?: boolean;
}

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navItems: { group: string; links: NavLink[] }[] = [
    {
      group: 'PROJETOS',
      links: [
        { path: '/projetos', label: 'Projetos', icon: Folder },
      ],
    },
    {
      group: 'PRINCIPAL',
      links: [
        { path: '/', label: 'Visão geral', icon: LayoutDashboard },
        { path: '/contatos', label: 'Contatos', icon: Users },
        { path: '/vendas', label: 'Vendas', icon: TrendingUp },
        { path: '/funil', label: 'Funil', icon: Filter },
        { path: '/eventos', label: 'Eventos', icon: Calendar },
      ],
    },
    {
      group: 'RASTREAMENTO',
      links: [
        { path: '/links', label: 'Links', icon: Link2 },
        { path: '/mensagens', label: 'Mensagens', icon: MessageSquare },
      ],
    },
    {
      group: 'SISTEMA',
      links: [
        { path: '/relatorios', label: 'Relatórios', icon: BarChart3 },
        { path: '/integracoes', label: 'Integrações', icon: Settings },
        { path: '/configuracoes', label: 'Configurações', icon: Sliders },
        { path: '/suporte', label: 'Suporte', icon: Headphones },
      ],
    },
    {
      group: 'LOGOUT',
      links: [
        { path: '/logout', label: 'Sair', icon: LogOut, isDanger: true },
      ],
    },
  ];

  return (
    <aside className={`app-sidebar hidden lg:flex ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="app-sidebar-body">
        <div className="app-sidebar-header">
          <Link to="/" className="app-brand">
            <img src="/assets/img/logo.svg" alt="Logo Adsmágic" className="h-10 w-auto" />
          </Link>
          <button 
            type="button" 
            className="app-sidebar-toggle" 
            onClick={() => setIsCollapsed(!isCollapsed)}
            aria-label="Recolher menu" 
            aria-expanded={!isCollapsed}
            style={{ display: 'inline-flex' }}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        </div>

        <nav className="app-nav" data-active="overview">
          {navItems.map((group) => (
            <div key={group.group} className="app-nav-group">
              <div className="app-nav-heading">{group.group}</div>
              {group.links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`app-nav-link ${isActive(link.path) ? 'is-active' : ''} ${link.isDanger ? 'is-danger' : ''}`}
                    data-label={link.label}
                  >
                    <div className="app-nav-icon">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="app-nav-text">{link.label}</span>
                    {link.path === '/projetos' && (
                      <ChevronDown className="app-nav-icon--trailing w-5 h-5" />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};
