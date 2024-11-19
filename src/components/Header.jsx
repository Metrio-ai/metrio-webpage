import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import metrioLogo from '../../public/metrioLogo.svg'


function Header() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false)
    const location = useLocation()

    const toggleBurgerMenu = () => {
        setIsBurgerOpen(!isBurgerOpen)
    }

    const isHomePage = location.pathname === '/'
    const isBlogPage = location.pathname === '/blog'
    const isBlogPost = location.pathname.startsWith('/blog/')

    return (
        <header className="headerContainer">

            {/* Logo */}
            <a href="/">
                <img
                    className="headerLogo"
                    src={metrioLogo}
                    alt="metrioLogo"
                />
            </a>

            {/* Navbar */}
            <nav className={`headerNav ${isBurgerOpen ? "active" : ""}`}>
                {isHomePage && (
                    <>
                        <span className="menu-item">
                            <a href="#">Inicio</a>
                        </span>
                        <span className="menu-item">
                            <a href="#about">Sobre Nosotros</a>
                        </span>
                        <span className="menu-item">
                            <a href="#services">Servicios</a>
                        </span>
                        <span className="menu-item">
                            <a href="#contact">Contacto</a>
                        </span>
                        <span className="menu-item">
                            <a><Link to="/blog">Blog</Link></a>
                        </span>
                    </>
                )}
                {isBlogPage && (
                    <>
                        <span className="menu-item">
                            <a><Link to="/">Inicio</Link></a>
                        </span>
                    </>
                )}
                {isBlogPost && (
                    <>
                    <span className="menu-item">
                        <a><Link to="/blog">Blog</Link></a>
                    </span>
                    <span className="menu-item">
                        <a><Link to="/">Inicio</Link></a>
                    </span>
                </>
                )}
            </nav>

            {/* Burger menu for mobile */}
            <div
                className={`nav light headerNav--burger ${isBurgerOpen ? "active" : ""}`}
                id="burger"
                onClick={toggleBurgerMenu}
            >
                <span className="material-icons headerNav--burger-icon">
                    {isBurgerOpen ? "close" : "menu"}
                </span>
            </div>
        </header>
    )
}

export default Header