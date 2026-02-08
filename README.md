# Alishba Iqbal Portfolio

A premium, modern portfolio website built with React, TypeScript, and Framer Motion.

## 🚀 Deployment Guide

This project is built using **Vite**, so it's optimized for fast builds and deployment on platforms like Vercel, Netlify, or GitHub Pages.

### Option 1: Vercel (Recommended)
This is the easiest and most professional method.
1. Create a repository on **GitHub** and push your code.
2. Go to [Vercel.com](https://vercel.com) and sign in with GitHub.
3. Click **"Add New"** > **"Project"**.
4. Select your portfolio repository.
5. Vercel will auto-detect Vite. Click **"Deploy"**.
6. Every time you push to GitHub, Vercel will automatically update your site!

### Option 2: Netlify
1. Run `npm run build` in your terminal. This creates a `dist` folder.
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the `dist` folder into the website.
4. Your site is live instantly!

### Option 3: GitHub Pages
1. Install the gh-pages package: `npm install gh-pages --save-dev`
2. Add these to your `package.json`:
   - `"homepage": "https://yourusername.github.io/your-repo-name",` (at the top)
   - `"predeploy": "npm run build",` (in scripts)
   - `"deploy": "gh-pages -d dist",` (in scripts)
3. Run `npm run deploy`.

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Environment**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Themes**: Light/Dark Mode support

## 🔧 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## 📝 Features

- **Personalized Branding**: Customized with name, current semester, and updated CGPA (3.64).
- **Modern Animations**: Professional, smooth transitions using Framer Motion.
- **Enhanced Cursor**: Liquid-style interactive custom cursor for a premium feel.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Iconic Quick Links**: Clear navigation using modern vector icons (Lucide).
