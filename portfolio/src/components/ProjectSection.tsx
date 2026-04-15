'use client';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'My Project',
    description: 'A short description.',
    techStack: ['React', 'TypeScript'],
    link: 'https://myproject.com',
    githubLink: 'https://github.com/username/repo',
  },
  {
    title: 'My Project',
    description: 'A short description.',
    techStack: ['React', 'TypeScript'],
    link: 'https://myproject.com',
    githubLink: 'https://github.com/username/repo',
  },
  {
    title: 'My Project',
    description: 'A short description.',
    techStack: ['React', 'TypeScript'],
    link: 'https://myproject.com',
    githubLink: 'https://github.com/username/repo',
  },
];

export default function ProjectSection() {
  return (
    <Box
      id="projects"
      component="section"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: { xs: 8, md: 4 },
      }}
    >
      <Typography
        variant="overline"
        color="primary"
        letterSpacing={4}
        display="block"
        textAlign="center"
        mb={1}
      >
        What I&apos;ve built
      </Typography>
      <Typography
        variant="h3"
        fontWeight={700}
        textAlign="center"
        mb={6}
        sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}
      >
        Projects
      </Typography>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        {projects.map((project, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
            <ProjectCard {...project} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
