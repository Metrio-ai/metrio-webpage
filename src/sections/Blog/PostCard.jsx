/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

function PostCard({ title, author, date, description, href }) {
    return (
        <div className="postCard">
            <h3><Link to={`/blog/${href}`}>{title}</Link></h3>
            <p className="postDate">{date}</p>
            <p className="postAuthor">Autor: {author}</p>
            <p className="postDescription">{description}</p>
        </div>
    )
  }
  
  export default PostCard
  