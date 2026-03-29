import { PATTERNS } from "../data/patterns";

export function analyzeText(text) {
  if (!text.trim()) return { score: 100, findings: [], totalHits: 0 };

  const lower = text.toLowerCase();
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  if (wordCount < 5) return { score: 100, findings: [], totalHits: 0 };

  const findings = [];
  let totalDeductions = 0;

  for (const p of PATTERNS) {
    if (p.manual) continue;

    let hits = [];

    if (p.words) {
      for (const w of p.words) {
        let idx = 0;
        const wl = w.toLowerCase();
        while (true) {
          const found = lower.indexOf(wl, idx);
          if (found === -1) break;
          hits.push({
            start: found,
            end: found + w.length,
            text: text.slice(found, found + w.length),
          });
          idx = found + 1;
        }
      }
    }

    if (p.regex) {
      const re = new RegExp(p.regex.source, p.regex.flags);
      let m;
      while ((m = re.exec(text)) !== null) {
        hits.push({
          start: m.index,
          end: m.index + m[0].length,
          text: m[0],
        });
      }
    }

    const thresh = p.threshold || 1;
    if (hits.length >= thresh) {
      const severity = Math.min(hits.length * (p.words ? 2 : 3), 15);
      totalDeductions += severity;
      findings.push({ pattern: p, hits, severity });
    }
  }

  const densityPenalty = Math.min((totalDeductions / wordCount) * 100, 30);
  const rawScore = Math.max(0, 100 - totalDeductions - densityPenalty);
  const score = Math.round(rawScore);
  const totalHits = findings.reduce((s, f) => s + f.hits.length, 0);

  findings.sort((a, b) => b.severity - a.severity);
  return { score, findings, totalHits };
}

export function getScoreLabel(score) {
  if (score >= 85) return "This reads like a real person wrote it. Nice work.";
  if (score >= 65) return "Pretty decent, but there are some AI tells. A few edits would clean it up.";
  if (score >= 40) return "This has a noticeable AI aftertaste. Multiple patterns detected.";
  return "This text is saturated with AI writing patterns. Almost certainly machine-generated.";
}

export function getScoreColor(score) {
  if (score >= 75) return "#22c55e";
  if (score >= 45) return "#eab308";
  return "#ef4444";
}
