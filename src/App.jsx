import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import FadeInSection from './components/FadeInSection'
import About from './sections/About/About'
import Contact from './sections/Contact/Contact'
import Hero from './sections/Hero/Hero'
import Services from './sections/Services/Services'
import Blog from './sections/Blog/Blog'
import './styles/App.css'

function App() {

  return (
    <div className="appContainer">
      <Header />
        <Routes>
          <Route path="/" element={<>
            <Hero />
            <About />
            <Services />
            <FadeInSection id="contact">
              <Contact />
            </FadeInSection>
          </>} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      <Footer />
    </div>
  )
}

export default App
