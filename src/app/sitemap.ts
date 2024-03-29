 
export default function sitemap() {
  return [
    {
      url: 'https://countryoftheday.vercel.app/',
      lastModified: new Date(), // Build date
      alternates: {
        languages: {
          pt: 'https://countryoftheday.vercel.app/pt',
          en: 'https://countryoftheday.vercel.app/en',
        },
      },
    },
  ]
}