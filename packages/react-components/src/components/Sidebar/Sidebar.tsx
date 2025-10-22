import { tokens } from '@adsmagic/tokens';
import { BarChart3, Flame, Home, Layers3, LifeBuoy, Settings, Users } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { CSSProperties } from 'react';

const containerStyle: CSSProperties = {
  width: '280px',
  backgroundColor: tokens.colors.slate50,
  borderRadius: tokens.radii.lg,
  padding: tokens.spacing.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  boxShadow: tokens.shadows.card,
};

const logoStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  fontWeight: Number(tokens.typography.weightSemibold),
  fontSize: tokens.typography.sizeSM,
  color: tokens.colors.slate900,
};

const navSectionStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing['2xs'],
};

const navTitleStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXS,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: tokens.colors.slate500,
};

const navItemStyle: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: tokens.spacing.sm,
  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
  borderRadius: tokens.radii.md,
  fontSize: tokens.typography.sizeSM,
  color: tokens.colors.slate600,
  cursor: 'pointer',
  transition: `background-color ${tokens.transitions.base}`,
};

const activeNavItemStyle: CSSProperties = {
  ...navItemStyle,
  backgroundColor: tokens.colors.primary100,
  color: tokens.colors.primary600,
  fontWeight: Number(tokens.typography.weightMedium),
};

const footNoteStyle: CSSProperties = {
  marginTop: 'auto',
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
  lineHeight: 1.4,
};

type NavGroup = {
  title: string;
  items: Array<{ icon: LucideIcon; label: string; active?: boolean }>;
};

const NAV_GROUPS: NavGroup[] = [
  {
    title: 'Principal',
    items: [
      { icon: Home, label: 'Visao geral', active: true },
      { icon: Users, label: 'Contatos' },
      { icon: Layers3, label: 'Campanhas' },
    ],
  },
  {
    title: 'Insights',
    items: [
      { icon: BarChart3, label: 'Relatorios' },
      { icon: Flame, label: 'Oportunidades' },
    ],
  },
  {
    title: 'Sistema',
    items: [
      { icon: Settings, label: 'Configuracoes' },
      { icon: LifeBuoy, label: 'Suporte' },
    ],
  },
] as const;

export function Sidebar() {
  return (
    <aside style={containerStyle}>
      <div style={logoStyle}>
        <span
          style={{
            height: '2.5rem',
            width: '2.5rem',
            borderRadius: tokens.radii.md,
            background: tokens.colors.primary600,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: tokens.colors.white,
            fontWeight: Number(tokens.typography.weightSemibold),
          }}
        >
          AG
        </span>
        <span>Adsmagic Platform</span>
      </div>

      {NAV_GROUPS.map((group) => (
        <nav key={group.title} style={navSectionStyle}>
          <span style={navTitleStyle}>{group.title}</span>
          {group.items.map(({ icon: Icon, label, active }) => {
            const isActive = Boolean(active);
            return (
              <div key={label} style={isActive ? activeNavItemStyle : navItemStyle}>
                <Icon size={18} />
                {label}
              </div>
            );
          })}
        </nav>
      ))}

      <p style={footNoteStyle}>
        Workspace premium com sincronizacao ativa e monitoramento de eventos em tempo real.
      </p>
    </aside>
  );
}

