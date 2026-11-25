import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every collection here is edited through the admin panel (public/admin/config.yml).
// Photo paths look like "@uploads/name.jpg" (src/assets/uploads), so Astro can optimize them.

const settings = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/settings' }),
  schema: z.object({
    siteName: z.string(),
    tagline: z.string().optional(),
    theme: z.enum(['light', 'dark']).default('light'),
    showThemeToggle: z.boolean().default(true),
    accentColor: z.string().default('#b08d57'),
    headingFont: z.string().default('Cormorant Garamond'),
    bodyFont: z.string().default('Jost'),
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    footerText: z.string().optional(),
  }),
});

const home = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/home' }),
  schema: ({ image }) =>
    z.object({
      bannerImage: image(),
      bannerAlt: z.string().default(''),
      headline: z.string(),
      subheadline: z.string().optional(),
      buttonText: z.string().optional(),
      galleriesHeading: z.string().default('Portfolio'),
      featuredHeading: z.string().default('Selected Work'),
      featured: z.array(image()).default([]),
    }),
});

const galleries = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/galleries' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number().default(10),
      showOnHome: z.boolean().default(true),
      cover: image(),
      coverAlt: z.string().default(''),
      // Photos in display order (picked and reordered together in the admin panel).
      photos: z.array(image()).default([]),
      // Optional descriptions and captions for individual photos.
      photoDetails: z
        .array(
          z.object({
            image: image(),
            alt: z.string().optional(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
    }),
});

const contact = defineCollection({
  loader: glob({ pattern: '*.json', base: './src/content/contact' }),
  schema: ({ image }) =>
    z.object({
      heading: z.string(),
      headshot: image(),
      headshotAlt: z.string().default(''),
      bio: z.string(),
      email: z.string().optional(),
      phone: z.string().optional(),
      location: z.string().optional(),
      formHeading: z.string().default('Get in touch'),
      inquiryTypes: z.array(z.string()).default(['Wedding', 'Portrait', 'Interior', 'Landscape print', 'Other']),
      thanksMessage: z.string().default("Thank you! I'll get back to you within two business days."),
    }),
});

export const collections = { settings, home, galleries, contact };
