export interface ParsedSections {
  [header: string]: string;
}

export function parseSections(markdown: string): ParsedSections {
  const sections: ParsedSections = {};
  const lines = markdown.split('\n');
  let currentHeader = '';
  let buffer: string[] = [];

  const flush = () => {
    if (currentHeader) {
      sections[currentHeader] = buffer.join('\n').trim();
    }
    buffer = [];
  };

  for (const line of lines) {
    const match = line.match(/^##\s+(.+?)\s*$/);
    if (match) {
      flush();
      currentHeader = match[1].trim();
    } else {
      buffer.push(line);
    }
  }
  flush();
  return sections;
}

export function getSection(sections: ParsedSections, candidates: string[]): string {
  for (const c of candidates) {
    const key = Object.keys(sections).find(
      (k) => k.toLowerCase().trim() === c.toLowerCase().trim(),
    );
    if (key && sections[key].trim()) return sections[key].trim();
  }
  return '';
}

export function splitList(text: string): string[] {
  return text
    .split('\n')
    .map((l) => l.replace(/^[-*•]\s*/, '').replace(/^\d+\.\s*/, '').trim())
    .filter(Boolean);
}
