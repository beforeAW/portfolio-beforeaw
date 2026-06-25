export interface SiteSettings {
  siteName: string;
}

export interface HeroContent {
  name: string;
  title: string;
  available: boolean;
  hobbies: string[];
  githubUrl: string;
  linkedinUrl: string;
}

export interface AboutContent {
  intro: string;
  details: string;
  highlights: string[];
  cvUrl: string;
  avatarInitials: string;
}

export interface ProjectContent {
  title: string;
  description: string;
  techStack: string[];
  link: string;
  githubLink: string;
  imageUrl: string;
}

export interface FooterContent {
  copyrightName: string;
}

export interface SiteContent {
  site: SiteSettings;
  hero: HeroContent;
  about: AboutContent;
  projects: ProjectContent[];
  footer: FooterContent;
}

export const defaultSiteContent: SiteContent = {
  site: {
    siteName: 'albinwrebo.dev',
  },
  hero: {
    name: 'Albin Wrebo',
    title: 'Full Stack Developer',
    available: true,
    hobbies: ['Drums', 'Scouting'],
    githubUrl: 'https://github.com/albinwrebo',
    linkedinUrl: 'https://linkedin.com/in/albinwrebo',
  },
  about: {
    intro:
      "I'm a passionate full stack developer based in Sweden with a love for building clean, performant web applications. I enjoy working across the entire stack - from designing databases to crafting polished UIs.",
    details:
      'Outside of coding, I play drums and am actively involved in scouting as a leader. These experiences have shaped how I approach teamwork, problem-solving, and leadership in my professional life.',
    highlights: [
      'Based in Sweden',
      'Open to work',
      'Full Stack Developer',
      'Audio Engineer',
      'Scout Leader',
    ],
    cvUrl: '/cv.pdf',
    avatarInitials: 'AW',
  },
  projects: [
    {
      title: 'My Project',
      description: 'A short description.',
      techStack: ['React', 'TypeScript'],
      link: 'https://myproject.com',
      githubLink: 'https://github.com/username/repo',
      imageUrl: '',
    },
    {
      title: 'My Project',
      description: 'A short description.',
      techStack: ['React', 'TypeScript'],
      link: 'https://myproject.com',
      githubLink: 'https://github.com/username/repo',
      imageUrl: '',
    },
    {
      title: 'My Project',
      description: 'A short description.',
      techStack: ['React', 'TypeScript'],
      link: 'https://myproject.com',
      githubLink: 'https://github.com/username/repo',
      imageUrl: '',
    },
  ],
  footer: {
    copyrightName: 'albinwrebo.dev',
  },
};

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : fallback;
}

function asStringArray(value: unknown, fallback: string[] = []): string[] {
  if (!Array.isArray(value)) {
    return fallback;
  }

  return value.filter((item): item is string => typeof item === 'string');
}

export function normalizeSiteContent(value: unknown): SiteContent {
  const input = typeof value === 'object' && value !== null ? (value as Record<string, unknown>) : {};
  const siteInput = typeof input.site === 'object' && input.site !== null ? (input.site as Record<string, unknown>) : {};
  const heroInput = typeof input.hero === 'object' && input.hero !== null ? (input.hero as Record<string, unknown>) : {};
  const aboutInput = typeof input.about === 'object' && input.about !== null ? (input.about as Record<string, unknown>) : {};
  const footerInput = typeof input.footer === 'object' && input.footer !== null ? (input.footer as Record<string, unknown>) : {};
  const projectsInput = Array.isArray(input.projects) ? input.projects : defaultSiteContent.projects;

  return {
    site: {
      siteName: asString(siteInput.siteName, defaultSiteContent.site.siteName),
    },
    hero: {
      name: asString(heroInput.name, defaultSiteContent.hero.name),
      title: asString(heroInput.title, defaultSiteContent.hero.title),
      available:
        typeof heroInput.available === 'boolean'
          ? heroInput.available
          : defaultSiteContent.hero.available,
      hobbies: asStringArray(heroInput.hobbies, defaultSiteContent.hero.hobbies),
      githubUrl: asString(heroInput.githubUrl, defaultSiteContent.hero.githubUrl),
      linkedinUrl: asString(heroInput.linkedinUrl, defaultSiteContent.hero.linkedinUrl),
    },
    about: {
      intro: asString(aboutInput.intro, defaultSiteContent.about.intro),
      details: asString(aboutInput.details, defaultSiteContent.about.details),
      highlights: asStringArray(aboutInput.highlights, defaultSiteContent.about.highlights),
      cvUrl: asString(aboutInput.cvUrl, defaultSiteContent.about.cvUrl),
      avatarInitials: asString(aboutInput.avatarInitials, defaultSiteContent.about.avatarInitials),
    },
    projects: projectsInput.map((item) => {
      const project = typeof item === 'object' && item !== null ? (item as Record<string, unknown>) : {};

      return {
        title: asString(project.title),
        description: asString(project.description),
        techStack: asStringArray(project.techStack),
        link: asString(project.link),
        githubLink: asString(project.githubLink),
        imageUrl: asString(project.imageUrl),
      };
    }),
    footer: {
      copyrightName: asString(footerInput.copyrightName, defaultSiteContent.footer.copyrightName),
    },
  };
}