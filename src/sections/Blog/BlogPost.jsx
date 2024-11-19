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

  return (
    <div className="appContainer">
      {post ? (
        <>
          <Header />
          <h1>{post.title}</h1>
          <p><strong>Autor:</strong> {post.author}</p>
          <p><strong>Fecha:</strong> {new Date(post.date).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
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
