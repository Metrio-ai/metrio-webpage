import { useState } from 'react'
import { Link } from 'react-router-dom'
import PostCard from './PostCard'
import { getPosts } from '../../data/blogPosts'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import './Blog.css'

function Blog () {
  const posts = getPosts()
  const [currentPage, setCurrentPage] = useState(1)
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
    <div className="blogPage appContainer">
      <Header />
      <main className="blogMain">
        <header className="blogHero">
          <p className="blogHeroLabel">Blog</p>
          <h1 className="blogHeroTitle">Ideas que suman</h1>
          <p className="blogHeroLead">
            Por qué es importante la estrategia de datos, el BI, los leads cualificados y medir lo que importa.
          </p>
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
      <Footer />
    </div>
  )
}

export default Blog
