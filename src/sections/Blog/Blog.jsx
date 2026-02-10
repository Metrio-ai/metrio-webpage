import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PostCard from './PostCard'
import { getPosts } from '../../data/blogPosts'
import { DEFAULT_TITLE, DEFAULT_DESCRIPTION } from '../../data/seo'
import Layout from '../../components/Layout'
import './Blog.css'

function Blog () {
  const [searchParams] = useSearchParams()
  const soloCasos = searchParams.get('filter') === 'casos-exito'
  const allPosts = getPosts()
  const posts = soloCasos ? allPosts.filter((p) => p.category === 'caso-exito') : allPosts
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [soloCasos])

  useEffect(() => {
    document.title = 'Blog | Metrio Consulting – Estrategia de datos, BI, KPIs y transformación digital'
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', 'Artículos sobre estrategia de datos, Business Intelligence, Power BI, KPIs, transformación digital, leads cualificados y desarrollo de producto. Metrio Consulting.')
    return () => {
      document.title = DEFAULT_TITLE
      const d = document.querySelector('meta[name="description"]')
      if (d) d.setAttribute('content', DEFAULT_DESCRIPTION)
    }
  }, [])
  const postsPerPage = 3
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  const formatDate = (dateStr) => {
    return new Date(dateStr + 'T12:00:00').toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Layout className="blogPage">
      <main className="blogMain">
        <header className="blogHero">
          <p className="blogHeroLabel">Blog</p>
          <h1 className="blogHeroTitle">Ideas que suman</h1>
          <p className="blogHeroLead">
            Estrategia de datos, Business Intelligence, Power BI, KPIs, transformación digital, automatización de reportes, calidad de datos y casos de éxito. Ideas que suman.
          </p>
          <div className="blogHeroActions">
            <Link
              to="/blog?filter=casos-exito"
              className={`blogCasosExitoBtn ${soloCasos ? 'blogCasosExitoBtn--active' : ''}`}
              aria-current={soloCasos ? 'true' : undefined}
            >
              <span className="material-icons" aria-hidden="true">emoji_events</span>
              Casos de éxito
            </Link>
            {soloCasos && (
              <Link to="/blog" className="blogVerTodosLink">
                Ver todos los artículos
              </Link>
            )}
          </div>
        </header>

        <section className="blogGrid" aria-label="Artículos">
          {currentPosts.map((post) => (
            <PostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              description={post.description}
              author={post.author}
              date={formatDate(post.date)}
              image={post.image}
              imageAlt={post.imageAlt}
            />
          ))}
        </section>

        {totalPages > 1 && (
          <nav className="blogPagination" aria-label="Paginación">
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="blogPaginationBtn"
              aria-label="Página anterior"
            >
              <span className="material-icons" aria-hidden="true">arrow_back</span>
            </button>
            <span className="blogPaginationInfo">
              Página {currentPage} de {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="blogPaginationBtn"
              aria-label="Página siguiente"
            >
              <span className="material-icons" aria-hidden="true">arrow_forward</span>
            </button>
          </nav>
        )}

        <div className="blogBack">
          <Link to="/" className="blogBackLink">
            <span className="material-icons" aria-hidden="true">arrow_back</span>
            Volver al inicio
          </Link>
        </div>
      </main>
    </Layout>
  )
}

export default Blog
