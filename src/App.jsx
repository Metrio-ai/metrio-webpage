import Layout from './components/Layout'
import FadeInSection from './components/FadeInSection'
import About from './sections/About/About'
import Contact from './sections/Contact/Contact'
import Hero from './sections/Hero/Hero'
import HowItWorks from './sections/HowItWorks/HowItWorks'
import Services from './sections/Services/Services'
import Stats from './sections/Stats/Stats'
import './styles/App.css'

function App () {
  return (
    <Layout>
      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <HowItWorks />
        <Services />
        <FadeInSection id="contact">
          <Contact />
        </FadeInSection>
      </main>
    </Layout>
  )
}

export default App
