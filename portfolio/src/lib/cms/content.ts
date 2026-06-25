import { defaultSiteContent, normalizeSiteContent, type SiteContent } from '@/lib/cms/schema';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';

const SINGLETON_ID = 1;

export async function readSiteContent(): Promise<SiteContent> {
  try {
    const record = await prisma.cmsContent.findUnique({
      where: { id: SINGLETON_ID },
      select: { data: true },
    });

    if (!record) {
      return defaultSiteContent;
    }

    return normalizeSiteContent(record.data);
  } catch {
    return defaultSiteContent;
  }
}

export async function writeSiteContent(content: SiteContent): Promise<SiteContent> {
  const jsonContent = content as unknown as Prisma.InputJsonValue;

  const record = await prisma.cmsContent.upsert({
    where: { id: SINGLETON_ID },
    update: { data: jsonContent },
    create: { id: SINGLETON_ID, data: jsonContent },
    select: { data: true },
  });

  return normalizeSiteContent(record.data);
}