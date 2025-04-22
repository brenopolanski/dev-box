/* eslint-disable sort-keys-custom-order-fix/sort-keys-custom-order-fix */
import React from 'react'

import { CSS_NAMESPACE } from '../../constants'
import { getLinkByRel, getMetaContentByName, getMetaContentByProperty } from '../../utils/dom'
import { countWords, isLengthError } from '../../utils/helpers'
import type { ISeoData } from './Seo.types'

export const Seo = () => {
  const [seoData, setSeoData] = React.useState<ISeoData>({
    title: {
      length: 0,
      text: '',
      words: 0,
    },
    description: {
      length: 0,
      text: '',
      words: 0,
    },
    author: null,
    headers: {
      h1: [],
      h2: [],
      h3: [],
      h4: [],
      h5: [],
      h6: [],
    },
    images: {
      total: 0,
      withAlt: 0,
      withTitle: 0,
      withoutAlt: 0,
    },
    keywords: {
      text: '',
      values: [],
    },
    lang: null,
    links: {
      external: 0,
      internal: 0,
      total: 0,
      unique: 0,
      withTitle: 0,
    },
    publisher: null,
    robots: {
      content: null,
      robotsTxt: null,
      sitemapXml: null,
    },
    social: {
      openGraph: {
        title: null,
        description: null,
        image: null,
        siteName: null,
        type: null,
        url: null,
      },
      twitter: {
        title: null,
        description: null,
        card: null,
        creator: null,
        image: null,
        site: null,
      },
    },
    url: {
      canonical: null,
      current: '',
    },
  })

  React.useEffect(() => {
    const analyzeSeo = () => {
      // Get title
      const titleElement = document.querySelector('title')
      const titleText = titleElement?.textContent || ''
      const title = {
        length: titleText.length,
        text: titleText,
        words: countWords(titleText),
      }

      // Get description
      const descriptionText = getMetaContentByName('description')
      const description = {
        length: descriptionText.length,
        text: descriptionText,
        words: countWords(descriptionText),
      }

      // Get keywords
      const keywordsText = getMetaContentByName('keywords')
      const keywords = {
        text: keywordsText,
        values: keywordsText
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
      }

      // Get URL info
      const url = {
        canonical: getLinkByRel('canonical'),
        current: window.location.href,
      }

      // Get robots info
      const robots = {
        content: getMetaContentByName('robots'),
        robotsTxt: '/robots.txt',
        sitemapXml: '/sitemap.xml',
      }

      // Get headers
      const headers = {
        h1: Array.from(document.querySelectorAll('h1'))
          .filter((el) => !el.closest(`.${CSS_NAMESPACE}-container`))
          .map((el) => el.textContent || ''),
        h2: Array.from(document.querySelectorAll('h2'))
          .filter((el) => !el.closest(`.${CSS_NAMESPACE}-container`))
          .map((el) => el.textContent || ''),
        h3: Array.from(document.querySelectorAll('h3'))
          .filter((el) => !el.closest(`.${CSS_NAMESPACE}-container`))
          .map((el) => el.textContent || ''),
        h4: Array.from(document.querySelectorAll('h4'))
          .filter((el) => !el.closest(`.${CSS_NAMESPACE}-container`))
          .map((el) => el.textContent || ''),
        h5: Array.from(document.querySelectorAll('h5'))
          .filter((el) => !el.closest(`.${CSS_NAMESPACE}-container`))
          .map((el) => el.textContent || ''),
        h6: Array.from(document.querySelectorAll('h6'))
          .filter((el) => !el.closest(`.${CSS_NAMESPACE}-container`))
          .map((el) => el.textContent || ''),
      }

      // Get image info
      const allImages = document.querySelectorAll('img')
      const images = {
        total: allImages.length,
        withAlt: Array.from(allImages).filter((img) => img.hasAttribute('alt') && img.getAttribute('alt')?.trim())
          .length,
        withTitle: Array.from(allImages).filter((img) => img.hasAttribute('title') && img.getAttribute('title')?.trim())
          .length,
        withoutAlt: Array.from(allImages).filter((img) => !img.hasAttribute('alt') || !img.getAttribute('alt')?.trim())
          .length,
      }

      // Get link info
      const allLinks = Array.from(document.querySelectorAll('a')).filter(
        (link) => !link.closest(`.${CSS_NAMESPACE}-container`),
      )
      const currentDomain = window.location.hostname
      const links = {
        external: allLinks.filter((link) => {
          try {
            return new URL(link.href).hostname !== currentDomain
          } catch {
            return false
          }
        }).length,
        internal: allLinks.filter((link) => {
          try {
            return new URL(link.href).hostname === currentDomain
          } catch {
            return true
          }
        }).length,
        total: allLinks.length,
        unique: new Set(allLinks.map((link) => link.href)).size,
        withTitle: allLinks.filter((link) => link.hasAttribute('title') && link.getAttribute('title')?.trim()).length,
      }

      // Get social meta info
      const social = {
        openGraph: {
          title: getMetaContentByProperty('og:title'),
          description: getMetaContentByProperty('og:description'),
          image: getMetaContentByProperty('og:image'),
          siteName: getMetaContentByProperty('og:site_name'),
          type: getMetaContentByProperty('og:type'),
          url: getMetaContentByProperty('og:url'),
        },
        twitter: {
          title: getMetaContentByName('twitter:title'),
          description: getMetaContentByName('twitter:description'),
          card: getMetaContentByName('twitter:card'),
          creator: getMetaContentByName('twitter:creator'),
          image: getMetaContentByName('twitter:image'),
          site: getMetaContentByName('twitter:site'),
        },
      }

      // Get author, publisher and lang
      const author = getLinkByRel('author') || getMetaContentByName('author')
      const publisher = getLinkByRel('publisher') || getMetaContentByName('publisher')
      const lang = document.documentElement.getAttribute('lang')

      setSeoData({
        title,
        description,
        author,
        headers,
        images,
        keywords,
        lang,
        links,
        publisher,
        robots,
        social,
        url,
      })
    }

    analyzeSeo()
  }, [])

  const renderSection = (title: string, content: React.ReactNode) => (
    <div className="mb-6">
      <span className="mb-2 text-sm font-bold text-white/80">{title}</span>
      <div className="bg-white/5 p-3">{content}</div>
    </div>
  )

  return (
    <div className="space-y-4">
      {/* Title & Description */}
      {renderSection(
        'Meta Information',
        <div className="space-y-3">
          <div>
            <div className="mb-1 text-xs text-white/60">
              Title ({seoData.title.length} characters, {seoData.title.words} words)
              {isLengthError(seoData.title.length, 30, 65) && (
                <span className="ml-2 text-red-500">(Should be between 30-65 characters)</span>
              )}
            </div>
            <div className="break-all">{seoData.title.text || '❌ No title found'}</div>
          </div>
          <div>
            <div className="mb-1 text-xs text-white/60">
              Description ({seoData.description.length} characters, {seoData.description.words} words)
              {isLengthError(seoData.description.length, 120, 320) && (
                <span className="ml-2 text-red-500">(Should be between 120-320 characters)</span>
              )}
            </div>
            <div className="break-all">{seoData.description.text || '❌ No description found'}</div>
          </div>
          <div>
            <div className="mb-1 text-xs text-white/60">Keywords ({seoData.keywords.values.length} values)</div>
            <div className="break-all">
              {seoData.keywords.values.length > 0 ? seoData.keywords.values.join(', ') : '❌ No keywords found'}
            </div>
          </div>
        </div>,
      )}

      {/* URLs */}
      {renderSection(
        'URLs',
        <div className="space-y-3">
          <div>
            <div className="mb-1 text-xs text-white/60">Current URL</div>
            <div className="break-all">{seoData.url.current}</div>
          </div>
          <div>
            <div className="mb-1 text-xs text-white/60">Canonical URL</div>
            <div className="break-all">{seoData.url.canonical || '❌ No canonical URL found'}</div>
          </div>
        </div>,
      )}

      {/* Author, Publisher & Language */}
      {renderSection(
        'Document Information',
        <div className="space-y-3">
          <div>
            <div className="mb-1 text-xs text-white/60">Author</div>
            <div className="break-all">{seoData.author || '❌ No author found'}</div>
          </div>
          <div>
            <div className="mb-1 text-xs text-white/60">Publisher</div>
            <div className="break-all">{seoData.publisher || '❌ No publisher found'}</div>
          </div>
          <div>
            <div className="mb-1 text-xs text-white/60">Language</div>
            <div className="break-all">{seoData.lang || '❌ No language specified'}</div>
          </div>
        </div>,
      )}

      {/* Robots */}
      {renderSection(
        'Robots & Sitemap',
        <div className="space-y-3">
          <div>
            <div className="mb-1 text-xs text-white/60">Meta Robots</div>
            <div>{seoData.robots.content || '❌ No robots meta tag found'}</div>
          </div>
          <div className="flex gap-4">
            <a
              className="text-blue-400 hover:underline"
              href={seoData.robots.robotsTxt || ''}
              rel="noopener noreferrer"
              target="_blank"
            >
              📄 robots.txt
            </a>
            <a
              className="text-blue-400 hover:underline"
              href={seoData.robots.sitemapXml || ''}
              rel="noopener noreferrer"
              target="_blank"
            >
              🗺️ sitemap.xml
            </a>
          </div>
        </div>,
      )}

      {/* Headers */}
      {renderSection(
        'Headers Structure',
        <div className="space-y-2">
          {Object.entries(seoData.headers).map(([tag, headers]) => (
            <div key={tag}>
              <div className="mb-1 text-xs text-white/60">
                {tag.toUpperCase()} ({headers.length})
                {tag === 'h1' && headers.length !== 1 && (
                  <span className="ml-2 text-red-500">(Should have exactly one H1)</span>
                )}
              </div>
              {headers.length > 0 ? (
                <ul className="list-inside list-disc space-y-1">
                  {headers.map((header, index) => (
                    <li key={index} className="break-all">
                      {header}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-white/40">No {tag.toUpperCase()} tags found</div>
              )}
            </div>
          ))}
        </div>,
      )}

      {/* Images */}
      {renderSection(
        'Images',
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-2xl font-bold">{seoData.images.total}</div>
            <div className="text-sm text-white/60">Total Images</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">{seoData.images.withAlt}</div>
            <div className="text-sm text-white/60">With ALT</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-red-500">{seoData.images.withoutAlt}</div>
            <div className="text-sm text-white/60">Without ALT</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{seoData.images.withTitle}</div>
            <div className="text-sm text-white/60">With Title</div>
          </div>
        </div>,
      )}

      {/* Links */}
      {renderSection(
        'Links',
        <div className="grid grid-cols-5 gap-4">
          <div>
            <div className="text-2xl font-bold">{seoData.links.total}</div>
            <div className="text-sm text-white/60">Total</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{seoData.links.internal}</div>
            <div className="text-sm text-white/60">Internal</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{seoData.links.external}</div>
            <div className="text-sm text-white/60">External</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{seoData.links.unique}</div>
            <div className="text-sm text-white/60">Unique</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{seoData.links.withTitle}</div>
            <div className="text-sm text-white/60">With Title</div>
          </div>
        </div>,
      )}

      {/* Social Meta */}
      {renderSection(
        'Social Meta',
        <div className="space-y-6">
          <div>
            <div className="mb-2 text-sm font-bold text-white/80">Open Graph</div>
            <div className="space-y-2">
              {Object.entries(seoData.social.openGraph).map(([key, value]) => (
                <div key={key}>
                  <div className="text-xs text-white/60">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                  <div className="break-all">{value || '❌ Not found'}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mb-2 text-sm font-bold text-white/80">Twitter Card</div>
            <div className="space-y-2">
              {Object.entries(seoData.social.twitter).map(([key, value]) => (
                <div key={key}>
                  <div className="text-xs text-white/60">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                  <div className="break-all">{value || '❌ Not found'}</div>
                </div>
              ))}
            </div>
          </div>
        </div>,
      )}

      {/* External Tools */}
      {renderSection(
        'External Tools',
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <a
              className="flex items-center gap-2 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
              href={`https://developers.google.com/speed/pagespeed/insights/?url=${encodeURIComponent(seoData.url.current)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              🚀 PageSpeed Insights
            </a>
            <a
              className="flex items-center gap-2 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
              href={`https://search.google.com/test/mobile-friendly?url=${encodeURIComponent(seoData.url.current)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              📱 Mobile-Friendly Test
            </a>
            <a
              className="flex items-center gap-2 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
              href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(seoData.url.current)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              🔍 Rich Results Test
            </a>
            <a
              className="flex items-center gap-2 bg-white/10 px-3 py-2 text-sm hover:bg-white/20"
              href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(seoData.url.current)}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              👥 Facebook Debugger
            </a>
          </div>
        </div>,
      )}
    </div>
  )
}
