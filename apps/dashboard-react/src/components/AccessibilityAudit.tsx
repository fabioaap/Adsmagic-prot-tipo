import { tokens } from "@adsmagic/tokens";
import type { CSSProperties } from "react";
import { useState, useMemo } from "react";
import type { AccessibilityReport, AccessibilityViolation } from "../services/accessibilityAuditService";

interface AccessibilityAuditProps {
  report: AccessibilityReport;
  onRefresh?: () => void;
}

const containerStyle: CSSProperties = {
  padding: tokens.spacing.lg,
  backgroundColor: tokens.aliases.surface,
  borderRadius: tokens.radii.lg,
  border: `1px solid ${tokens.aliases.borderSoft}`,
};

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: tokens.spacing.lg,
};

const titleStyle: CSSProperties = {
  fontSize: tokens.typography.sizeLG,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const scoreContainerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: tokens.spacing.md,
};

const scoreStyle: CSSProperties = {
  fontSize: tokens.typography.sizeXL,
  fontWeight: Number(tokens.typography.weightBold),
  color: tokens.colors.slate900,
};

const gradeStyle = (grade: string): CSSProperties => ({
  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
  borderRadius: tokens.radii.full,
  fontSize: tokens.typography.sizeSM,
  fontWeight: Number(tokens.typography.weightMedium),
  backgroundColor: grade === 'A' ? tokens.colors.success100 :
                   grade === 'B' ? tokens.colors.primary100 :
                   grade === 'C' ? tokens.colors.warning100 :
                   grade === 'D' ? tokens.colors.danger100 :
                   tokens.colors.danger200,
  color: grade === 'A' ? tokens.colors.success600 :
         grade === 'B' ? tokens.colors.primary600 :
         grade === 'C' ? tokens.colors.warning600 :
         grade === 'D' ? tokens.colors.danger600 :
         tokens.colors.danger700,
});

const statsGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: tokens.spacing.md,
  marginBottom: tokens.spacing.lg,
};

const statCardStyle: CSSProperties = {
  padding: tokens.spacing.md,
  backgroundColor: tokens.aliases.surfaceSecondary,
  borderRadius: tokens.radii.md,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  textAlign: "center",
};

const statNumberStyle: CSSProperties = {
  fontSize: tokens.typography.sizeLG,
  fontWeight: Number(tokens.typography.weightBold),
  color: tokens.colors.slate900,
  display: "block",
};

const statLabelStyle: CSSProperties = {
  fontSize: tokens.typography.sizeSM,
  color: tokens.colors.slate500,
  marginTop: tokens.spacing.xs,
};

const filtersStyle: CSSProperties = {
  display: "flex",
  gap: tokens.spacing.md,
  marginBottom: tokens.spacing.lg,
  flexWrap: "wrap",
};

const filterButtonStyle = (active: boolean): CSSProperties => ({
  padding: `${tokens.spacing.xs} ${tokens.spacing.sm}`,
  borderRadius: tokens.radii.full,
  border: `1px solid ${active ? tokens.colors.primary600 : tokens.aliases.borderSoft}`,
  backgroundColor: active ? tokens.colors.primary600 : "transparent",
  color: active ? tokens.colors.white : tokens.colors.slate600,
  fontSize: tokens.typography.sizeSM,
  cursor: "pointer",
  transition: `all ${tokens.transitions.base}`,
});

const violationsListStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: tokens.spacing.md,
};

const violationCardStyle = (impact: string): CSSProperties => ({
  padding: tokens.spacing.lg,
  borderRadius: tokens.radii.md,
  border: `1px solid ${tokens.aliases.borderSoft}`,
  backgroundColor: tokens.aliases.surface,
  borderLeft: `4px solid ${
    impact === 'critical' ? tokens.colors.danger500 :
    impact === 'serious' ? tokens.colors.warning500 :
    impact === 'moderate' ? tokens.colors.primary500 :
    tokens.colors.info500
  }`,
});

const violationHeaderStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: tokens.spacing.sm,
};

const violationTitleStyle: CSSProperties = {
  fontSize: tokens.typography.sizeMD,
  fontWeight: Number(tokens.typography.weightSemibold),
  color: tokens.colors.slate900,
  margin: 0,
};

const impactBadgeStyle = (impact: string): CSSProperties => ({
  padding: `${tokens.spacing['2xs']} ${tokens.spacing.xs}`,
  borderRadius: tokens.radii.sm,
  fontSize: tokens.typography.sizeXS,
  fontWeight: Number(tokens.typography.weightMedium),
  textTransform: "uppercase",
  backgroundColor: impact === 'critical' ? tokens.colors.danger100 :
                   impact === 'serious' ? tokens.colors.warning100 :
                   impact === 'moderate' ? tokens.colors.primary100 :
                   tokens.colors.info100,
  color: impact === 'critical' ? tokens.colors.danger600 :
         impact === 'serious' ? tokens.colors.warning600 :
         impact === 'moderate' ? tokens.colors.primary600 :
         tokens.colors.info600,
});

const violationDescriptionStyle: CSSProperties = {
  color: tokens.colors.slate600,
  marginBottom: tokens.spacing.sm,
  lineHeight: 1.5,
};

const helpLinkStyle: CSSProperties = {
  color: tokens.colors.primary600,
  textDecoration: "none",
  fontSize: tokens.typography.sizeSM,
};

const helpLinkHoverStyle: CSSProperties = {
  ...helpLinkStyle,
  textDecoration: "underline",
};

const nodesListStyle: CSSProperties = {
  marginTop: tokens.spacing.sm,
};

const nodeItemStyle: CSSProperties = {
  padding: tokens.spacing.sm,
  backgroundColor: tokens.aliases.surfaceSecondary,
  borderRadius: tokens.radii.sm,
  marginBottom: tokens.spacing.xs,
  fontSize: tokens.typography.sizeSM,
  fontFamily: "monospace",
};

const emptyStateStyle: CSSProperties = {
  textAlign: "center",
  padding: tokens.spacing.xl,
  color: tokens.colors.slate500,
};

const refreshButtonStyle: CSSProperties = {
  padding: `${tokens.spacing.sm} ${tokens.spacing.lg}`,
  backgroundColor: tokens.colors.primary600,
  color: tokens.colors.white,
  border: "none",
  borderRadius: tokens.radii.md,
  fontSize: tokens.typography.sizeSM,
  fontWeight: Number(tokens.typography.weightMedium),
  cursor: "pointer",
  transition: `all ${tokens.transitions.base}`,
};

export function AccessibilityAudit({ report, onRefresh }: AccessibilityAuditProps) {
  const [impactFilter, setImpactFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"impact" | "id">("impact");

  // Calcula estatísticas
  const stats = useMemo(() => {
    const violationsByImpact = report.violations.reduce((acc, violation) => {
      acc[violation.impact] = (acc[violation.impact] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const weights = { critical: 10, serious: 7, moderate: 4, minor: 1 };
    const totalPenalty = Object.entries(violationsByImpact).reduce((total, [impact, count]) => {
      return total + (weights[impact as keyof typeof weights] || 0) * count;
    }, 0);

    const score = Math.max(0, 100 - totalPenalty);
    const grade = score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : score >= 60 ? 'D' : 'F';

    return { score: Math.round(score), grade, violationsByImpact };
  }, [report.violations]);

  // Filtra e ordena violações
  const filteredViolations = useMemo(() => {
    let filtered = impactFilter === "all"
      ? report.violations
      : report.violations.filter(v => v.impact === impactFilter);

    return filtered.sort((a, b) => {
      if (sortBy === "impact") {
        const impactOrder = { critical: 4, serious: 3, moderate: 2, minor: 1 };
        return impactOrder[b.impact as keyof typeof impactOrder] - impactOrder[a.impact as keyof typeof impactOrder];
      }
      return a.id.localeCompare(b.id);
    });
  }, [report.violations, impactFilter, sortBy]);

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>
          Auditoria de Acessibilidade
          {report.component && ` - ${report.component}`}
        </h2>
        <div style={scoreContainerStyle}>
          <span style={scoreStyle}>{stats.score}/100</span>
          <span style={gradeStyle(stats.grade)}>Nota {stats.grade}</span>
          {onRefresh && (
            <button
              style={refreshButtonStyle}
              onClick={onRefresh}
              aria-label="Executar nova auditoria"
            >
              🔄 Atualizar
            </button>
          )}
        </div>
      </div>

      <div style={statsGridStyle}>
        <div style={statCardStyle}>
          <span style={statNumberStyle}>{report.violations.length}</span>
          <span style={statLabelStyle}>Violações</span>
        </div>
        <div style={statCardStyle}>
          <span style={statNumberStyle}>{report.passes.length}</span>
          <span style={statLabelStyle}>Testes Aprovados</span>
        </div>
        <div style={statCardStyle}>
          <span style={statNumberStyle}>{report.incomplete.length}</span>
          <span style={statLabelStyle}>Incompletos</span>
        </div>
        <div style={statCardStyle}>
          <span style={statNumberStyle}>{report.inapplicable.length}</span>
          <span style={statLabelStyle}>Não Aplicáveis</span>
        </div>
      </div>

      <div style={filtersStyle}>
        <div>
          <label style={{ fontSize: tokens.typography.sizeSM, fontWeight: Number(tokens.typography.weightMedium), marginRight: tokens.spacing.sm }}>
            Filtrar por impacto:
          </label>
          {["all", "critical", "serious", "moderate", "minor"].map(impact => (
            <button
              key={impact}
              style={filterButtonStyle(impactFilter === impact)}
              onClick={() => setImpactFilter(impact)}
            >
              {impact === "all" ? "Todos" :
               impact === "critical" ? "Crítico" :
               impact === "serious" ? "Sério" :
               impact === "moderate" ? "Moderado" : "Menor"}
            </button>
          ))}
        </div>

        <div>
          <label style={{ fontSize: tokens.typography.sizeSM, fontWeight: Number(tokens.typography.weightMedium), marginRight: tokens.spacing.sm }}>
            Ordenar por:
          </label>
          <button
            style={filterButtonStyle(sortBy === "impact")}
            onClick={() => setSortBy("impact")}
          >
            Impacto
          </button>
          <button
            style={filterButtonStyle(sortBy === "id")}
            onClick={() => setSortBy("id")}
          >
            ID
          </button>
        </div>
      </div>

      <div style={violationsListStyle}>
        {filteredViolations.length === 0 ? (
          <div style={emptyStateStyle}>
            {impactFilter === "all"
              ? "🎉 Nenhuma violação de acessibilidade encontrada!"
              : `Nenhuma violação com impacto "${impactFilter}" encontrada.`}
          </div>
        ) : (
          filteredViolations.map((violation, index) => (
            <div key={`${violation.id}-${index}`} style={violationCardStyle(violation.impact)}>
              <div style={violationHeaderStyle}>
                <h3 style={violationTitleStyle}>{violation.description}</h3>
                <span style={impactBadgeStyle(violation.impact)}>
                  {violation.impact === 'critical' ? 'Crítico' :
                   violation.impact === 'serious' ? 'Sério' :
                   violation.impact === 'moderate' ? 'Moderado' : 'Menor'}
                </span>
              </div>

              <p style={violationDescriptionStyle}>{violation.help}</p>

              <a
                href={violation.helpUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={helpLinkStyle}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.textDecoration = "underline";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.textDecoration = "none";
                }}
              >
                Saiba mais sobre esta regra →
              </a>

              <div style={nodesListStyle}>
                <strong style={{ fontSize: tokens.typography.sizeSM, color: tokens.colors.slate700 }}>
                  Elementos afetados ({violation.nodes.length}):
                </strong>
                {violation.nodes.slice(0, 3).map((node, nodeIndex) => (
                  <details key={nodeIndex} style={nodeItemStyle}>
                    <summary style={{ cursor: "pointer", fontWeight: Number(tokens.typography.weightMedium) }}>
                      {node.target.join(" > ")}
                    </summary>
                    <pre style={{
                      marginTop: tokens.spacing.xs,
                      fontSize: tokens.typography.sizeXS,
                      color: tokens.colors.slate600,
                      overflow: "auto"
                    }}>
                      {node.html}
                    </pre>
                    {node.failureSummary && (
                      <p style={{
                        marginTop: tokens.spacing.xs,
                        fontSize: tokens.typography.sizeXS,
                        color: tokens.colors.danger600,
                        fontStyle: "italic"
                      }}>
                        {node.failureSummary}
                      </p>
                    )}
                  </details>
                ))}
                {violation.nodes.length > 3 && (
                  <p style={{
                    fontSize: tokens.typography.sizeXS,
                    color: tokens.colors.slate500,
                    marginTop: tokens.spacing.xs
                  }}>
                    ... e mais {violation.nodes.length - 3} elementos
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}