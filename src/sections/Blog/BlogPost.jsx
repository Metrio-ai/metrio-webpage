import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getPostById } from '../../utils/api'; // Asegúrate de tener la función para obtener el post por su ID
import './BlogPost.css';

function BlogPost() {
  const { postId } = useParams();  // Capturamos el slug del post desde la URL
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(postId); // Llamada a la API para obtener el post
        setPost(data);  // Establecer el post en el estado
      } catch (err) {
        setError('Error al cargar el post');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]); // Solo vuelve a ejecutar el efecto si el postId cambia

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blogPostContainer">
      {post ? (
        <>
          <h1>{post.title}</h1>
          <p><strong>Autor:</strong> {post.author}</p>
          <p><strong>Fecha:</strong> {new Date(post.date).toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}</p>
          <p>{post.content}</p>
        </>
      ) : (
        <p>Post no encontrado.</p>
      )}
    </div>
  );
}

export default BlogPost;
