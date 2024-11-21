/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import PostCard from './PostCard'
import { getPosts } from '../../utils/api'
import './Blog.css'
import '../../styles/App.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function Blog () {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getPosts()
        setPosts(data)
      } catch (err) {
        setError('Error al cargar los posts')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) return <p>Cargando...</p>

  if (error) return <p>{error}</p>

  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  const paginate = pageNumber => setCurrentPage(pageNumber)

  const totalPages = Math.ceil(posts.length / postsPerPage)

  return (
    <div className='appContainer'>
      <Header />
      <div className='blogContainer'>
        <section className='blogHeader'>
          <p className='blogHeader-title'>Publicaciones</p>
          <p className='blogHeader-subtitle'>
            Echa un vistazo a las últimas entradas
          </p>
        </section>
        <div className='postsContainer'>
          {currentPosts.map(post => {
            if (post) {
              const timestamp = post.timestamp
              const year = timestamp.substring(0, 4)
              const month = timestamp.substring(4, 6) - 1
              const day = timestamp.substring(6, 8)
              const formattedDate = new Date(
                year,
                month,
                day
              ).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
              post.formattedDate = formattedDate
            }
            return (
              <PostCard
                key={post._id}
                title={post.title}
                author={post.author}
                date={post.formattedDate}
                description={post.description}
                href={post.slug}
              />
            )
          })}
        </div>
        <div className='pagination'>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className='pagination-button'
          >
            <span className='material-icons'>arrow_back</span>
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className='pagination-button'
          >
            <span className='material-icons'>arrow_forward</span>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Blog
