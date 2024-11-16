import Footer from './components/Footer'
import Header from './components/Header'
import About from './sections/About/About'
import Contact from './sections/Contact/Contact'
import Hero from './sections/Hero/Hero'
import './styles/App.css'

function App() {

  return (
    <div className="appContainer">
      <Header />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
