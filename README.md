# Photography portfolio

A fast, free-to-host photography site with a Squarespace-style admin panel.

- **Home**: full-screen banner, large previews of each gallery, and a "Selected Work" grid
- **Galleries**: Landscape, Interior, Portrait, Wedding (add more from the admin panel), each with a fullscreen photo viewer
- **Contact**: your photo, bio, and a form that emails you
- **Look & feel**: light or dark theme, accent color, and fonts, all set in the admin panel. Visitors can also switch light/dark.

Photos are resized and compressed automatically, so you can upload full-size JPEGs.

---

## Part 1: Put it online (one time, about 20 minutes, free)

### 1. Put the project on GitHub
1. Create a free account at https://github.com if you don't have one.
2. Click **New repository**, name it something like `photography-site`, and leave it **empty** (no README).
3. In Terminal, in this folder, run (replace the URL with your new repo's):
   ```bash
   git add -A
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/photography-site.git
   git push -u origin main
   ```

### 2. Tell the admin panel which repo to use
Open `public/admin/config.yml` and change:
```yaml
repo: YOUR-GITHUB-USERNAME/YOUR-REPO-NAME
```
Commit and push that change.

### 3. Host it on Netlify
1. Sign up at https://app.netlify.com with your GitHub account.
2. Choose **Add new site → Import an existing project → GitHub**, then pick your repo.
   The build settings are read from `netlify.toml` automatically. Click **Deploy**.
3. You'll get an address like `something.netlify.app`. Rename it under **Site configuration → Change site name**.
4. Put that address in `astro.config.mjs` (`site:`) and in `public/admin/config.yml` (`site_url`, `display_url`).

### 4. Turn on contact-form emails
1. In Netlify, open **Forms** and enable form detection, then redeploy (**Deploys → Trigger deploy**).
2. Go to **Site configuration → Notifications → Emails and webhooks → Form submission notifications**.
   Add a notification that emails you for the `contact` form.

Netlify's free plan includes 100 form submissions a month, with spam filtering.

### 5. Let yourself log in to the admin panel
1. On GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL: your Netlify address
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Copy the **Client ID**, then generate and copy a **Client Secret**.
2. On Netlify: **Site configuration → Access & security → OAuth → Install provider → GitHub**. Paste both values.
3. Go to `https://your-site.netlify.app/admin/` and click **Login with GitHub**.

Only people with write access to your GitHub repo can edit the site.

---

## Part 2: Everyday editing (in the browser)

Go to **your-site.netlify.app/admin/**.

| I want to… | Where |
|---|---|
| Add photos to a gallery or reorder them | **Galleries** → pick one → **Photos** → *Add photos*, then drag to reorder |
| Add a new category (e.g. "Events") | **Galleries** → **New Gallery**. It appears in the menu automatically |
| Change the banner, headline, or featured photos | **Pages → Home page** |
| Edit your bio, headshot, email, or form choices | **Pages → About & Contact page** |
| Switch light/dark, accent color, or fonts | **Site Settings** |

Click **Publish → Publish now**. The site rebuilds and is live in about a minute.

**Tips**
- Upload JPEGs straight from Lightroom (around 2500–4000px on the long edge is plenty).
- Fill in the **Description (alt text)** fields. They help with Google and accessibility.
- Once your real photos are in, delete the `sample-…jpg` files in **Media**.

---

## Moving from Squarespace
1. Download your original photos (from Lightroom or your archive, which are better quality than images saved off Squarespace).
2. Copy your bio and contact details into **Pages → About & Contact page**.
3. When you're ready to use a custom domain: Netlify → **Domain management → Add a domain**.
   If your domain is registered through Squarespace, you can either point its DNS at Netlify or transfer it to a cheaper registrar.

---

## Working on your computer (optional)

Requires Node.js (`brew install node`).

```bash
npm install
npm run dev     # site at http://localhost:4321
npm run cms     # in a second Terminal tab: lets the admin work locally
```
Local admin: http://localhost:4321/admin/index.html. Changes are saved straight into the files here. Commit and push them to publish.

`npm run build` makes the production site in `dist/`.

### Where things are
```
src/content/            ← all your text and photo lists (edited by the admin panel)
src/assets/uploads/     ← your photos
src/pages/              ← page templates
src/components/         ← header, footer, gallery grid, fullscreen viewer
src/styles/theme.css    ← light/dark colors
public/admin/config.yml ← what the admin panel lets you edit
```
