import Footer from './components/Footer'
import Header from './components/Header'
import About from './sections/About/About'
import Hero from './sections/Hero/Hero'
import './styles/App.css'

function App() {

  return (
    <div className="appContainer">
      <Header />
      <Hero />
      <About />
      <Footer />
    </div>
  )
}

export default App
