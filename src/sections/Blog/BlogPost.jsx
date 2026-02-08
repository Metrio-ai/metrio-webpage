import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getPostBySlug } from '../../data/blogPosts'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './BlogPost.css'

function BlogPost () {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Blog Metrio Consulting`
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', post.description)
    }
    return () => {
      document.title = 'Metrio Consulting | Consultoría tecnológica y desarrollo de producto'
      const metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) metaDesc.setAttribute('content', 'Metrio Consulting: consultoría tecnológica desde 2024. BI, desarrollo de producto, transformación digital, leads cualificados. Tecnología, producto y criterio.')
    }
  }, [post])

  if (!post) {
    return (
      <div className="appContainer">
        <Header />
        <main className="postPage">
          <section className="postNotFound">
            <h1>Artículo no encontrado</h1>
            <Link to="/blog">Volver al blog</Link>
          </section>
        </main>
        <Footer />
      </div>
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
    <div className="appContainer">
      <Header />
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
      <Footer />
    </div>
  )
}

export default BlogPost
