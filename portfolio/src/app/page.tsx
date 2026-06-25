import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectSection from '../components/ProjectSection';
import Toolbar from '@mui/material/Toolbar';
import { unstable_noStore as noStore } from 'next/cache';
import { readSiteContent } from '@/lib/cms/content';

export default async function Home() {
  noStore();
  const content = await readSiteContent();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header siteName={content.site.siteName} />
      <Toolbar />
      <Hero hero={content.hero} />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <About about={content.about} />
        <ProjectSection projects={content.projects} />
      </Container>
      <Footer copyrightName={content.footer.copyrightName} />
    </Box>
  );
}
