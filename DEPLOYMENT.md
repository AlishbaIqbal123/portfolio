# Portfolio Deployment Guide

This guide explains how to deploy your portfolio website. Since this is a React application built with Vite, it can be deployed to various static hosting providers like Vercel, Netlify, or GitHub Pages.

## Prerequisites

Before deploying, ensure you have:
1. Validated that your project builds locally:
   ```bash
   npm run build
   ```
2. Pushed your latest code to a Git repository (GitHub/GitLab/Bitbucket).

## Option 1: Deploy to Vercel (Recommended)

Vercel is the creators of Next.js and provides excellent support for Vite apps.

1. **Sign Up/Login**: Go to [vercel.com](https://vercel.com) and sign up with your GitHub account.
2. **Import Project**:
   - Click "Add New..." -> "Project".
   - Select your GitHub repository `portfolio`.
   - Click "Import".
3. **Configure Project**:
   - **Framework Preset**: Vercel usually detects `Vite` automatically. If not, select `Vite`.
   - **Root Directory**: Ensure this is set to `app` (since your `package.json` is inside the `app` folder).
     - *Note*: If your repository root is `e:/portfolio` and the React app is in `app/`, you MUST set the Root Directory to `app`.
   - **Build Command**: `npm run build` (default).
   - **Output Directory**: `dist` (default).
   - **Install Command**: `npm install` (default).
4. **Deploy**: Click "Deploy".
5. **Wait**: Vercel will build and deploy your site. You will get a live URL (e.g., `your-portfolio.vercel.app`).

## Option 2: Deploy to Netlify

1. **Sign Up/Login**: Go to [netlify.com](https://netlify.com).
2. **Add New Site**: Click "Add new site" -> "Import an existing project".
3. **Connect to Git**: Choose GitHub and authorize.
4. **Pick Repository**: Select your `portfolio` repository.
5. **Configure Build Settings**:
   - **Base directory**: `app` (Very important if your `package.json` is in the `app` subfolder).
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. **Deploy**: Click "Deploy site".

## Option 3: Deploy to GitHub Pages (Manual)

1. Open `vite.config.ts` and ensure `base` is set correctly.
   - If deploying to `https://<USERNAME>.github.io/<REPO>/`, set `base: '/<REPO>/'`.
   - If deploying to `https://<USERNAME>.github.io/`, set `base: '/'`.
2. Install `gh-pages` package:
   ```bash
   npm install gh-pages --save-dev
   ```
3. Add these scripts to `package.json`:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
4. Run the deploy command:
   ```bash
   npm run deploy
   ```

## Troubleshooting Common Issues

### 1. "Rollup failed to resolve import" or "Module not found"
- This usually means a file path is incorrect or a dependency is missing.
- **Fix**: Check your imports. Ensure you are using absolute paths (starting with `@/` defined in `vite.config.ts` and `tsconfig.json`) or correct relative paths.
- **Fix**: Run `npm install` to ensure all dependencies are present.

### 2. "Cannot find type definition file for 'vite/client'"
- This happens if `vite` is not installed or `tsconfig` is misconfigured.
- **Fix**: ensure `npm install` has finished successfully.
- **Fix**: Ensure `tsconfig.app.json` (or `tsconfig.json`) includes `"types": ["vite/client"]` in `compilerOptions`.

### 3. Blank page after deployment
- Check the console (F12) for errors.
- Likely an issue with the `base` path in `vite.config.ts`. If serving from a subdirectory, you need to set the base path.
