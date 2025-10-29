import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  path: string;
  label: string;
  icon: string;
  isDanger?: boolean;
}

export const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems: { group: string; links: NavLink[] }[] = [
    {
      group: 'PROJETOS',
      links: [
        { path: '/projetos', label: 'Projetos', icon: '📁' },
      ],
    },
    {
      group: 'PRINCIPAL',
      links: [
        { path: '/', label: 'Visão geral', icon: '📊' },
        { path: '/contatos', label: 'Contatos', icon: '👥' },
        { path: '/vendas', label: 'Vendas', icon: '�' },
        { path: '/funil', label: 'Funil', icon: '🔍' },
        { path: '/eventos', label: 'Eventos', icon: '📅' },
      ],
    },
    {
      group: 'RASTREAMENTO',
      links: [
        { path: '/links', label: 'Links', icon: '🔗' },
        { path: '/mensagens', label: 'Mensagens', icon: '💬' },
      ],
    },
    {
      group: 'SISTEMA',
      links: [
        { path: '/relatorios', label: 'Relatórios', icon: '📊' },
        { path: '/integracoes', label: 'Integrações', icon: '⚙️' },
        { path: '/configuracoes', label: 'Configurações', icon: '🎚️' },
        { path: '/suporte', label: 'Suporte', icon: '🎧' },
      ],
    },
    {
      group: 'LOGOUT',
      links: [
        { path: '/logout', label: 'Sair', icon: '🚪', isDanger: true },
      ],
    },
  ];

  return (
    <aside className="app-sidebar" style={{ position: 'fixed', inset: '0 auto 0 0', height: '100vh', zIndex: 40 }}>
      <div className="app-sidebar-body">
        <div className="app-sidebar-header">
          <Link to="/" className="app-brand">
            <img src="/logo.svg" alt="Logo Adsmágic" style={{ height: '40px', width: 'auto' }} />
          </Link>
        </div>

        <nav className="app-nav" data-active="overview">
          {navItems.map((group) => (
            <div key={group.group} className="app-nav-group">
              <div className="app-nav-heading">{group.group}</div>
              {group.links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`app-nav-link ${isActive(link.path) ? 'is-active' : ''} ${link.isDanger ? 'is-danger' : ''}`}
                  data-label={link.label}
                >
                  <div className="app-nav-icon">{link.icon}</div>
                  <span className="app-nav-text">{link.label}</span>
                </Link>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};
