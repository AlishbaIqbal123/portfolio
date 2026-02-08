# How to Deploy Your Portfolio

To host your portfolio so that it automatically updates whenever you push changes to GitHub, the best platforms are **Vercel** or **Netlify**. Here is a step-by-step guide using Vercel (recommended).

## Step 1: Push Your Code to GitHub
1. Create a new repository on [GitHub](https://github.com/new).
2. Push your local code to this repository:
   ```bash
   git init
   git add .
   git commit -m "initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

## Step 2: Connect to Vercel
1. Go to [Vercel.com](https://vercel.com) and sign up with your GitHub account.
2. Click on **"Add New"** > **"Project"**.
3. Find your repository in the list and click **"Import"**.
4. Vercel will automatically detect that it's a Vite/React project. You don't need to change the default settings.
5. Click **"Deploy"**.

## Step 3: Enjoy Automatic Updates
Your site is now live! 
*   Vercel will provide you with a production URL (e.g., `your-portfolio.vercel.app`).
*   **Automatic Redeployment:** Whenever you make changes to your code locally, just commit and push them to GitHub:
    ```bash
    git add .
    git commit -m "updated projects and experience"
    git push origin main
    ```
*   Vercel will detect the push, rebuild your site, and update the live link automatically within a minute. You **don't** need to share a new link; the existing one will always show the latest version.

---

### Alternative: Netlify
The process is almost identical:
1. Sign up for [Netlify](https://netlify.com).
2. Select **"Import from Git"**.
3. Choose your repository and deploy.
4. Netlify also supports automatic rebuilds on every push.
