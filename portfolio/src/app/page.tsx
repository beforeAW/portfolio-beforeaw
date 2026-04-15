import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectSection from '../components/ProjectSection';
import Toolbar from '@mui/material/Toolbar';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Toolbar />
      <Hero />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <About />
        <ProjectSection />
      </Container>
      <Footer />
    </Box>
  );
}
