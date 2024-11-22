/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getPostById } from '../../utils/api'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './BlogPost.css'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

function BlogPost () {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [markdownContent, setMarkdownContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error] = useState(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(slug)
        setPost(data)

        if (data && data.content) {
          const response = await fetch(data.content)
          if (!response.ok) {
            throw new Error('Error al obtener el contenido Markdown')
          }
          const markdown = await response.text()
          setMarkdownContent(markdown)
        }
      } finally {
        setLoading(false)
      }
    }

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
      day: 'numeric'
    })
  }

  return (
    <div className='appContainer'>
      {post ? (
        <>
          <Header />
          <section className='postContainer'>
            <p className="postContent postAuthor">
              <strong>Autor:</strong> {post.author}
            </p>
            <p className="postContent postDate">
              <strong>Fecha:</strong> {formattedDate}
            </p>
            <div className='postContent postBody'>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {markdownContent}
              </ReactMarkdown>
            </div>
          </section>
          <Footer />
        </>
      ) : (
        <>
          <Header />
          <section className='postContent notFound'>
            <p>Post no encontrado.</p>
          </section>
          <Footer />
        </>
      )}
    </div>
  )
}

export default BlogPost
