import type { Announcement } from "@/lib/types";

/**
 * Parses raw unformatted bulk text entered by the Catechist into structured,
 * beautifully formatted individual announcements.
 *
 * Supports:
 * - Numbered lists (e.g., "1. CWO MEETING", "2) INFANT BAPTISM", "3 - HARVEST")
 * - Markdown / text headers ("### NOTICE", "**TITLE**")
 * - Delimited blocks (separated by 2 or more blank lines)
 * - Automatic detection of issuing bodies ("Issued by:", "From CWO", etc.)
 */
export function parseBulkAnnouncements(rawText: string): Announcement[] {
  if (!rawText || !rawText.trim()) return [];

  // Split by double newline or numbered items at the beginning of a line
  // Example regex matches "1. ", "2) ", "Announcement 1:", etc.
  const sections: string[] = [];
  const lines = rawText.split(/\r?\n/);
  let currentBlock: string[] = [];

  const isNewItemHeader = (line: string): boolean => {
    const trimmed = line.trim();
    if (!trimmed) return false;
    // Matches "1. ", "1) ", "1 - ", "# 1.", "Announcement 1:", "[1]", etc.
    if (/^(?:#+\s*)?(?:Announcement\s*)?\[?\d+[\.\)\-\]]\s+/i.test(trimmed)) return true;
    // Matches markdown headings like "### Title"
    if (/^#{1,4}\s+[A-Za-z0-9]/.test(trimmed)) return true;
    return false;
  };

  for (const line of lines) {
    if (isNewItemHeader(line) && currentBlock.length > 0) {
      const blockStr = currentBlock.join("\n").trim();
      if (blockStr) sections.push(blockStr);
      currentBlock = [line];
    } else {
      currentBlock.push(line);
    }
  }

  if (currentBlock.length > 0) {
    const blockStr = currentBlock.join("\n").trim();
    if (blockStr) sections.push(blockStr);
  }

  // Fallback: If no numbered items detected, split by double empty lines
  const rawItems = sections.length > 1 ? sections : rawText.split(/\n\s*\n{2,}/).map((s) => s.trim()).filter(Boolean);

  const now = new Date().toISOString();

  return rawItems.map((item, index) => {
    const itemLines = item.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (itemLines.length === 0) {
      return {
        slug: `announcement-${index + 1}`,
        title: `Announcement ${index + 1}`,
        body: item,
        publishedAt: now,
        isUrgent: false,
        isFeatured: false,
      };
    }

    // Extract Title from the first line
    let firstLine = itemLines[0];
    // Clean leading numbers: "1. CWO MEETING" -> "CWO MEETING"
    firstLine = firstLine.replace(/^(?:#+\s*)?(?:Announcement\s*)?\[?\d+[\.\)\-\]]\s*/i, "");
    firstLine = firstLine.replace(/^#+\s*/, "").replace(/^\*+|\*+$/g, "").trim();

    // The rest is the body
    const bodyLines = itemLines.slice(1);
    let body = bodyLines.join("\n\n").trim();

    if (!body) {
      // If only one line was given, split title and body
      const colonIdx = firstLine.indexOf(":");
      if (colonIdx > 0 && colonIdx < 50) {
        body = firstLine.substring(colonIdx + 1).trim();
        firstLine = firstLine.substring(0, colonIdx).trim();
      } else {
        body = firstLine;
        firstLine = `Announcement ${index + 1}`;
      }
    }

    // Detect issuing body (e.g., "Issued by: CMO", "From: CWO", "Secretariat")
    let issuedBy: string | undefined = undefined;
    const issuedMatch = body.match(/(?:Issued by|From|By|Signed):\s*([^\n\.]+)/i);
    if (issuedMatch) {
      issuedBy = issuedMatch[1].trim();
    } else if (/CWO|Catholic Women/i.test(firstLine + " " + body)) {
      issuedBy = "Catholic Women Organisation (CWO)";
    } else if (/CMO|Catholic Men/i.test(firstLine + " " + body)) {
      issuedBy = "Catholic Men Organization (CMO)";
    } else if (/CYON|Youth/i.test(firstLine + " " + body)) {
      issuedBy = "Catholic Youth Organization (CYON)";
    } else if (/FECAMDS/i.test(firstLine + " " + body)) {
      issuedBy = "FECAMDS & Medical Guild";
    } else if (/NFCS|Students/i.test(firstLine + " " + body)) {
      issuedBy = "NFCS Chaplaincy Chapter";
    } else if (/Catechism|Baptism|Sacrament/i.test(firstLine + " " + body)) {
      issuedBy = "Chaplaincy Catechetical Commission";
    } else if (/Harvest|Bazaar/i.test(firstLine + " " + body)) {
      issuedBy = "Harvest & Bazaar Committee";
    } else {
      issuedBy = "Chaplaincy Pastoral Council";
    }

    // Detect urgency
    const isUrgent = /urgent|important|emergency|attention|immediate/i.test(firstLine + " " + body);

    // Create a URL-safe slug
    const slugBase = firstLine
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .substring(0, 50);
    const slug = `${slugBase || "notice"}-${index + 1}`;

    // Generate excerpt
    const excerpt = body.length > 140 ? body.substring(0, 137).trim() + "..." : body;

    return {
      slug,
      title: firstLine,
      excerpt,
      body,
      category: isUrgent ? "urgent" : "general",
      issuedBy,
      publishedAt: now,
      isUrgent,
      isFeatured: index < 2,
    };
  });
}
