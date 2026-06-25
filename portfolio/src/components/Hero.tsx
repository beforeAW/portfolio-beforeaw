'use client';
import { useState, useEffect, useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { SiGithub } from 'react-icons/si';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';
import TechStackScroller from './TechStackScroller';
import type { HeroContent } from '@/lib/cms/schema';

type Token = { text: string; color: string };

interface HeroProps {
  hero: HeroContent;
}

export default function Hero({ hero }: HeroProps) {
  const tokens = useMemo<Token[]>(() => {
    const hobbyTokens = hero.hobbies.flatMap((hobby, index) => {
      const parts: Token[] = [];

      if (index > 0) {
        parts.push({ text: ', ', color: '#d4d4d4' });
      }

      parts.push({ text: `"${hobby}"`, color: '#ce9178' });
      return parts;
    });

    return [
      { text: 'const ', color: '#569cd6' },
      { text: 'developer', color: '#4fc1ff' },
      { text: ' = {\n', color: '#d4d4d4' },
      { text: '  name', color: '#9cdcfe' },
      { text: ': ', color: '#d4d4d4' },
      { text: `"${hero.name}"`, color: '#ce9178' },
      { text: ',\n', color: '#d4d4d4' },
      { text: '  title', color: '#9cdcfe' },
      { text: ': ', color: '#d4d4d4' },
      { text: `"${hero.title}"`, color: '#ce9178' },
      { text: ',\n', color: '#d4d4d4' },
      { text: '  available', color: '#9cdcfe' },
      { text: ': ', color: '#d4d4d4' },
      { text: hero.available ? 'true' : 'false', color: '#569cd6' },
      { text: ',\n', color: '#d4d4d4' },
      { text: '  hobbies', color: '#9cdcfe' },
      { text: ': [', color: '#d4d4d4' },
      ...hobbyTokens,
      { text: '],\n', color: '#d4d4d4' },
      { text: '};', color: '#d4d4d4' },
    ];
  }, [hero.available, hero.hobbies, hero.name, hero.title]);

  const totalChars = useMemo(() => tokens.reduce((sum, token) => sum + token.text.length, 0), [tokens]);
  const [visibleChars, setVisibleChars] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (visibleChars < totalChars) {
      const timer = setTimeout(() => setVisibleChars(v => v + 1), 25);
      return () => clearTimeout(timer);
    }
  }, [visibleChars, totalChars]);

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  const renderTokens = () => {
    let remaining = visibleChars;
    return tokens.map((token, i) => {
      if (remaining <= 0) return null;
      const chars = Math.min(remaining, token.text.length);
      remaining -= token.text.length;
      return (
        <span key={i} style={{ color: token.color }}>
          {token.text.slice(0, chars)}
        </span>
      );
    });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '100vh',
        gap: 3,
        position: 'relative',
        pb: { xs: 10, md: 8 },
        px: { xs: 2, sm: 4 },
      }}
    >
      {/* Name */}
      <Typography
        variant="h2"
        component="h1"
        fontWeight={700}
        sx={{
          fontSize: { xs: '2.5rem', md: '4rem' },
          opacity: 0,
          animation: 'fadeSlideUp 0.6s ease forwards 0.1s',
          background: (theme) =>
            theme.palette.mode === 'dark'
              ? 'linear-gradient(135deg, #fff 30%, #90caf9 100%)'
              : 'linear-gradient(135deg, #1a1a1a 30%, #1976d2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {hero.name}
      </Typography>

      {/* Code block */}
      <Box
        sx={{
          bgcolor: '#1e1e1e',
          borderRadius: 2,
          p: { xs: 2, md: 4 },
          width: '100%',
          maxWidth: { xs: 520, sm: 620, md: 740 },
          textAlign: 'left',
          boxShadow: 6,
          opacity: 0,
          animation: 'fadeSlideUp 0.6s ease forwards 0.3s',
        }}
      >
        <Box sx={{ display: 'flex', gap: 0.75, mb: 2 }}>
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ff5f56' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#ffbd2e' }} />
          <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: '#27c93f' }} />
        </Box>
        <Box
          component="pre"
          sx={{
            fontFamily: '"Fira Code", "Cascadia Code", "Courier New", monospace',
            fontSize: { xs: '0.75rem', sm: '1rem', md: '1.15rem' },
            lineHeight: 1.8,
            m: 0,
            color: '#d4d4d4',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto',
          }}
        >
          {renderTokens()}
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              bgcolor: '#569cd6',
              verticalAlign: 'text-bottom',
              opacity: showCursor ? 1 : 0,
            }}
          />
        </Box>
      </Box>

      {/* Social links */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          opacity: 0,
          animation: 'fadeSlideUp 0.6s ease forwards 1.1s',
        }}
      >
        <IconButton href={hero.githubUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub" size="large">
          <SiGithub />
        </IconButton>
        <IconButton href={hero.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" size="large" color="primary">
          <LinkedInIcon fontSize="inherit" />
        </IconButton>
      </Box>

      {/* Divider */}
      <Box sx={{ width: '100%', mt: 2, opacity: 0, animation: 'fadeSlideUp 0.6s ease forwards 1.3s' }}>
        <Divider>
          <Typography variant="overline" color="text.secondary" letterSpacing={3}>
            Tech Stack
          </Typography>
        </Divider>
      </Box>

      {/* Tech stack scroller */}
      <Box sx={{ width: '100%', maxWidth: { xs: 520, sm: 620, md: 1000 }, mx: 'auto', opacity: 0, animation: 'fadeSlideUp 0.6s ease forwards 1.5s' }}>
        <TechStackScroller />
      </Box>
    </Box>
  );
}