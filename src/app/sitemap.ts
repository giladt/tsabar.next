export default async function sitemap() {
  const baseUrl = "https://tsabar.net";

  return [
    { url: baseUrl, lastModified: new Date() },
    // { url: `${baseUrl}/about`, lastModified: new Date() },
  ];
}