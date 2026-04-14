'use client';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { SiHtml5, SiCss, SiJavascript, SiTypescript, SiPhp, SiReact, SiNextdotjs, SiNodedotjs, SiAngular, SiExpress, SiLaravel, SiTailwindcss, SiSass, SiMui, SiPostgresql, SiMysql, SiMariadb, SiMongodb, SiPrisma, SiDocker, SiGit, SiGithub, SiGitlab, SiFigma } from 'react-icons/si';
import type { IconType } from 'react-icons';

const techStacks: { label: string; Icon: IconType }[] = [
  // Languages
  { label: 'HTML', Icon: SiHtml5 },
  { label: 'CSS', Icon: SiCss },
  { label: 'JavaScript', Icon: SiJavascript },
  { label: 'TypeScript', Icon: SiTypescript },
  { label: 'PHP', Icon: SiPhp },

  // Frameworks & Libraries
  { label: 'React', Icon: SiReact },
  { label: 'Next.js', Icon: SiNextdotjs },
  { label: 'Node.js', Icon: SiNodedotjs },
  { label: 'Express', Icon: SiExpress },
  { label: 'Angular', Icon: SiAngular },
  { label: 'Laravel', Icon: SiLaravel },
  { label: 'Tailwind CSS', Icon: SiTailwindcss },
  { label: 'Sass', Icon: SiSass },
  { label: 'MUI', Icon: SiMui },

  // Databases
  { label: 'PostgreSQL', Icon: SiPostgresql },
  { label: 'MySQL', Icon: SiMysql },
  { label: 'MariaDB', Icon: SiMariadb },
  { label: 'MongoDB', Icon: SiMongodb },
  { label: 'Prisma', Icon: SiPrisma },

  // Tools & DevOps
  { label: 'Docker', Icon: SiDocker },
  { label: 'Git', Icon: SiGit },
  { label: 'GitHub', Icon: SiGithub },
  { label: 'GitLab', Icon: SiGitlab },
  { label: 'Figma', Icon: SiFigma },
];

export default function TechStackScroller() {
  return (
    <Box sx={{ overflow: 'hidden', width: '100%', py: 2 }}>
      <Box
        sx={{
          display: 'flex',
          width: 'max-content',
          animation: 'scroll 20s linear infinite',
          '&:hover': { animationPlayState: 'paused' },
          '@keyframes scroll': {
            '0%': { transform: 'translateX(0)' },
            '100%': { transform: 'translateX(-50%)' },
          },
        }}
      >
        {[...techStacks, ...techStacks].map(({ label, Icon }, index) => (
          <Tooltip key={index} title={label}>
            <Box
              sx={{
                mx: 2,
                fontSize: 36,
                color: 'text.secondary',
                flexShrink: 0,
                cursor: 'default',
                '&:hover': { color: 'primary.main' },
                transition: 'color 0.2s',
              }}
            >
              <Icon />
            </Box>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}