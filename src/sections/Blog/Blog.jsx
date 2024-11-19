import PostCard from './PostCard'
import './Blog.css'

function Blog() {
  // Lista de posts (esto podría provenir de una API, archivo JSON, etc.)
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
    }
  ]

  return (
    <div className="blogContainer">
      <h1>Metrio.es - Blog</h1>
      <p>Últimos posts</p>

      <div className="postsContainer">
        {posts.map((post, index) => (
          <PostCard 
            key={index}
            title={post.title}
            author={post.author}
            date={post.date}
            description={post.description}
            href={post.url}
          />
        ))}
      </div>
    </div>
  )
}

export default Blog
