# 🌟 Alishba Iqbal — Full Stack Developer Portfolio

Welcome to my personal portfolio project! This repository contains the source code for my professional portfolio website, featuring a dynamic frontend, modern animations, an interactive AI-powered assistant, and a fully functional, secured admin panel to manage content in real-time.

🔗 **Live Demo**: [https://alishbaiqbal123.vercel.app/](https://alishbaiqbal123.vercel.app/)

---

## 🚀 Key Features

- **🎨 Modern Dark Coffee Theme**: Crafted with custom HSL-tailored colors, smooth glassmorphism, responsive light/dark modes, and a customized floating custom cursor.
- **✨ Advanced Creative Animations**: Powered by Framer Motion, GSAP, and custom Canvas elements (floating orbs, border glows, color bends, velocity scrolls) that bring the interface to life.
- **🛡️ Secure Dynamic Admin Dashboard**: Integrates Supabase Auth & PostgreSQL. The admin can dynamically create, read, update, and delete (CRUD) projects, skills, education milestones, experiences, and site-wide metadata in real-time without redeploying.
- **💬 AI Chatbot Assistant**: Embedded conversational AI agent powered by Gemini API, trained with custom context to answer queries about my profile, background, and skills.
- **📊 Live GitHub Stats**: Features an interactive 52-week contribution calendar and real-time statistics directly connected to my GitHub profile.
- **📬 Contact Integration**: Fully functional contact form with client-side validation and database persistence for inquiry tracking.

---

## 🛠️ Technology Stack

| Layer | Technologies Used | Purpose |
|---|---|---|
| **Core Framework** | React 19, TypeScript, Vite | Scalable, type-safe development and ultra-fast builds |
| **Styling & Theme** | Tailwind CSS, shadcn/ui, Tailwind Animate | Responsive grid layouts, modern UI design system |
| **Animations** | Framer Motion, GSAP | Smooth scroll-triggered transitions, interactive micro-animations |
| **Database & Auth** | Supabase (PostgreSQL), GoTrue Auth | Secure database, user authentication, and RLS policies |
| **Generative AI** | Google Gemini API (via client-side wrapper) | Intelligent profile-specific chatbot |
| **Visualization** | Recharts, React GitHub Calendar | Interactive charts and GitHub contributions display |

---

## 📂 Project Structure

```text
portfolio/ (Workspace Root)
├── PORTFOLIO_DOCUMENTATION.md    # Detail documentation of features, sections, and customization
└── app/                         # React Frontend Application (Git Repository Root)
    ├── .env                     # Environment variables configuration
    ├── .gitignore               # Git ignore rules
    ├── index.html               # Vite entry HTML
    ├── package.json             # NPM dependencies & scripts
    ├── postcss.config.js        # PostCSS configuration
    ├── tailwind.config.js       # Tailwind CSS configuration
    ├── tsconfig.json            # TypeScript configuration
    ├── vercel.json              # Vercel deployment configuration
    ├── vite.config.ts           # Vite build configuration
    ├── supabase_schema.sql      # Supabase SQL table definitions & RLS policies
    ├── public/                  # Static assets (images, CV, etc.)
    │   ├── cv/                  # Downloadable PDF resume
    │   └── images/              # Project screenshots & asset images
    └── src/                     # React application source code
        ├── App.css              # Main layout/utility styles
        ├── App.tsx              # Main routing & application wrapper
        ├── admin-themes.css     # CSS themes for Admin Panel
        ├── index.css            # Base styles & Tailwind directives
        ├── main.tsx             # Application entry point
        ├── components/          # Reusable UI & effect components
        │   ├── Chatbot.tsx      # Interactive AI Chatbot (Gemini-powered)
        │   ├── CustomCursor.tsx # Custom animated mouse cursor
        │   ├── Footer.tsx       # Site Footer component
        │   ├── GadgetBackground.tsx
        │   ├── NaqabAvatar.tsx  # Dynamic interactive profile avatar
        │   ├── Navbar.tsx       # Floating responsive navbar with theme toggle
        │   ├── ProtectedRoute.tsx # Route guard for Admin Page (Supabase Auth)
        │   ├── QuickAdmin.tsx   # Fast access floating admin panel trigger
        │   ├── ScrollToTop.tsx  # Scroll to top button
        │   ├── admin/           # Components for the Admin Panel
        │   │   ├── AdminEducation.tsx
        │   │   ├── AdminExperience.tsx
        │   │   ├── AdminProjects.tsx
        │   │   ├── AdminSettings.tsx
        │   │   └── AdminSkills.tsx
        │   ├── effects/         # Custom creative canvas & scroll effects
        │   │   ├── BorderGlow.tsx
        │   │   ├── ColorBends.tsx
        │   │   ├── ScrollVelocity.tsx
        │   │   └── Silk.tsx
        │   └── ui/              # shadcn UI primitive components
        │       └── ...          # Accordion, Button, Card, Dialog, etc. (56 primitives)
        ├── data/                # Static/Fallback portfolio data
        │   ├── experience.ts
        │   ├── personal.ts
        │   ├── projects.ts
        │   ├── skills.ts
        │   └── professional_tips.json
        ├── hooks/               # Custom React hooks
        │   ├── use-mobile.ts    # Responsive screen size hook
        │   ├── useAdminTheme.tsx # Admin-specific theme hook
        │   ├── useScrollAnimation.ts # Trigger motion on scroll
        │   └── useTheme.tsx     # Theme switcher (Dark Coffee/Light)
        ├── lib/                 # Third-party API Clients & utils
        │   ├── api.ts           # Supabase DB operations and helpers
        │   ├── chatbot-context.ts
        │   ├── skill-helper.ts
        │   ├── supabase.ts      # Supabase Client initialization
        │   └── utils.ts         # Utility class merger (clsx + tailwind-merge)
        ├── pages/               # Page components for routing
        │   ├── AboutPage.tsx
        │   ├── AdminPage.tsx    # Secure dashboard for editing data
        │   ├── ContactPage.tsx
        │   ├── EducationPage.tsx
        │   ├── ExperiencePage.tsx
        │   ├── HomePage.tsx     # Full page scrolling portfolio sections
        │   ├── LoginPage.tsx    # Supabase authentication page
        │   ├── ProjectDetailPage.tsx # Detailed page for a single project
        │   ├── ProjectsPage.tsx # List of projects with filtering
        │   ├── SkillsPage.tsx
        │   ├── TipsPage.tsx     # Coding tips list page
        │   └── TipDetailPage.tsx
        └── sections/            # Sections displayed on the HomePage
            ├── About.tsx        # Personal intro with stats
            ├── Contact.tsx      # Contact form & social handles
            ├── Experience.tsx   # Vertical interactive timeline
            ├── Footer.tsx       # Bottom footer
            ├── GitHubStats.tsx  # GitHub activity calendar and stats
            ├── Hero.tsx         # Welcome banner with typing animation
            ├── Projects.tsx     # Featured projects carousel/grid
            └── Skills.tsx       # Visual skills category cards
```

---

## ⚙️ Development Setup

Follow these steps to set up and run this project locally:

### 1. Prerequisites
- **Node.js**: Version 18.x or above
- **npm** (comes with Node.js)
- **Supabase Account**: For hosting the PostgreSQL database and managing Auth

### 2. Clone and Install Dependencies
Navigate to the `app` directory and install the required npm packages:
```bash
git clone https://github.com/AlishbaIqbal123/portfolio.git
cd portfolio/app
npm install
```

### 3. Setup Database Schema
1. Create a new project in your Supabase Dashboard.
2. Open the SQL Editor in Supabase.
3. Copy the contents of the `supabase_schema.sql` file located in the root of the `app` folder, paste it into the SQL editor, and click **Run**. This will create the necessary tables (`projects`, `education`, `experience`, `skill_categories`, `articles`, `admin_settings`, `coding_tips`) and set up Row Level Security (RLS) policies.

### 4. Configure Environment Variables
Create a file named `.env` in the `app/` directory and populate it with your credentials:
```env
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_public_key

# Gemini API Key (For the Chatbot)
VITE_GEMINI_API_KEY=your_gemini_api_key

# Database Connection (Optional - for migrations or Prisma/pg tools)
DATABASE_URL="postgresql://postgres.[your-project-id]:[password]@aws-0-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.[your-project-id]:[password]@aws-0-ap-northeast-2.pooler.supabase.com:5432/postgres"
```

### 5. Run Locally
Start the Vite development server:
```bash
npm run dev
```
Open your browser and visit `http://localhost:5173`.

### 6. Build for Production
To bundle the application for production:
```bash
npm run build
```
The optimized build output will be generated inside the `dist/` directory.

---

## 🗄️ Database Schema & RLS Policies
The Supabase database uses Row Level Security (RLS) to protect content:
- **Public Read Access**: Anonymous visitors can view projects, skills, education, and experiences.
- **Admin Full Access**: Only authenticated users (`auth.role() = 'authenticated'`) can insert, update, or delete data. This is managed securely through the admin dashboard.

Refer to `supabase_schema.sql` for table relations, fields, and policy configurations.

---

## 🎨 Theme & Customization Guide
If you wish to customize this project:
- **Colors**: Adjust the HSL and Hex values in `src/index.css` inside `:root` and `.dark`.
- **Admin Dashboard**: Access the admin interface by navigating to `/login` to sign in. Once authenticated, navigate to `/admin` to modify portfolio contents dynamically.
- **Fallback Data**: Modify the typescript data files under `src/data/` if you want hardcoded defaults.

---

## 📧 Contact Information

- **Name**: Alishba Iqbal
- **Role**: Software Engineering Student | Full Stack Developer
- **Location**: Vehari, Pakistan
- **Email**: i.alishba1342@gmail.com
- **Phone**: +92 3180623294
- **LinkedIn**: [alishba-iqbal-a667b6263](https://www.linkedin.com/in/alishba-iqbal-a667b6263)
- **GitHub**: [@AlishbaIqbal123](https://github.com/AlishbaIqbal123)

---
*Created with ❤️ by Alishba Iqbal*
