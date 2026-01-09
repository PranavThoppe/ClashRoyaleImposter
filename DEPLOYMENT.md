# Deployment Guide

This guide explains how to deploy the Clash Royale Imposter game to GitHub Pages or Vercel.

## Prerequisites

- Node.js installed
- Git repository set up
- GitHub account (for GitHub Pages)
- Vercel account (optional, for Vercel deployment)

## Local Web Testing

Test the web build locally first:

```bash
npm run web
```

This will start a development server at `http://localhost:8081` (or similar).

## Build for Production

Create a production build:

```bash
npm run build:web
```

This creates a `web-build` folder with static files ready for deployment.

## Option 1: Deploy to GitHub Pages

### Automatic Deployment (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git add .
   git commit -m "Add web deployment config"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Click **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - The workflow will automatically deploy on every push to `main`

3. **Access your site**:
   - Your site will be available at: `https://yourusername.github.io/ClashRoyale_Imposter/`
   - Note: GitHub Pages URLs are case-sensitive

### Manual Deployment

If you prefer manual deployment:

```bash
npm run build:web
# Then manually upload the web-build folder to GitHub Pages
```

## Option 2: Deploy to Vercel

### Using Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```
   Follow the prompts to link your project and deploy.

### Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click **Add New Project**
3. Import your GitHub repository
4. Vercel will automatically detect the `vercel.json` config
5. Click **Deploy**

Your site will be live at: `https://your-project-name.vercel.app`

## Troubleshooting

### Images Not Loading

If card images don't load on the web:
- Make sure all images are in `assets/cards/`
- Check that image paths are correct in `App.js`
- Rebuild: `npm run build:web`

### Routing Issues

Both GitHub Pages and Vercel are configured to handle client-side routing. If you see 404 errors:
- GitHub Pages: Make sure the workflow file is in `.github/workflows/`
- Vercel: The `vercel.json` rewrites should handle this automatically

### Build Errors

If you encounter build errors:
```bash
npm install --legacy-peer-deps
npm run build:web
```

## Notes

- The `web-build` folder is gitignored (don't commit it)
- GitHub Actions will build and deploy automatically
- Vercel builds on every push to your main branch
- Both platforms support custom domains
