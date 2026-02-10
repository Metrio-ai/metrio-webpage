import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '../../data/blogPosts'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import Layout from '../../components/Layout'
import './BlogPost.css'

function BlogPost () {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Blog Metrio Consulting`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', post.description)
      // Open Graph dinámico para compartir en redes
      const ogTitle = document.querySelector('meta[property="og:title"]')
      const ogDesc = document.querySelector('meta[property="og:description"]')
      const ogImage = document.querySelector('meta[property="og:image"]')
      const ogUrl = document.querySelector('meta[property="og:url"]')
      const twTitle = document.querySelector('meta[name="twitter:title"]')
      const twDesc = document.querySelector('meta[name="twitter:description"]')
      const twImage = document.querySelector('meta[name="twitter:image"]')
      const baseUrl = 'https://metrio.es'
      const postUrl = `${baseUrl}/blog/${post.slug}`
      const imageUrl = post.image.startsWith('http') ? post.image : `${baseUrl}${post.image.startsWith('/') ? '' : '/'}${post.image}`
      if (ogTitle) ogTitle.setAttribute('content', `${post.title} | Metrio Consulting`)
      if (ogDesc) ogDesc.setAttribute('content', post.description)
      if (ogImage) ogImage.setAttribute('content', imageUrl)
      if (ogUrl) ogUrl.setAttribute('content', postUrl)
      if (twTitle) twTitle.setAttribute('content', `${post.title} | Metrio Consulting`)
      if (twDesc) twDesc.setAttribute('content', post.description)
      if (twImage) twImage.setAttribute('content', imageUrl)
      // JSON-LD Article para SEO
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        image: imageUrl,
        inLanguage: 'es-ES',
        author: { '@type': 'Organization', name: post.author },
        publisher: { '@type': 'Organization', name: 'Metrio Consulting', logo: { '@type': 'ImageObject', url: 'https://metrio.es/metrioLogo.svg' } },
        datePublished: post.date,
        dateModified: post.date,
        mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl }
      })
      script.id = 'blog-post-ld'
      document.head.appendChild(script)
      return () => {
        document.title = DEFAULT_TITLE
        const d = document.querySelector('meta[name="description"]')
        if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
        if (ogTitle) ogTitle.setAttribute('content', DEFAULT_TITLE)
        if (ogDesc) ogDesc.setAttribute('content', DEFAULT_DESCRIPTION)
        if (ogImage) ogImage.setAttribute('content', 'https://metrio.es/og-image.png')
        if (ogUrl) ogUrl.setAttribute('content', 'https://metrio.es/')
        if (twTitle) twTitle.setAttribute('content', DEFAULT_TITLE)
        if (twDesc) twDesc.setAttribute('content', DEFAULT_DESCRIPTION)
        if (twImage) twImage.setAttribute('content', 'https://metrio.es/og-image.png')
        const ld = document.getElementById('blog-post-ld')
        if (ld) ld.remove()
      }
    }
    return () => {}
  }, [post])

  if (!post) {
    return (
      <Layout>
        <main className="postPage">
          <section className="postNotFound">
            <h1>Artículo no encontrado</h1>
            <Link to="/blog">Volver al blog</Link>
          </section>
        </main>
      </Layout>
    )
  }

  const imageSrc = post.image.startsWith('/')
    ? import.meta.env.BASE_URL + post.image.slice(1)
    : post.image

  const formattedDate = new Date(post.date + 'T12:00:00').toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <Layout>
      <main className="postPage">
        <article className="postArticle">
          <header className="postHeader">
            <img
              src={imageSrc}
              alt={post.imageAlt || ''}
              className="postHeroImage"
              width={1200}
              height={600}
            />
            <div className="postHeaderContent">
              <h1 className="postTitle">{post.title}</h1>
              <p className="postMeta">
                <span>{post.author}</span>
                <span className="postMetaSep">·</span>
                <time dateTime={post.date}>{formattedDate}</time>
              </p>
            </div>
          </header>
          <div className="postBody">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
          </div>
          <footer className="postFooter">
            <Link to="/blog" className="postBackLink">
              <span className="material-icons" aria-hidden="true">arrow_back</span>
              Volver al blog
            </Link>
          </footer>
        </article>
      </main>
    </Layout>
  )
}

export default BlogPost
