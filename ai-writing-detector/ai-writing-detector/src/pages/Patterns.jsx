import { useState } from "react";
import { PATTERNS, CATEGORY_META } from "../data/patterns";

const categories = Object.keys(CATEGORY_META);

export default function Patterns() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openId, setOpenId] = useState(null);

  const filtered =
    activeCategory === "all"
      ? PATTERNS
      : PATTERNS.filter((p) => p.category === activeCategory);

  return (
    <div style={{ padding: "40px 20px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 36,
              fontWeight: 900,
              margin: "0 0 10px",
              background: "linear-gradient(135deg, #fff 0%, #999 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            The 25 Patterns
          </h1>
          <p style={{ color: "#666", fontSize: 14, lineHeight: 1.6 }}>
            Every telltale sign of AI writing, with before/after examples and fixes.
          </p>
        </div>

        {/* Category filters */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 28,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <FilterChip
            label="All"
            active={activeCategory === "all"}
            color="#ef4444"
            onClick={() => setActiveCategory("all")}
          />
          {categories.map((cat) => (
            <FilterChip
              key={cat}
              label={CATEGORY_META[cat].label}
              active={activeCategory === cat}
              color={CATEGORY_META[cat].color}
              onClick={() => setActiveCategory(cat)}
            />
          ))}
        </div>

        {/* Pattern cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {filtered.map((p) => {
            const cat = CATEGORY_META[p.category];
            const isOpen = openId === p.id;

            return (
              <div
                key={p.id}
                onClick={() => setOpenId(isOpen ? null : p.id)}
                style={{
                  background: "#111",
                  border: `1px solid ${isOpen ? cat.color + "55" : "#1f1f1f"}`,
                  borderRadius: 10,
                  padding: "16px 20px",
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        fontWeight: 800,
                        color: "#444",
                        minWidth: 28,
                      }}
                    >
                      {String(p.id).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        background: cat.color + "22",
                        color: cat.color,
                        fontSize: 9,
                        fontWeight: 700,
                        padding: "3px 7px",
                        borderRadius: 3,
                        textTransform: "uppercase",
                        letterSpacing: 1,
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {cat.label}
                    </span>
                    <span style={{ color: "#e0e0e0", fontSize: 15, fontWeight: 600 }}>
                      {p.name}
                    </span>
                  </div>
                  <span
                    style={{
                      color: "#555",
                      fontSize: 16,
                      transition: "transform 0.2s",
                      transform: isOpen ? "rotate(90deg)" : "rotate(0)",
                    }}
                  >
                    ▸
                  </span>
                </div>

                {/* Description */}
                <p
                  style={{
                    color: "#888",
                    fontSize: 13,
                    margin: "8px 0 0 40px",
                    lineHeight: 1.5,
                  }}
                >
                  {p.desc}
                </p>

                {/* Expanded detail */}
                {isOpen && (
                  <div style={{ marginTop: 18, marginLeft: 40 }}>
                    {/* Fix */}
                    {p.fix && (
                      <div style={{ marginBottom: 16 }}>
                        <div
                          style={{
                            fontSize: 10,
                            letterSpacing: 2,
                            color: "#22c55e",
                            textTransform: "uppercase",
                            fontFamily: "var(--font-mono)",
                            fontWeight: 700,
                            marginBottom: 6,
                          }}
                        >
                          How to fix
                        </div>
                        <p style={{ color: "#bbb", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                          {p.fix}
                        </p>
                      </div>
                    )}

                    {/* Before/After */}
                    {p.before && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        <ExampleBlock label="Before" color="#ef4444" text={p.before} />
                        <ExampleBlock label="After" color="#22c55e" text={p.after} />
                      </div>
                    )}

                    {/* Trigger words */}
                    {p.words && (
                      <div style={{ marginTop: 16 }}>
                        <div
                          style={{
                            fontSize: 10,
                            letterSpacing: 2,
                            color: "#666",
                            textTransform: "uppercase",
                            fontFamily: "var(--font-mono)",
                            fontWeight: 700,
                            marginBottom: 8,
                          }}
                        >
                          Trigger words/phrases
                        </div>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                          {p.words.map((w, i) => (
                            <span
                              key={i}
                              style={{
                                background: "#1a1a1a",
                                color: "#aaa",
                                fontSize: 11,
                                padding: "3px 8px",
                                borderRadius: 3,
                                fontFamily: "var(--font-mono)",
                                border: "1px solid #252525",
                              }}
                            >
                              {w}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FilterChip({ label, active, color, onClick }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={{
        background: active ? color + "22" : "#141414",
        border: `1px solid ${active ? color + "55" : "#2a2a2a"}`,
        color: active ? color : "#777",
        padding: "7px 14px",
        borderRadius: 6,
        fontSize: 12,
        fontFamily: "var(--font-mono)",
        fontWeight: 600,
        transition: "all 0.15s",
        letterSpacing: 0.5,
      }}
    >
      {label}
    </button>
  );
}

function ExampleBlock({ label, color, text }) {
  return (
    <div
      style={{
        background: "#0d0d0d",
        borderLeft: `3px solid ${color}`,
        padding: "12px 16px",
        borderRadius: "0 6px 6px 0",
      }}
    >
      <div
        style={{
          fontSize: 9,
          letterSpacing: 2,
          color,
          textTransform: "uppercase",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <p
        style={{
          color: "#bbb",
          fontSize: 13,
          lineHeight: 1.6,
          margin: 0,
          fontStyle: "italic",
        }}
      >
        {text}
      </p>
    </div>
  );
}
