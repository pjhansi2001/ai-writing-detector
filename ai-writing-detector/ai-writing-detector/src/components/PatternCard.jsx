import { CATEGORY_META } from "../data/patterns";

export default function PatternCard({ finding, expanded, onToggle }) {
  const cat = CATEGORY_META[finding.pattern.category];

  return (
    <div
      onClick={onToggle}
      style={{
        background: "#141414",
        border: `1px solid ${expanded ? cat.color + "66" : "#2a2a2a"}`,
        borderRadius: 8,
        padding: "12px 16px",
        cursor: "pointer",
        transition: "border-color 0.2s",
        marginBottom: 8,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              background: cat.color + "22",
              color: cat.color,
              fontSize: 10,
              fontWeight: 700,
              padding: "3px 8px",
              borderRadius: 4,
              textTransform: "uppercase",
              letterSpacing: 1,
              fontFamily: "var(--font-mono)",
            }}
          >
            {cat.label}
          </span>
          <span style={{ color: "#e0e0e0", fontSize: 14, fontWeight: 600 }}>
            {finding.pattern.name}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span
            style={{
              color: cat.color,
              fontSize: 13,
              fontWeight: 700,
              fontFamily: "var(--font-mono)",
            }}
          >
            {finding.hits.length} hit{finding.hits.length !== 1 ? "s" : ""}
          </span>
          <span
            style={{
              color: "#555",
              fontSize: 16,
              transition: "transform 0.2s",
              transform: expanded ? "rotate(90deg)" : "rotate(0)",
            }}
          >
            ▸
          </span>
        </div>
      </div>

      {expanded && (
        <div style={{ marginTop: 12 }}>
          <p
            style={{
              color: "#999",
              fontSize: 13,
              margin: "0 0 10px",
              lineHeight: 1.5,
              fontStyle: "italic",
            }}
          >
            {finding.pattern.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {finding.hits.slice(0, 12).map((h, i) => (
              <span
                key={i}
                style={{
                  background: cat.color + "18",
                  color: cat.color,
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 4,
                  fontFamily: "var(--font-mono)",
                  border: `1px solid ${cat.color}33`,
                  maxWidth: 260,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                "{h.text}"
              </span>
            ))}
            {finding.hits.length > 12 && (
              <span style={{ color: "#666", fontSize: 12, padding: "4px 6px" }}>
                +{finding.hits.length - 12} more
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
