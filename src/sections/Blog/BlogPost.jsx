/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPostById } from '../../utils/api'
import './BlogPost.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(slug)
        setPost(data)
      } catch (err) {
        setError('Error al cargar el post')
      } finally {
        setLoading(false)
      }
    };

    fetchPost()
  }, [slug])

  if (loading) return <p>Cargando...</p>
  if (error) return <p>{error}</p>

  let formattedDate = null
  if (post) {
    const timestamp = post.timestamp
    const year = timestamp.substring(0, 4)
    const month = timestamp.substring(4, 6) - 1
    const day = timestamp.substring(6, 8)

    formattedDate = new Date(year, month, day).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="appContainer">
      {post ? (
        <>
          <Header />
          <h1>{post.title}</h1>
          <p><strong>Autor:</strong> {post.author}</p>
          <p><strong>Fecha:</strong> {formattedDate}</p>
          <p>{post.content}</p>
          <Footer />
        </>
      ) : (
        <p>Post no encontrado.</p>
      )}
    </div>
  )
}

export default BlogPost
