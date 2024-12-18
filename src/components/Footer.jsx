import { Link } from 'react-router-dom'

function Footer () {
  return (
    <footer className='footerContainer'>
      <div className='footerContent'>
        <span className='footer-item'>
          <a
            href='https://github.com/Metrio-ai'
            target='_blank'
            rel='noopener noreferrer'
          >
            <i className='fab fa-github'></i>
          </a>
        </span>
        <span className='footer-item'>
          <Link to='/contact'><a>
            <span className='material-icons'>mail</span>
          </a></Link>
        </span>
      </div>
      <div className='footerCopyright'>
        <p>
          &copy; 2024 Metrio Software & Data Consulting.
          <br />
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}

export default Footer
