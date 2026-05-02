export function GET({ site }: { site: URL }) {
  const siteUrl = site ?? new URL("https://wesley.org.ua");
  const sitemapUrl = new URL("/sitemap.xml", siteUrl).toString();

  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
