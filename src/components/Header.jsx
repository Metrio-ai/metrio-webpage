import { useState } from 'react'


function Header() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false)

    const toggleBurgerMenu = () => {
        setIsBurgerOpen(!isBurgerOpen)
    }

    return (
        <header className="headerContainer">

            {/* Logo */}
            <a href="/">
                <img
                    className="headerLogo"
                    src="../../public/metrioLogo.svg"
                    alt="metrioLogo"
                />
            </a>

            {/* Navbar */}
            <nav className={`headerNav ${isBurgerOpen ? "active" : ""}`}>
            <span className="menu-item">
                    <a href="#hero" aria-current="page">
                        Inicio
                    </a>
                </span>
                <span className="menu-item">
                    <a href="#about" aria-current="page">
                        Sobre Nosotros
                    </a>
                </span>
                <span className="menu-item">
                    <a href="#contact">Contacto</a>
                </span>
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