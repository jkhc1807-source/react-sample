import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GEO_FAQ_ITEMS } from '../../data/geoFaq.js'
import { fetchFaqItems } from '../../api/contentClient.js'
import { getSeoForPath } from '../../data/seoMeta.js'
import { absoluteUrl, getSiteOrigin } from '../../lib/siteUrl.js'

function upsertMeta(attrName, attrValue, content) {
  const sel = `meta[${attrName}="${attrValue.replace(/"/g, '\\"')}"]`
  let el = document.head.querySelector(sel)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attrName, attrValue)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

export default function DocumentMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    let cancelled = false

    const seo = getSeoForPath(pathname)
    const origin = getSiteOrigin()
    const pageUrl = absoluteUrl(seo.path)
    const siteUrl = origin || pageUrl
    const orgId = `${siteUrl}#organization`

    document.title = seo.title
    upsertMeta('name', 'description', seo.description)
    upsertMeta('name', 'keywords', seo.keywords)
    upsertMeta('name', 'robots', seo.robots)

    upsertMeta('property', 'og:title', seo.title)
    upsertMeta('property', 'og:description', seo.description)
    upsertMeta('property', 'og:url', pageUrl)
    upsertMeta('property', 'og:type', 'website')
    upsertMeta('property', 'og:locale', 'ko_KR')
    upsertMeta('property', 'og:site_name', 'React 학습 허브')

    upsertMeta('name', 'twitter:card', 'summary_large_image')
    upsertMeta('name', 'twitter:title', seo.title)
    upsertMeta('name', 'twitter:description', seo.description)

    if (origin) {
      upsertLink('canonical', pageUrl)
    }

    const graph = [
      {
        '@type': 'Organization',
        '@id': orgId,
        name: 'React 학습 허브',
        url: siteUrl,
        description: 'React와 Vite로 만든 한국어 학습용 프론트엔드 예제 모음.',
      },
      {
        '@type': 'WebSite',
        name: 'React 학습 허브',
        url: siteUrl,
        inLanguage: 'ko-KR',
        description:
          'React와 Vite로 만든 개인 학습용 예제 허브. 샘플 모음, 배열·함수, UI 키트, 실무 패턴.',
        publisher: { '@id': orgId },
      },
      {
        '@type': 'WebPage',
        name: seo.shortTitle,
        description: seo.description,
        url: pageUrl,
        inLanguage: 'ko-KR',
        isPartOf: {
          '@type': 'WebSite',
          name: 'React 학습 허브',
          url: siteUrl,
        },
      },
    ]

    if (!seo.noindex && seo.path !== '/faq') {
      graph.push({
        '@type': 'LearningResource',
        name: seo.shortTitle,
        description: seo.description,
        abstract: seo.description.slice(0, 220),
        url: pageUrl,
        inLanguage: 'ko-KR',
        learningResourceType: 'Tutorial',
        teaches: ['React', 'JavaScript', '프론트엔드', 'Vite'],
        isPartOf: {
          '@type': 'WebSite',
          name: 'React 학습 허브',
          url: siteUrl,
        },
        publisher: { '@id': orgId },
      })
    }

    function applyJsonLd(faqItems) {
      const g = [...graph]
      if (seo.path === '/faq' && !seo.noindex) {
        const items = faqItems?.length ? faqItems : GEO_FAQ_ITEMS
        g.push({
          '@type': 'FAQPage',
          url: pageUrl,
          inLanguage: 'ko-KR',
          mainEntity: items.map(({ question, answer }) => ({
            '@type': 'Question',
            name: question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: answer,
            },
          })),
        })
      }
      upsertJsonLd('seo-jsonld-webpage', {
        '@context': 'https://schema.org',
        '@graph': g,
      })
    }

    if (seo.path === '/faq' && !seo.noindex) {
      void fetchFaqItems().then((items) => {
        if (!cancelled) applyJsonLd(items)
      })
    } else {
      applyJsonLd(null)
    }

    return () => {
      cancelled = true
    }
  }, [pathname])

  return null
}
