import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProjectCard from '../components/ProjectCard';
import Grid from '@mui/material/Grid';
import Hero from '../components/Hero';
import Toolbar from '@mui/material/Toolbar';

export default function Home() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Toolbar />
      <Hero />
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        {/* Your content goes here */}
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ProjectCard
              title="My Project"
              description="A short description."
              techStack={['React', 'TypeScript']}
              link="https://myproject.com"
              githubLink="https://github.com/username/repo"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ProjectCard
              title="My Project"
              description="A short description."
              techStack={['React', 'TypeScript']}
              link="https://myproject.com"
              githubLink="https://github.com/username/repo"
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ProjectCard
              title="My Project"
              description="A short description."
              techStack={['React', 'TypeScript']}
              link="https://myproject.com"
              githubLink="https://github.com/username/repo"
            />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}
