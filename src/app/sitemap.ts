import apartments from "@/assets/apartments.json"
export default async function sitemap() {
  const baseUrl = "https://www.tsabar.net";

  const pages = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
  ];
  // add apartments pages
  apartments.forEach(apartment => pages.push(
    { url: `${baseUrl}/${apartment.url}`, lastModified: new Date() },
  ))
  return pages;
}