import Footer from './components/Footer'
import Header from './components/Header'
import FadeInSection from './components/FadeInSection'
import About from './sections/About/About'
import Contact from './sections/Contact/Contact'
import Hero from './sections/Hero/Hero'
import Services from './sections/Services/Services'
import './styles/App.css'

function App () {
  return (
    <div className="appContainer" id="top">
      <Header />
      <main id="main-content">
        <Hero />
        <About />
        <Services />
        <FadeInSection id="contact">
          <Contact />
        </FadeInSection>
      </main>
      <Footer />
    </div>
  )
}

export default App
