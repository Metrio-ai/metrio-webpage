/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'

function PostCard ({ title, author, date, description, href }) {
  return (
    <Link to={`${href}`} className='postCard'>
      <div>
        <h3>{title}</h3>
        <p className='postDate'>{date}</p>
        <p className='postAuthor'>Autor: {author}</p>
        <p className='postDescription'>{description}</p>
      </div>
    </Link>
  )
}

export default PostCard
