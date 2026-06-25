'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {
  SiHtml5, SiCss, SiJavascript, SiTypescript, SiPhp,
  SiReact, SiNextdotjs, SiNodedotjs, SiAngular, SiExpress,
  SiLaravel, SiTailwindcss, SiSass, SiMui, SiPostgresql,
  SiMysql, SiMariadb, SiMongodb, SiPrisma, SiDocker,
  SiGit, SiGithub, SiGitlab, SiFigma,
} from 'react-icons/si';
import type { IconType } from 'react-icons';
import type { ProjectContent, SiteContent } from '@/lib/cms/schema';

const TECH_OPTIONS: { label: string; Icon: IconType }[] = [
  { label: 'HTML', Icon: SiHtml5 },
  { label: 'CSS', Icon: SiCss },
  { label: 'JavaScript', Icon: SiJavascript },
  { label: 'TypeScript', Icon: SiTypescript },
  { label: 'PHP', Icon: SiPhp },
  { label: 'React', Icon: SiReact },
  { label: 'Next.js', Icon: SiNextdotjs },
  { label: 'Node.js', Icon: SiNodedotjs },
  { label: 'Express', Icon: SiExpress },
  { label: 'Angular', Icon: SiAngular },
  { label: 'Laravel', Icon: SiLaravel },
  { label: 'Tailwind CSS', Icon: SiTailwindcss },
  { label: 'Sass', Icon: SiSass },
  { label: 'MUI', Icon: SiMui },
  { label: 'PostgreSQL', Icon: SiPostgresql },
  { label: 'MySQL', Icon: SiMysql },
  { label: 'MariaDB', Icon: SiMariadb },
  { label: 'MongoDB', Icon: SiMongodb },
  { label: 'Prisma', Icon: SiPrisma },
  { label: 'Docker', Icon: SiDocker },
  { label: 'Git', Icon: SiGit },
  { label: 'GitHub', Icon: SiGithub },
  { label: 'GitLab', Icon: SiGitlab },
  { label: 'Figma', Icon: SiFigma },
];

function listToMultiline(value: string[]): string {
  return value.join('\n');
}

function multilineToList(value: string): string[] {
  return value
    .split('\n')
    .map((item) => item.trim())
    .filter(Boolean);
}

function createEmptyProject(): ProjectContent {
  return {
    title: '',
    description: '',
    techStack: [],
    link: '',
    githubLink: '',
    imageUrl: '',
  };
}

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
}

function ImageUploader({ value, onChange }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleFile = async (file: File) => {
    setUploading(true);
    setUploadError('');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const json = (await res.json()) as { url?: string; error?: string };
      if (!res.ok) {
        setUploadError(json.error ?? 'Upload failed');
      } else if (json.url) {
        onChange(json.url);
      }
    } catch {
      setUploadError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack spacing={1}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          startIcon={uploading ? <CircularProgress size={14} /> : undefined}
        >
          {uploading ? 'Uploading…' : 'Upload Image'}
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleFile(file);
            e.target.value = '';
          }}
        />
        {value ? (
          <Typography variant="caption" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
            {value}
          </Typography>
        ) : null}
      </Box>
      {uploadError ? (
        <Alert severity="error" sx={{ py: 0 }}>{uploadError}</Alert>
      ) : null}
      {value ? (
        // eslint-disable-next-line @next/next/no-img-element
        <Box component="img" src={value} alt="Preview" sx={{ maxHeight: 140, maxWidth: '100%', objectFit: 'contain', borderRadius: 1, border: '1px solid', borderColor: 'divider' }} />
      ) : null}
      <TextField
        label="Image URL"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        size="small"
        fullWidth
        placeholder="Or paste a URL"
      />
    </Stack>
  );
}

export default function CmsAdmin() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [status, setStatus] = useState<'loading' | 'idle' | 'saving' | 'saved' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      setStatus('loading');
      setMessage('');

      try {
        const response = await fetch('/api/content', { cache: 'no-store' });

        if (!response.ok) {
          throw new Error('Could not load CMS content');
        }

        const payload = (await response.json()) as SiteContent;
        setContent(payload);
        setStatus('idle');
      } catch (error) {
        const text = error instanceof Error ? error.message : 'Could not load CMS content';
        setStatus('error');
        setMessage(text);
      }
    };

    void loadContent();
  }, []);

  const highlightsText = useMemo(() => listToMultiline(content?.about.highlights ?? []), [content?.about.highlights]);
  const hobbiesText = useMemo(() => listToMultiline(content?.hero.hobbies ?? []), [content?.hero.hobbies]);

  const updateProject = (index: number, patch: Partial<ProjectContent>) => {
    setContent((prev) => {
      if (!prev) {
        return prev;
      }

      const projects = [...prev.projects];
      projects[index] = { ...projects[index], ...patch };

      return { ...prev, projects };
    });
  };

  const moveProject = (index: number, direction: -1 | 1) => {
    setContent((prev) => {
      if (!prev) return prev;
      const projects = [...prev.projects];
      const target = index + direction;
      if (target < 0 || target >= projects.length) return prev;
      [projects[index], projects[target]] = [projects[target], projects[index]];
      return { ...prev, projects };
    });
  };

  const saveContent = async () => {
    if (!content) {
      return;
    }

    setStatus('saving');
    setMessage('');

    try {
      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        const errorBody = (await response.json()) as { error?: string };
        throw new Error(errorBody.error ?? 'Could not save CMS content');
      }

      const payload = (await response.json()) as SiteContent;
      setContent(payload);
      setStatus('saved');
      setMessage('Content saved to Supabase.');
    } catch (error) {
      const text = error instanceof Error ? error.message : 'Could not save CMS content';
      setStatus('error');
      setMessage(text);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  if (status === 'loading' || !content) {
    return (
      <Paper sx={{ p: 4 }}>
        <Typography variant="h6">Loading CMS content...</Typography>
      </Paper>
    );
  }

  return (
    <Stack spacing={3}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" fontWeight={700} mb={1}>
          Portfolio CMS
        </Typography>

        {message ? (
          <Alert severity={status === 'error' ? 'error' : 'success'} sx={{ mt: 2 }}>
            {message}
          </Alert>
        ) : null}
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Site
        </Typography>
        <TextField
          label="Site Name"
          value={content.site.siteName}
          onChange={(event) =>
            setContent((prev) => (prev ? { ...prev, site: { ...prev.site, siteName: event.target.value } } : prev))
          }
          fullWidth
        />
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Hero
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Name"
            value={content.hero.name}
            onChange={(event) =>
              setContent((prev) => (prev ? { ...prev, hero: { ...prev.hero, name: event.target.value } } : prev))
            }
            fullWidth
          />
          <TextField
            label="Title"
            value={content.hero.title}
            onChange={(event) =>
              setContent((prev) => (prev ? { ...prev, hero: { ...prev.hero, title: event.target.value } } : prev))
            }
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={content.hero.available}
                onChange={(event) =>
                  setContent((prev) =>
                    prev ? { ...prev, hero: { ...prev.hero, available: event.target.checked } } : prev
                  )
                }
              />
            }
            label="Open to work"
          />
          <TextField
            label="Hobbies (one per line)"
            value={hobbiesText}
            onChange={(event) =>
              setContent((prev) =>
                prev
                  ? { ...prev, hero: { ...prev.hero, hobbies: multilineToList(event.target.value) } }
                  : prev
              )
            }
            multiline
            minRows={3}
            fullWidth
          />
          <TextField
            label="GitHub URL"
            value={content.hero.githubUrl}
            onChange={(event) =>
              setContent((prev) =>
                prev ? { ...prev, hero: { ...prev.hero, githubUrl: event.target.value } } : prev
              )
            }
            fullWidth
          />
          <TextField
            label="LinkedIn URL"
            value={content.hero.linkedinUrl}
            onChange={(event) =>
              setContent((prev) =>
                prev ? { ...prev, hero: { ...prev.hero, linkedinUrl: event.target.value } } : prev
              )
            }
            fullWidth
          />
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          About
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Avatar Initials"
            value={content.about.avatarInitials}
            onChange={(event) =>
              setContent((prev) =>
                prev ? { ...prev, about: { ...prev.about, avatarInitials: event.target.value } } : prev
              )
            }
            fullWidth
          />
          <TextField
            label="Intro"
            value={content.about.intro}
            onChange={(event) =>
              setContent((prev) =>
                prev ? { ...prev, about: { ...prev.about, intro: event.target.value } } : prev
              )
            }
            multiline
            minRows={3}
            fullWidth
          />
          <TextField
            label="Details"
            value={content.about.details}
            onChange={(event) =>
              setContent((prev) =>
                prev ? { ...prev, about: { ...prev.about, details: event.target.value } } : prev
              )
            }
            multiline
            minRows={3}
            fullWidth
          />
          <TextField
            label="Highlights (one per line)"
            value={highlightsText}
            onChange={(event) =>
              setContent((prev) =>
                prev
                  ? { ...prev, about: { ...prev.about, highlights: multilineToList(event.target.value) } }
                  : prev
              )
            }
            multiline
            minRows={4}
            fullWidth
          />
          <TextField
            label="CV URL"
            value={content.about.cvUrl}
            onChange={(event) =>
              setContent((prev) =>
                prev ? { ...prev, about: { ...prev.about, cvUrl: event.target.value } } : prev
              )
            }
            fullWidth
          />
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight={700}>
            Projects
          </Typography>
          <Button
            variant="outlined"
            onClick={() =>
              setContent((prev) =>
                prev
                  ? {
                      ...prev,
                      projects: [...prev.projects, createEmptyProject()],
                    }
                  : prev
              )
            }
          >
            Add Project
          </Button>
        </Box>

        <Stack spacing={2}>
          {content.projects.map((project, index) => (
            <Paper key={`${project.title}-${index}`} variant="outlined" sx={{ p: 2 }}>
              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Typography fontWeight={600}>Project {index + 1}</Typography>
                  <Box>
                    <IconButton size="small" onClick={() => moveProject(index, -1)} disabled={index === 0} aria-label="Move up">
                      <KeyboardArrowUpIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => moveProject(index, 1)} disabled={index === content.projects.length - 1} aria-label="Move down">
                      <KeyboardArrowDownIcon fontSize="small" />
                    </IconButton>
                  </Box>
                </Box>
                <TextField
                  label="Title"
                  value={project.title}
                  onChange={(event) => updateProject(index, { title: event.target.value })}
                  fullWidth
                />
                <TextField
                  label="Description"
                  value={project.description}
                  onChange={(event) => updateProject(index, { description: event.target.value })}
                  multiline
                  minRows={3}
                  fullWidth
                />
                <Autocomplete
                  multiple
                  options={TECH_OPTIONS}
                  getOptionLabel={(option) => option.label}
                  value={TECH_OPTIONS.filter((opt) => project.techStack.includes(opt.label))}
                  onChange={(_event, selected) =>
                    updateProject(index, { techStack: selected.map((opt) => opt.label) })
                  }
                  renderOption={(props, option) => {
                    const { key, ...rest } = props as React.HTMLAttributes<HTMLLIElement> & { key: React.Key };
                    return (
                      <Box component="li" key={key} {...rest} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <option.Icon size={18} />
                        {option.label}
                      </Box>
                    );
                  }}
                  renderTags={(value, getTagProps) =>
                    value.map((option, i) => {
                      const { key, ...tagProps } = getTagProps({ index: i });
                      return (
                        <Chip
                          key={key}
                          icon={<option.Icon />}
                          label={option.label}
                          size="small"
                          {...tagProps}
                        />
                      );
                    })
                  }
                  renderInput={(params) => <TextField {...params} label="Tech Stack" />}
                  fullWidth
                />
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.5}>
                  <TextField
                    label="Live Link"
                    value={project.link}
                    onChange={(event) => updateProject(index, { link: event.target.value })}
                    fullWidth
                  />
                  <TextField
                    label="GitHub Link"
                    value={project.githubLink}
                    onChange={(event) => updateProject(index, { githubLink: event.target.value })}
                    fullWidth
                  />
                </Stack>
                <ImageUploader
                  value={project.imageUrl}
                  onChange={(url) => updateProject(index, { imageUrl: url })}
                />
                <Button
                  color="error"
                  variant="text"
                  onClick={() =>
                    setContent((prev) =>
                      prev
                        ? {
                            ...prev,
                            projects: prev.projects.filter((_, projectIndex) => projectIndex !== index),
                          }
                        : prev
                    )
                  }
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Remove Project
                </Button>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          Footer
        </Typography>
        <TextField
          label="Copyright Name"
          value={content.footer.copyrightName}
          onChange={(event) =>
            setContent((prev) =>
              prev ? { ...prev, footer: { ...prev.footer, copyrightName: event.target.value } } : prev
            )
          }
          fullWidth
        />
      </Paper>

      <Divider />

      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', flexWrap: 'wrap', pb: 4 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button variant="contained" size="large" onClick={saveContent} disabled={status === 'saving'}>
            {status === 'saving' ? 'Saving...' : 'Save Content'}
          </Button>
          <Button variant="outlined" size="large" href="/" target="_blank" rel="noopener noreferrer">
            Open Portfolio
          </Button>
        </Box>
        <Button variant="text" color="error" size="large" onClick={handleLogout}>
          Sign Out
        </Button>
      </Box>
    </Stack>
  );
}