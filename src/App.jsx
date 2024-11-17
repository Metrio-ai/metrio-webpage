import Footer from './components/Footer'
import Header from './components/Header'
import FadeInSection from './components/FadeInSection'
import About from './sections/About/About'
import Contact from './sections/Contact/Contact'
import Hero from './sections/Hero/Hero'
import './styles/App.css'

function App() {

  return (
    <div className="appContainer">
      <Header />
      <Hero id="hero"/>
      <FadeInSection id="about">
        <About />
      </FadeInSection>
      <FadeInSection id="contact">
        <Contact />
      </FadeInSection>
      <FadeInSection id="footer">
        <Footer />
      </FadeInSection>
    </div>
  )
}

export default App
