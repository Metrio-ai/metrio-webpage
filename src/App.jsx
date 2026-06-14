import Layout from './components/Layout'
import FadeInSection from './components/FadeInSection'
import About from './sections/About/About'
import AiSection from './sections/Ai/AiSection'
import BookingSection from './sections/Booking/BookingSection'
import Clients from './sections/Clients/Clients'
import Hero from './sections/Hero/Hero'
import HomeFaq from './sections/Faq/HomeFaq'
import HowItWorks from './sections/HowItWorks/HowItWorks'
import Services from './sections/Services/Services'
import Stats from './sections/Stats/Stats'
import TechStack from './sections/TechStack/TechStack'
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
        <TechStack />
        <AiSection />
        <Clients />
        <HomeFaq />
        <FadeInSection id="contact">
          <BookingSection />
        </FadeInSection>
      </main>
    </Layout>
  )
}

export default App
