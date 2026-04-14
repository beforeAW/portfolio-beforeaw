'use client';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import GitHubIcon from '@mui/icons-material/GitHub';

interface ProjectCardProps {
  title: string;
  description: string;
  techStack?: string[];
  imageUrl?: string;
  link?: string;
  githubLink?: string;
}

export default function ProjectCard({ title, description, techStack, imageUrl, link, githubLink }: ProjectCardProps) {
  return (
    <Card variant="outlined" sx={{ maxWidth: 345, m: 2}}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
        />
      )}
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
        {techStack && (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {techStack.map((tech) => (
              <Chip key={tech} label={tech} size="small" variant="outlined" />
            ))}
          </Box>
        )}
      </CardContent>
        {(link || githubLink) && (
          <CardActions sx={{ justifyContent: 'space-between' }}>
            {link && (
              <Button size="small" href={link} target="_blank" rel="noopener noreferrer">
                View Project
              </Button>
            )}
            {githubLink && (
              <IconButton
                size="small"
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub repository"
              >
                <GitHubIcon />
              </IconButton>
            )}
        </CardActions>
      )}
    </Card>
  );
}