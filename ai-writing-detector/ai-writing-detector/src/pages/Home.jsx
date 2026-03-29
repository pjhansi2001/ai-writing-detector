import { useState, useRef, useCallback } from "react";
import { CATEGORY_META, SAMPLE_AI_TEXT, SAMPLE_HUMAN_TEXT } from "../data/patterns";
import { analyzeText, getScoreLabel } from "../utils/analyzer";
import ScoreGauge from "../components/ScoreGauge";
import PatternCard from "../components/PatternCard";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [expanded, setExpanded] = useState(new Set());
  const timerRef = useRef(null);

  const runAnalysis = useCallback((val) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setResult(analyzeText(val));
      setExpanded(new Set());
    }, 300);
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
    runAnalysis(e.target.value);
  };

  const loadSample = (sample) => {
    setText(sample);
    runAnalysis(sample);
  };

  const clear = () => {
    setText("");
    setResult(null);
    setExpanded(new Set());
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const catCounts = {};
  if (result?.findings) {
    for (const f of result.findings) {
      const c = f.pattern.category;
      catCounts[c] = (catCounts[c] || 0) + f.hits.length;
    }
  }

  return (
    <div style={{ padding: "40px 20px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: 6,
              color: "#ef4444",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            AI Writing Detector
          </div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 42,
              fontWeight: 900,
              margin: 0,
              lineHeight: 1.1,
              background: "linear-gradient(135deg, #fff 0%, #999 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Does Your Writing
            <br />
            Sound Like a Robot?
          </h1>
          <p
            style={{
              color: "#666",
              fontSize: 15,
              marginTop: 14,
              lineHeight: 1.6,
              maxWidth: 480,
              margin: "14px auto 0",
            }}
          >
            Paste any text below. We'll scan for 25 telltale patterns that scream
            "a machine wrote this."
          </p>
        </div>

        {/* Textarea */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <textarea
            value={text}
            onChange={handleChange}
            placeholder="Paste your text here..."
            rows={10}
            style={{
              width: "100%",
              background: "#111",
              border: "1px solid #2a2a2a",
              borderRadius: 10,
              color: "#d0d0d0",
              fontSize: 15,
              lineHeight: 1.7,
              padding: 20,
              resize: "vertical",
              fontFamily: "var(--font-body)",
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#ef444466")}
            onBlur={(e) => (e.target.style.borderColor = "#2a2a2a")}
          />
          {text && (
            <div
              style={{
                position: "absolute",
                bottom: 12,
                right: 12,
                fontSize: 11,
                color: "#555",
                fontFamily: "var(--font-mono)",
              }}
            >
              {text.split(/\s+/).filter(Boolean).length} words
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 10, marginBottom: 32, flexWrap: "wrap" }}>
          <SampleButton onClick={() => loadSample(SAMPLE_AI_TEXT)} label="Load AI sample" />
          <SampleButton onClick={() => loadSample(SAMPLE_HUMAN_TEXT)} label="Load human sample" />
          {text && (
            <button
              onClick={clear}
              style={{
                background: "transparent",
                border: "1px solid #2a2a2a",
                color: "#666",
                padding: "10px 18px",
                borderRadius: 8,
                fontSize: 13,
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Results */}
        {result && text.trim() && (
          <div>
            <div
              style={{
                background: "#111",
                border: "1px solid #1f1f1f",
                borderRadius: 14,
                padding: "28px 24px",
                marginBottom: 24,
              }}
            >
              <ScoreGauge score={result.score} />
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <p style={{ color: "#999", fontSize: 14, margin: 0, lineHeight: 1.6 }}>
                  {getScoreLabel(result.score)}
                </p>
              </div>

              {result.totalHits > 0 && (
                <div style={{ marginTop: 24 }}>
                  <div
                    style={{
                      display: "flex",
                      borderRadius: 6,
                      overflow: "hidden",
                      height: 8,
                      background: "#1a1a1a",
                    }}
                  >
                    {Object.entries(catCounts).map(([cat, count]) => (
                      <div
                        key={cat}
                        style={{
                          width: `${(count / result.totalHits) * 100}%`,
                          background: CATEGORY_META[cat]?.color || "#555",
                          transition: "width 0.4s ease",
                        }}
                      />
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 14,
                      marginTop: 10,
                      justifyContent: "center",
                    }}
                  >
                    {Object.entries(catCounts).map(([cat, count]) => (
                      <div key={cat} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: 2,
                            background: CATEGORY_META[cat]?.color,
                          }}
                        />
                        <span
                          style={{
                            fontSize: 11,
                            color: "#777",
                            fontFamily: "var(--font-mono)",
                          }}
                        >
                          {CATEGORY_META[cat]?.label} ({count})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {result.findings.length > 0 ? (
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      letterSpacing: 3,
                      color: "#666",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    Detected patterns
                  </h3>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "#ef4444" }}>
                    {result.findings.length} pattern{result.findings.length !== 1 ? "s" : ""},{" "}
                    {result.totalHits} total hit{result.totalHits !== 1 ? "s" : ""}
                  </span>
                </div>
                {result.findings.map((f) => (
                  <PatternCard
                    key={f.pattern.id}
                    finding={f}
                    expanded={expanded.has(f.pattern.id)}
                    onToggle={() => toggleExpand(f.pattern.id)}
                  />
                ))}
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: 40,
                  color: "#22c55e",
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                }}
              >
                No AI patterns detected. This text looks human.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function SampleButton({ onClick, label }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
      style={{
        background: "#1a1a1a",
        border: `1px solid ${hovered ? "#ef4444" : "#333"}`,
        color: hovered ? "#ef4444" : "#aaa",
        padding: "10px 18px",
        borderRadius: 8,
        fontSize: 13,
        fontFamily: "var(--font-mono)",
        transition: "all 0.15s",
      }}
    >
      {label}
    </button>
  );
}
