import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  link?: string;
}

export default function ProjectCard({ title, description, imageUrl, link }: ProjectCardProps) {
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
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {link && (
        <CardActions>
          <Button size="small" href={link} target="_blank" rel="noopener noreferrer">
            View Project
          </Button>
        </CardActions>
      )}
    </Card>
  );
}