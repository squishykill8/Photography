import { getCollection } from 'astro:content';

// Each of these collections holds a single entry edited in the admin panel.
async function single<C extends 'settings' | 'home' | 'contact'>(name: C) {
  const [entry] = await getCollection(name);
  if (!entry) throw new Error(`Missing content in src/content/${name}/`);
  return entry.data;
}

export const getSettings = () => single('settings');
export const getHome = () => single('home');
export const getContact = () => single('contact');

export async function getGalleries() {
  const all = await getCollection('galleries');
  return all.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}
