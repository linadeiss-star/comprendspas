import { getCollection, type CollectionEntry } from 'astro:content';
import { type Language } from './i18n';
const photos = import.meta.glob<string>(['/content/*/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', '!/content/_*/**'], { eager: true, query: '?url', import: 'default' });
export const photoUrl = (filename: string) => {
  const photo = photos[`/content/${filename}`];
  if (!photo) throw new Error(`Photo "${filename}" is missing. Add it to that entry folder or correct cover in info.yaml.`);
  return photo;
};
export const url = (path = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
export type Entry = Omit<CollectionEntry<'entries'>, 'data'> & {
  data: CollectionEntry<'entries'>['data'] & CollectionEntry<'stories'>['data'] & { language: Language; translationKey: string };
};
// Keep the original public URLs while content is organised by entry/language.
export const entrySlug = (entry: Entry) => `${entry.data.language === 'en' ? '' : `${entry.data.language}-`}${entry.data.translationKey}`;
export const publishedEntries = async (language?: Language): Promise<Entry[]> => {
  const stories = new Map((await getCollection('stories')).map(story => [story.id, story.data]));
  return (await getCollection('entries')).map(entry => {
    const [folder, lang] = entry.id.split('/');
    const shared = stories.get(folder);
    if (!shared) throw new Error(`Missing info.yaml in content/${folder}. Copy it from content/_new-entry.`);
    return { ...entry, data: { ...shared, ...entry.data, language: lang as Language, translationKey: folder, cover: `${folder}/${shared.cover}` } };
  }).filter(({ data }) => !data.draft && (!language || data.language === language))
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
};
