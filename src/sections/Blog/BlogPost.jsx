import { useParams } from 'react-router-dom'
import './BlogPost.css'

function BlogPost() {
  // Obtenemos el id del post desde los parámetros de la URL
  const { postId } = useParams()

  // Aquí podrías hacer una solicitud para obtener los detalles del post basado en el ID (si los posts se cargan desde una API)
  // Para este ejemplo, simplemente se simula que se usa el postId
  // También podrías buscar el post en un array si lo tienes en memoria

  // Suponiendo que los datos de los posts estén en un array:
  const posts = [
    { 
      id: 1, 
      title: "Cómo empezar con React", 
      author: "Pablo Sierra",
      timestamp: "20241119",
      date: "19 de noviembre de 2024", 
      description: "Una guía para comenzar a desarrollar con React.js.",
      slug: "como-empezar-con-react",
      content: "Este es el contenido completo del post sobre cómo empezar con React. Aquí se explica cómo configurar tu entorno de desarrollo y empezar con los primeros componentes."
    },
    { 
      id: 2, 
      title: "Manejo de estado en React", 
      author: "Pablo Sierra",
      timestamp: "20241117",
      date: "17 de noviembre de 2024", 
      description: "Exploramos cómo manejar el estado en componentes de React.",
      slug:"manejo-de-estado-en-react",
      content: "En este post, cubrimos cómo manejar el estado en React usando useState y useEffect, y cómo compartir estado entre componentes."
    },
  ]

  const post = posts.find(post => post.slug === postId)

  return (
    <div className="blogPostContainer">
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p><strong>Autor:</strong> {post.author}</p>
          <p><strong>Fecha:</strong> {post.date}</p>
          <p>{post.content}</p>
        </>
      ) : (
        <p>Post no encontrado.</p>  // Mensaje de error si el post no existe
      )}
    </div>
  )
}

export default BlogPost
