'use client';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import { SiReact, SiTypescript, SiJavascript, SiNextdotjs, SiNodedotjs, SiPython, SiVuedotjs, SiAngular, SiDocker, SiTailwindcss, SiMongodb, SiPostgresql, SiGraphql, SiPrisma } from 'react-icons/si';
import type { IconType } from 'react-icons';

const techIconMap: Record<string, { icon: IconType; color: string }> = {
  React: { icon: SiReact, color: '#61DAFB' },
  TypeScript: { icon: SiTypescript, color: '#3178C6' },
  JavaScript: { icon: SiJavascript, color: '#F7DF1E' },
  'Next.js': { icon: SiNextdotjs, color: 'inherit' },
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  Python: { icon: SiPython, color: '#3776AB' },
  Vue: { icon: SiVuedotjs, color: '#42b883' },
  Angular: { icon: SiAngular, color: '#DD0031' },
  Docker: { icon: SiDocker, color: '#2496ED' },
  TailwindCSS: { icon: SiTailwindcss, color: '#06B6D4' },
  MongoDB: { icon: SiMongodb, color: '#47A248' },
  PostgreSQL: { icon: SiPostgresql, color: '#4169E1' },
  GraphQL: { icon: SiGraphql, color: '#E10098' },
  Prisma: { icon: SiPrisma, color: 'inherit' },
};

interface ProjectCardProps {
  title: string;
  description: string;
  techStack?: string[];
  imageUrl?: string;
  link?: string;
  githubLink?: string;
}

export default function ProjectCard({ title, description, techStack, imageUrl, link, githubLink }: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  const techBadges = (variant: 'card' | 'modal' = 'card') => techStack && (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: variant === 'modal' ? 1 : 0.75 }}>
      {techStack.map((tech) => {
        const mapped = techIconMap[tech];
        if (mapped) {
          const Icon = mapped.icon;
          const isModal = variant === 'modal';
          return (
            <Box
              key={tech}
              title={tech}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 0.75,
                px: isModal ? 1.25 : 0,
                justifyContent: 'center',
                width: isModal ? 'auto' : 28,
                height: isModal ? 32 : 28,
                borderRadius: 2,
                border: '1px solid',
                borderColor: mapped.color === 'inherit' ? 'divider' : mapped.color,
                bgcolor: mapped.color === 'inherit' ? 'action.hover' : `${mapped.color}18`,
                color: mapped.color,
                fontSize: '1rem',
                transition: 'border-color 0.2s, transform 0.2s, background-color 0.2s',
                '&:hover': { bgcolor: mapped.color === 'inherit' ? 'action.selected' : `${mapped.color}30`, transform: 'scale(1.08)' },
              }}
            >
              <Icon />
              {isModal && (
                <Typography variant="caption" fontWeight={600} color="text.primary" sx={{ lineHeight: 1 }}>
                  {tech}
                </Typography>
              )}
            </Box>
          );
        }
        return (
          <Chip
            key={tech}
            label={tech}
            size="small"
            color="primary"
            variant="outlined"
            sx={{ fontSize: '0.7rem', height: 22 }}
          />
        );
      })}
    </Box>
  );

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          cursor: 'pointer',
          transition: 'transform 0.25s ease, box-shadow 0.25s ease',
          '&:hover': {
            transform: 'translateY(-6px)',
            boxShadow: 8,
            borderColor: 'primary.main',
          },
        }}
      >
        {imageUrl ? (
          <CardMedia
            component="img"
            height="180"
            image={imageUrl}
            alt={title}
            sx={{ objectFit: 'cover' }}
          />
        ) : (
          <Box
            sx={{
              height: 12,
              background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            }}
          />
        )}
        <CardContent sx={{ flex: 1, pt: 3, pb: 1 }}>
          <Typography gutterBottom variant="h6" component="div" fontWeight={700} sx={{ mb: 1 }}>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" lineHeight={1.7} sx={{ mb: 2 }}>
            {description}
          </Typography>
          {techBadges('card')}
        </CardContent>
        {(link || githubLink) && (
          <CardActions sx={{ px: 2, pb: 2, pt: 0, gap: 1 }} onClick={(e) => e.stopPropagation()}>
            {link && (
              <Button
                size="small"
                variant="contained"
                disableElevation
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon fontSize="inherit" />}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
              >
                Live Demo
              </Button>
            )}
            {githubLink && (
              <IconButton
                size="small"
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2,
                  '&:hover': { borderColor: 'primary.main', color: 'primary.main' },
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            )}
          </CardActions>
        )}
      </Card>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        {imageUrl ? (
          <CardMedia
            component="img"
            height="220"
            image={imageUrl}
            alt={title}
            sx={{ objectFit: 'cover' }}
          />
        ) : (
          <Box sx={{ height: 8, background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)' }} />
        )}
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {title}
            </Typography>
            <IconButton size="small" onClick={() => setOpen(false)} aria-label="Close" sx={{ ml: 1 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
          {techStack && (
            <>
              {techBadges('modal')}
              <Divider sx={{ mt: 2.5, mb: 2.5 }} />
            </>
          )}
          <Typography variant="body1" color="text.primary" lineHeight={1.8}>
            {description}
          </Typography>
        </DialogContent>
        {(link || githubLink) && (
          <DialogActions sx={{ px: 3, pb: 3, gap: 1, justifyContent: 'flex-start' }}>
            {link && (
              <Button
                variant="contained"
                disableElevation
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                endIcon={<OpenInNewIcon fontSize="inherit" />}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
              >
                Live Demo
              </Button>
            )}
            {githubLink && (
              <Button
                variant="contained"
                disableElevation
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                startIcon={<GitHubIcon fontSize="small" />}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600, bgcolor: 'text.primary', color: 'background.paper', '&:hover': { bgcolor: 'text.secondary' } }}
              >
                GitHub
              </Button>
            )}
          </DialogActions>
        )}
      </Dialog>
    </>
  );
}