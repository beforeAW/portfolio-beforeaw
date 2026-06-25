create table if not exists public.cms_content (
  id int primary key default 1 check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.cms_content (id, data)
values (
  1,
  '{
    "site": {"siteName": "albinwrebo.dev"},
    "hero": {
      "name": "Albin Wrebo",
      "title": "Full Stack Developer",
      "available": true,
      "hobbies": ["Drums", "Scouting"],
      "githubUrl": "https://github.com/albinwrebo",
      "linkedinUrl": "https://linkedin.com/in/albinwrebo"
    },
    "about": {
      "intro": "I am a passionate full stack developer based in Sweden.",
      "details": "Outside of coding, I play drums and contribute as a scout leader.",
      "highlights": ["Based in Sweden", "Open to work", "Full Stack Developer"],
      "cvUrl": "/cv.pdf",
      "avatarInitials": "AW"
    },
    "projects": [
      {
        "title": "My Project",
        "description": "A short description.",
        "techStack": ["React", "TypeScript"],
        "link": "https://myproject.com",
        "githubLink": "https://github.com/username/repo",
        "imageUrl": ""
      }
    ],
    "footer": {"copyrightName": "albinwrebo.dev"}
  }'::jsonb
)
on conflict (id) do nothing;

alter table public.cms_content enable row level security;

drop policy if exists "Public can read cms content" on public.cms_content;
create policy "Public can read cms content"
on public.cms_content
for select
to anon, authenticated
using (true);