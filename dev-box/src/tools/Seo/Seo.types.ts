export interface ISeoData {
  title: {
    text: string
    length: number
    words: number
  }
  description: {
    text: string
    length: number
    words: number
  }
  keywords: {
    text: string
    values: string[]
  }
  url: {
    current: string
    canonical: string | null
  }
  robots: {
    content: string | null
    robotsTxt: string | null
    sitemapXml: string | null
  }
  headers: {
    h1: string[]
    h2: string[]
    h3: string[]
    h4: string[]
    h5: string[]
    h6: string[]
  }
  images: {
    total: number
    withAlt: number
    withoutAlt: number
    withTitle: number
  }
  links: {
    total: number
    internal: number
    external: number
    unique: number
    withTitle: number
  }
  social: {
    openGraph: {
      title: string | null
      description: string | null
      image: string | null
      url: string | null
      type: string | null
      siteName: string | null
    }
    twitter: {
      card: string | null
      title: string | null
      description: string | null
      image: string | null
      site: string | null
      creator: string | null
    }
  }
  author: string | null
  publisher: string | null
  lang: string | null
}
