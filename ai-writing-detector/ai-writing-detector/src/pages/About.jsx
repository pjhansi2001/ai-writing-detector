export default function About() {
  return (
    <div style={{ padding: "40px 20px" }}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 36,
            fontWeight: 900,
            margin: "0 0 24px",
            textAlign: "center",
            background: "linear-gradient(135deg, #fff 0%, #999 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          About This Tool
        </h1>

        <div style={{ color: "#bbb", fontSize: 15, lineHeight: 1.8 }}>
          <Section title="What is this?">
            <p>
              A writing tool that scans your text for patterns commonly found in
              AI-generated content. It checks for 25 distinct tells across five
              categories: content inflation, language tics, style artifacts,
              chatbot leftovers, and filler patterns.
            </p>
          </Section>

          <Section title="Where do the patterns come from?">
            <p>
              The patterns are based on Wikipedia's "Signs of AI writing" page,
              which is maintained by WikiProject AI Cleanup. The editors there
              have catalogued thousands of instances of AI-generated text and
              distilled them into the recurring signals this tool detects.
            </p>
          </Section>

          <Section title="How scoring works">
            <p>
              Each detected pattern adds deductions based on the number of
              matches. The tool also factors in pattern density relative to text
              length, so a 500-word essay with 20 AI tells is penalized more
              heavily than a 5,000-word article with the same count. The score
              ranges from 0 (thoroughly machine-generated) to 100 (reads like a
              human wrote it).
            </p>
          </Section>

          <Section title="Limitations">
            <p>
              This is a heuristic tool, not a classifier. It catches surface-level
              patterns but can't detect deeper issues like synonym cycling or
              structural monotony that require full NLP analysis. A clean score
              doesn't prove human authorship, and some flagged patterns appear in
              human writing too. Use it as a quick editorial pass, not a verdict.
            </p>
          </Section>

          <Section title="Tech stack">
            <p>
              Built with React 18, React Router, and Vite. All analysis runs
              client-side in the browser. No text is sent to any server. The
              pattern matching uses a mix of substring search and regex.
            </p>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h2
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 13,
          fontWeight: 700,
          color: "#ef4444",
          letterSpacing: 1,
          textTransform: "uppercase",
          margin: "0 0 10px",
        }}
      >
        {title}
      </h2>
      <div style={{ color: "#bbb", fontSize: 15, lineHeight: 1.8 }}>{children}</div>
    </div>
  );
}
