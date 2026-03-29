import { getScoreColor } from "../utils/analyzer";

export default function ScoreGauge({ score }) {
  const r = 80;
  const circ = Math.PI * r;
  const offset = circ - (score / 100) * circ;
  const color = getScoreColor(score);

  return (
    <div style={{ position: "relative", width: 200, height: 120, margin: "0 auto" }}>
      <svg viewBox="0 0 200 120" style={{ width: "100%", height: "100%" }}>
        <path
          d={`M 20 110 A ${r} ${r} 0 0 1 180 110`}
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="12"
          strokeLinecap="round"
        />
        <path
          d={`M 20 110 A ${r} ${r} 0 0 1 180 110`}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.8s ease, stroke 0.4s ease" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          bottom: 8,
          left: "50%",
          transform: "translateX(-50%)",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color,
            fontFamily: "var(--font-mono)",
            transition: "color 0.4s",
          }}
        >
          {score}
        </div>
        <div
          style={{
            fontSize: 10,
            color: "#888",
            letterSpacing: 2,
            textTransform: "uppercase",
            fontFamily: "var(--font-mono)",
          }}
        >
          human score
        </div>
      </div>
    </div>
  );
}
