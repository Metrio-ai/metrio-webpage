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

  return (
    <div className='appContainer'>
      <Header />
      <h1>Metrio.es - Blog</h1>
      <p>Últimos posts</p>

      <div className='postsContainer'>
        {posts.map(post => {
          if (post) {
            const timestamp = post.timestamp
            const year = timestamp.substring(0, 4)
            const month = timestamp.substring(4, 6) - 1
            const day = timestamp.substring(6, 8)
            const formattedDate = new Date(year, month, day).toLocaleDateString(
              'es-ES',
              {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }
            )
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
      <Footer />
    </div>
  )
}

export default Blog
