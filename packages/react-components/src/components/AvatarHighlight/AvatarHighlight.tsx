import { tokens } from "@adsmagic/tokens";
import { Award, Mail, Rocket } from "lucide-react";
import type { CSSProperties } from "react";

const containerStyle: CSSProperties = {
  display: 'flex',
  gap: tokens.spacing.md,
  alignItems: 'center',
  padding: tokens.spacing.lg,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  backgroundColor: tokens.aliases.surface,
  boxShadow: tokens.shadows.card,
};

const avatarStyle: CSSProperties = {
  height: '4rem',
  width: '4rem',
  borderRadius: tokens.radii.full,
  background: `linear-gradient(135deg, ${tokens.colors.primary500}, ${tokens.colors.indigo500})`,
  color: tokens.colors.white,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: tokens.typography.sizeLG,
  fontWeight: Number(tokens.typography.weightSemibold),
};

const pillStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: tokens.spacing['2xs'],
  paddingInline: tokens.spacing.sm,
  paddingBlock: tokens.spacing['2xs'],
  borderRadius: tokens.radii.full,
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.primary600,
  backgroundColor: tokens.colors.primary100,
};

const metaListStyle: CSSProperties = {
  display: 'flex',
  gap: tokens.spacing.md,
  fontSize: tokens.typography.sizeXS,
  color: tokens.colors.slate500,
};

export function AvatarHighlight() {
  return (
    <section style={containerStyle}>
      <div style={avatarStyle}>VG</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing.sm }}>
        <span style={pillStyle}>
          <Award size={14} /> Parceria premium
        </span>
        <div>
          <h3
            style={{
              margin: 0,
              fontSize: tokens.typography.sizeLG,
              fontWeight: Number(tokens.typography.weightSemibold),
              color: tokens.colors.slate900,
            }}
          >
            Veronica Guedes - Head de Growth
          </h3>
          <p style={{ margin: 0, fontSize: tokens.typography.sizeSM, color: tokens.colors.slate600 }}>
            Responsavel pelos squads de aquisicao e expansao Latam.
          </p>
        </div>
        <div style={metaListStyle}>
          <span>
            <Mail size={14} style={{ marginRight: tokens.spacing['2xs'] }} /> veronica@adsmagic.com
          </span>
          <span>
            <Rocket size={14} style={{ marginRight: tokens.spacing['2xs'] }} /> 32 lancamentos entregues
          </span>
        </div>
      </div>
    </section>
  );
}


