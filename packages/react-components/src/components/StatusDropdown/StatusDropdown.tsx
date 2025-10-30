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

  const handleSelect = (option: (typeof options)[number]) => {
    setSelected(option);
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    } else if (event.key === 'ArrowDown' && !open) {
      setOpen(true);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        type="button"
        style={triggerStyle}
        onClick={() => setOpen((prev) => !prev)}
        onKeyDown={handleKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open ? "true" : "false"}
        aria-labelledby={`status-label-${selected.id}`}
      >
        <span id={`status-label-${selected.id}`}>{selected.label}</span>
        <ChevronDown size={16} aria-hidden="true" />
      </button>

      {open ? (
        <div
          style={menuStyle}
          role="listbox"
          aria-labelledby={`status-label-${selected.id}`}
          aria-activedescendant={`option-${selected.id}`}
        >
          {options.map((option) => {
            const active = option.id === selected.id;
            return (
              <div
                key={option.id}
                id={`option-${option.id}`}
                role="option"
                aria-selected={active ? "true" : "false"}
                style={{
                  ...optionStyle,
                  backgroundColor: active ? tokens.colors.primary100 : 'transparent',
                  color: active ? tokens.colors.primary600 : tokens.colors.slate600,
                }}
                onClick={() => handleSelect(option)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(option);
                  }
                }}
                tabIndex={0}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: tokens.spacing['2xs'] }}>
                  <strong style={{ fontSize: tokens.typography.sizeSM }}>{option.label}</strong>
                  <span style={{ fontSize: tokens.typography.sizeXS, color: tokens.colors.slate500 }}>{option.description}</span>
                </div>
                {active ? <Check size={16} aria-hidden="true" /> : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

