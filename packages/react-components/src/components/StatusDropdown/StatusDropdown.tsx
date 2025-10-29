import { tokens } from "@adsmagic/tokens";
import { Check, ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { useState } from "react";

const triggerStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: tokens.spacing.xs,
  paddingInline: tokens.spacing.md,
  paddingBlock: tokens.spacing.xs,
  borderRadius: tokens.radii.full,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  backgroundColor: tokens.aliases.surface,
  cursor: 'pointer',
  fontSize: tokens.typography.sizeSM,
};

const menuStyle: CSSProperties = {
  position: 'absolute',
  marginTop: tokens.spacing.xs,
  minWidth: '220px',
  borderRadius: tokens.radii.md,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  backgroundColor: tokens.aliases.surface,
  boxShadow: tokens.shadows.pop,
  padding: tokens.spacing.xs,
  display: 'flex',
  flexDirection: 'column',
  gap: tokens.spacing['2xs'],
  zIndex: 20,
};

const optionStyle: CSSProperties = {
  padding: tokens.spacing.sm,
  borderRadius: tokens.radii.md,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: tokens.typography.sizeSM,
  cursor: 'pointer',
};

const options = [
  { id: 'ready', label: 'Pronto para subir', description: 'Checklist concluido e copy validada' },
  { id: 'review', label: 'Revisar com cliente', description: 'Aguardando feedback externo' },
  { id: 'blocked', label: 'Bloqueado', description: 'Dependencias de integracao pendentes' },
] as const;

export function StatusDropdown() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<(typeof options)[number]>(options[0]);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button type="button" style={triggerStyle} onClick={() => setOpen((prev) => !prev)}>
        {selected.label}
        <ChevronDown size={16} />
      </button>

      {open ? (
        <div style={menuStyle} role="listbox">
          {options.map((option) => {
            const active = option.id === selected.id;
            return (
              <div
                key={option.id}
                role="option"
                style={{
                  ...optionStyle,
                  backgroundColor: active ? tokens.colors.primary100 : 'transparent',
                  color: active ? tokens.colors.primary600 : tokens.colors.slate600,
                }}
                onClick={() => {
                  setSelected(option);
                  setOpen(false);
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['2xs'] }}>
                  <strong style={{ fontSize: tokens.typography.sizeSM }}>{option.label}</strong>
                  <span style={{ fontSize: tokens.typography.sizeXS, color: tokens.colors.slate500 }}>{option.description}</span>
                </div>
                {active ? <Check size={16} /> : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

