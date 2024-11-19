/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import PostCard from './PostCard'
import { getPosts } from '../../utils/api'
import './Blog.css'

function Blog() {
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
    };

    fetchPosts()
  }, [])

  if (loading) return <p>Cargando...</p>

  if (error) return <p>{error}</p>

  return (
    <div className="blogContainer">
      <h1>Metrio.es - Blog</h1>
      <p>Últimos posts</p>

      <div className="postsContainer">
        {posts.map((post) => {
          const formattedDate = new Date(post.date).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })

          return (
            <PostCard 
              key={post._id}
              title={post.title}
              author={post.author}
              date={formattedDate}
              description={post.description}
              href={post.slug}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Blog
