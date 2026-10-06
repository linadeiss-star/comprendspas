import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stories = defineCollection({
  loader: glob({ pattern: ['*/info.yaml', '!_*/**'], base: './content', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: z.object({
    date: z.coerce.date(),
    template: z.enum(['diary', 'spot']),
    kinds: z.array(z.enum(['diary', 'spot'])).min(1),
    cover: z.string().regex(/^[a-zA-Z0-9._-]+\.(jpg|jpeg|png|webp|avif)$/i, 'Use the filename of a photo in this entry folder.'),
    location: z.object({ name: z.string(), lat: z.number().min(-90).max(90), lng: z.number().min(-180).max(180) }),
    draft: z.boolean().default(true),
    sample: z.boolean().default(false),
    instagram: z.string().url().refine(url => ['www.instagram.com', 'instagram.com'].includes(new URL(url).hostname)).optional(),
    youtube: z.string().regex(/^[\w-]{11}$/).optional(),
  }),
});
const entries = defineCollection({
  loader: glob({ pattern: ['*/{en,de,fr}.md', '!_*/**'], base: './content' }),
  schema: z.object({ title: z.string(), description: z.string(), coverAlt: z.string() }),
});
export const collections = { stories, entries };
