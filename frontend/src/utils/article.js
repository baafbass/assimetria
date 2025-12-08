export const extractFirstImageUrl = (markdown) => {
  if (!markdown) return null;

  const imgRegex = /!\[.*?\]\((.*?)\)/i;
  const match = markdown.match(imgRegex);
  return match ? match[1] : null;
};

/* Convert AI's Markdown string to plain text for the preview. */
export const markdownToPlain = (md) => {
  if (!md) return "";

  let text = md;

  // Remove images: ![alt](url)
  text = text.replace(/!\[.*?\]\(.*?\)/g, "");

  // Replace links [text](url) => text
  text = text.replace(/\[([^\]]+)\]\((?:.|\n)*?\)/g, "$1");

  // Remove headings (#, ##, etc.)
  text = text.replace(/^#+\s?/gm, "");

  // Remove bold/italic markers **bold**, __bold__, *italic*, _italic_
  text = text.replace(/(\*\*|__)(.*?)\1/g, "$2");
  text = text.replace(/(\*|_)(.*?)\1/g, "$2");

  // Remove inline code `code` and fenced code blocks ``` ```
  text = text.replace(/`([^`]+)`/g, "$1");
  text = text.replace(/```[\s\S]*?```/g, "");

  // Remove HTML tags if accidentally present
  text = text.replace(/<\/?[^>]+(>|$)/g, "");

  // Remove horizontal rules (---, ***, ___)
  text = text.replace(/^(-{3,}|\*{3,}|_{3,})$/gm, "");

  // Normalize whitespace (multiple newlines -> single newline)
  text = text.replace(/\r\n/g, "\n");
  text = text.replace(/\n{2,}/g, "\n\n");

  // Trim extra spaces
  text = text.trim();

  return text;
};

export const getPreview = (content, maxChars = 220) => {
  const plain = markdownToPlain(content);
  if (plain.length <= maxChars) return plain;

  // Try to cut at last space before maxChars for nicer preview
  const truncated = plain.slice(0, maxChars);
  const lastSpace = truncated.lastIndexOf(" ");
  return (lastSpace > 60 ? truncated.slice(0, lastSpace) : truncated).trim() + "...";
};