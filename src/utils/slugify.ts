const dictionary: Record<string, string> = {
  为什么: "why",
  编程: "coding",
  需要: "needs",
  代理: "agent",
  智能体: "agent",
  文章: "article",
  技术: "technical"
};

export function slugify(input: string): string {
  const mapped = Object.entries(dictionary).reduce(
    (value, [source, target]) => value.replaceAll(source, ` ${target} `),
    input.toLowerCase()
  );

  const ascii = mapped
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");

  return ascii || `article-${Date.now()}`;
}
