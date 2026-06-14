import { lazy } from 'react'
import Layout from './components/Layout'
import DeferredSection from './components/DeferredSection'
import FadeInSection from './components/FadeInSection'
import About from './sections/About/About'
import Hero from './sections/Hero/Hero'
import HowItWorks from './sections/HowItWorks/HowItWorks'
import Services from './sections/Services/Services'
import Stats from './sections/Stats/Stats'
import './styles/App.css'

const TechStack = lazy(() => import('./sections/TechStack/TechStack'))
const AiSection = lazy(() => import('./sections/Ai/AiSection'))
const Clients = lazy(() => import('./sections/Clients/Clients'))
const HomeFaq = lazy(() => import('./sections/Faq/HomeFaq'))
const BookingSection = lazy(() => import('./sections/Booking/BookingSection'))

function App () {
  return (
    <Layout>
      <main id="main-content">
        <Hero />
        <Stats />
        <About />
        <HowItWorks />
        <Services />
        <DeferredSection minHeight={280}>
          <TechStack />
        </DeferredSection>
        <DeferredSection minHeight={240}>
          <AiSection />
        </DeferredSection>
        <DeferredSection minHeight={320}>
          <Clients />
        </DeferredSection>
        <DeferredSection minHeight={200}>
          <HomeFaq />
        </DeferredSection>
        <FadeInSection id="contact">
          <DeferredSection minHeight={360}>
            <BookingSection />
          </DeferredSection>
        </FadeInSection>
      </main>
    </Layout>
  )
}

export default App
