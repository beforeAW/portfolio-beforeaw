import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';

const highlights = [
  'Based in Sweden',
  'Open to work',
  'Full Stack Developer',
  'Audio Engineer',
  'Scout Leader',
];

export default function About() {
  return (
    <Box
      id="about"
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
        Get to know me
      </Typography>
      <Typography
        variant="h3"
        fontWeight={700}
        textAlign="center"
        mb={6}
        sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}
      >
        About Me
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 8 },
          alignItems: { md: 'center' },
        }}
      >
        {/* Avatar placeholder */}
        <Box
          sx={{
            flexShrink: 0,
            width: { xs: 140, md: 200 },
            height: { xs: 140, md: 200 },
            borderRadius: '50%',
            bgcolor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: { xs: 'auto', md: 0 },
            fontSize: { xs: '3rem', md: '4rem' },
            color: '#fff',
            fontWeight: 700,
            flexDirection: 'column',
          }}
        >
          AW
        </Box>

        {/* Text content */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="body1" color="text.secondary" mb={2} lineHeight={1.8}>
            I&apos;m a passionate full stack developer based in Sweden with a love for building
            clean, performant web applications. I enjoy working across the entire stack — from
            designing databases to crafting polished UIs.
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3} lineHeight={1.8}>
            Outside of coding, I play drums and am actively involved in scouting as a leader.
            These experiences have shaped how I approach teamwork, problem-solving, and
            leadership in my professional life.
          </Typography>

          {/* Highlights */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
            {highlights.map((item) => (
              <Chip key={item} label={item} variant="outlined" color="primary" size="small" />
            ))}
          </Box>

          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download CV
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mt: { xs: 8, md: 12 } }} />
    </Box>
  );
}
