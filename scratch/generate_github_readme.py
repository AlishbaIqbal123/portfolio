import json
import os

# Load DB dump
db_path = r"C:\Users\Hp\Documents\portfolio\app\db_dump.json"
if os.path.exists(db_path):
    with open(db_path, "r", encoding="utf-8") as f:
        db_data = json.load(f)
else:
    db_data = {"projects": [], "experience": [], "education": []}

# --- SVG 1: Header Banner (1400x320) ---
header_svg = """<svg width="1400" height="320" viewBox="0 0 1400 320" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bg-11" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#5B2A86">
    <animate attributeName="stop-color" values="#5B2A86;#6C63FF;#5B2A86" dur="8s" repeatCount="indefinite"/>
  </stop>
  <stop offset="50%" stop-color="#6C63FF">
    <animate attributeName="stop-color" values="#6C63FF;#00C9A7;#6C63FF" dur="8s" repeatCount="indefinite"/>
  </stop>
  <stop offset="100%" stop-color="#00C9A7">
    <animate attributeName="stop-color" values="#00C9A7;#5B2A86;#00C9A7" dur="8s" repeatCount="indefinite"/>
  </stop>
</linearGradient>
<radialGradient id="bubble-grad-11" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
        <stop offset="45%" stop-color="#ffffff" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.03"/>
</radialGradient>
<filter id="soft-11" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.2"/></filter>
</defs>
<rect width="100%" height="100%" fill="url(#bg-11)"/>
<!-- Floating bubbles -->
<g opacity="0.15">
  <circle cx="0" cy="0" r="40.6" fill="url(#bubble-grad-11)" filter="url(#soft-11)"/>
  <animateTransform attributeName="transform" type="translate" values="783.7,347.4; 816.3,-68.6; 783.7,-484.6" keyTimes="0;0.5;1" dur="9.7s" repeatCount="indefinite"/>
</g>
<g opacity="0.23">
  <circle cx="0" cy="0" r="50.3" fill="url(#bubble-grad-11)" filter="url(#soft-11)"/>
  <animateTransform attributeName="transform" type="translate" values="1110.2,121.6; 1149.5,-294.4; 1110.2,-710.4" keyTimes="0;0.5;1" dur="8.4s" repeatCount="indefinite"/>
</g>
<g opacity="0.20">
  <circle cx="0" cy="0" r="69.4" fill="url(#bubble-grad-11)" filter="url(#soft-11)"/>
  <animateTransform attributeName="transform" type="translate" values="1350.7,273.9; 1366.1,-142.1; 1350.7,-558.1" keyTimes="0;0.5;1" dur="10.9s" repeatCount="indefinite"/>
</g>
<g opacity="0.20">
  <circle cx="0" cy="0" r="26.3" fill="url(#bubble-grad-11)" filter="url(#soft-11)"/>
  <animateTransform attributeName="transform" type="translate" values="338.7,104.2; 379.0,-311.8; 338.7,-727.8" keyTimes="0;0.5;1" dur="9.7s" repeatCount="indefinite"/>
</g>
<g opacity="0.25">
  <circle cx="0" cy="0" r="43.2" fill="url(#bubble-grad-11)" filter="url(#soft-11)"/>
  <animateTransform attributeName="transform" type="translate" values="927.4,220.4; 972.3,-195.5; 927.4,-611.6" keyTimes="0;0.5;1" dur="8.2s" repeatCount="indefinite"/>
</g>
<g opacity="0.26">
  <circle cx="0" cy="0" r="33.2" fill="url(#bubble-grad-11)" filter="url(#soft-11)"/>
  <animateTransform attributeName="transform" type="translate" values="321.5,174.6; 348.5,-241.4; 321.5,-657.4" keyTimes="0;0.5;1" dur="6.6s" repeatCount="indefinite"/>
</g>
<g opacity="0.28">
  <circle cx="0" cy="0" r="68.1" fill="url(#bubble-grad-11)" filter="url(#soft-11)"/>
  <animateTransform attributeName="transform" type="translate" values="1186.2,96.1; 1215.3,-319.9; 1186.2,-735.9" keyTimes="0;0.5;1" dur="7.7s" repeatCount="indefinite"/>
</g>
<g opacity="0.27">
  <circle cx="0" cy="0" r="20.0" fill="url(#bubble-grad-11)" filter="url(#soft-11)"/>
  <animateTransform attributeName="transform" type="translate" values="881.2,307.8; 906.2,-108.2; 881.2,-524.2" keyTimes="0;0.5;1" dur="8.2s" repeatCount="indefinite"/>
</g>
<!-- Sparkles -->
<circle cx="1008.5" cy="22.0" r="2.7" fill="#ffffff" opacity="0.20">
  <animate attributeName="opacity" values="0.06;0.20;0.06" dur="3.7s" repeatCount="indefinite"/>
</circle>
<circle cx="392.3" cy="293.6" r="4.5" fill="#ffffff" opacity="0.19">
  <animate attributeName="opacity" values="0.06;0.19;0.06" dur="2.0s" repeatCount="indefinite"/>
</circle>
<circle cx="84.6" cy="56.4" r="3.8" fill="#ffffff" opacity="0.22">
  <animate attributeName="opacity" values="0.07;0.22;0.07" dur="3.7s" repeatCount="indefinite"/>
</circle>
<!-- Text Elements -->
<text x="50%" y="134" text-anchor="middle" font-family="Segoe UI, Verdana, sans-serif" font-size="52" font-weight="700" fill="#ffffff" style="letter-spacing:1px">Hi, I'm Alishba Iqbal ⚡</text>
<text x="50%" y="181" text-anchor="middle" font-family="Segoe UI, Verdana, sans-serif" font-size="20" font-weight="400" fill="#f0f0ffcc">Software Engineer • Full Stack Developer • Flutter &amp; AI Enthusiast</text>
</svg>"""

# --- SVG 2: Divider 1 (bg-12: Indigo/Teal) ---
divider_1_svg = """<svg width="1400" height="70" viewBox="0 0 1400 70" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bg-12" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#6c63ff">
    <animate attributeName="stop-color" values="#6c63ff;#8e7cff;#6c63ff" dur="8s" repeatCount="indefinite"/>
  </stop>
  <stop offset="50%" stop-color="#8e7cff">
    <animate attributeName="stop-color" values="#8e7cff;#00c9a7;#8e7cff" dur="8s" repeatCount="indefinite"/>
  </stop>
  <stop offset="100%" stop-color="#00c9a7">
    <animate attributeName="stop-color" values="#00c9a7;#6c63ff;#00c9a7" dur="8s" repeatCount="indefinite"/>
  </stop>
</linearGradient>
<radialGradient id="bubble-grad-12" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
        <stop offset="45%" stop-color="#ffffff" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.03"/>
</radialGradient>
<filter id="soft-12" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.2"/></filter>
</defs>
<rect width="100%" height="100%" fill="url(#bg-12)"/>
<g opacity="0.16">
  <circle cx="0" cy="0" r="9.1" fill="url(#bubble-grad-12)" filter="url(#soft-12)"/>
  <animateTransform attributeName="transform" type="translate" values="920.5,60.7; 946.7,-30.3; 920.5,-121.3" keyTimes="0;0.5;1" dur="7.1s" repeatCount="indefinite"/>
</g>
<g opacity="0.15">
  <circle cx="0" cy="0" r="11.7" fill="url(#bubble-grad-12)" filter="url(#soft-12)"/>
  <animateTransform attributeName="transform" type="translate" values="842.0,54.2; 870.2,-36.8; 842.0,-127.8" keyTimes="0;0.5;1" dur="11.3s" repeatCount="indefinite"/>
</g>
<g opacity="0.25">
  <circle cx="0" cy="0" r="4.2" fill="url(#bubble-grad-12)" filter="url(#soft-12)"/>
  <animateTransform attributeName="transform" type="translate" values="1146.3,25.4; 1173.5,-65.6; 1146.3,-156.6" keyTimes="0;0.5;1" dur="11.5s" repeatCount="indefinite"/>
</g>
<g opacity="0.14">
  <circle cx="0" cy="0" r="4.2" fill="url(#bubble-grad-12)" filter="url(#soft-12)"/>
  <animateTransform attributeName="transform" type="translate" values="1281.0,51.3; 1324.4,-39.7; 1281.0,-130.7" keyTimes="0;0.5;1" dur="6.7s" repeatCount="indefinite"/>
</g>
<g opacity="0.15">
  <circle cx="0" cy="0" r="5.1" fill="url(#bubble-grad-12)" filter="url(#soft-12)"/>
  <animateTransform attributeName="transform" type="translate" values="437.6,58.0; 454.1,-33.0; 437.6,-124.0" keyTimes="0;0.5;1" dur="7.3s" repeatCount="indefinite"/>
</g>
</svg>"""

# --- SVG 3: Divider 2 (bg-13: Teal/Indigo) ---
divider_2_svg = """<svg width="1400" height="70" viewBox="0 0 1400 70" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="bg-13" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#00c9a7">
    <animate attributeName="stop-color" values="#00c9a7;#5fd6c4;#00c9a7" dur="8s" repeatCount="indefinite"/>
  </stop>
  <stop offset="50%" stop-color="#5fd6c4">
    <animate attributeName="stop-color" values="#5fd6c4;#6c63ff;#5fd6c4" dur="8s" repeatCount="indefinite"/>
  </stop>
  <stop offset="100%" stop-color="#6c63ff">
    <animate attributeName="stop-color" values="#6c63ff;#00c9a7;#6c63ff" dur="8s" repeatCount="indefinite"/>
  </stop>
</linearGradient>
<radialGradient id="bubble-grad-13" cx="35%" cy="30%" r="70%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.55"/>
        <stop offset="45%" stop-color="#ffffff" stop-opacity="0.18"/>
        <stop offset="100%" stop-color="#ffffff" stop-opacity="0.03"/>
</radialGradient>
<filter id="soft-13" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.2"/></filter>
</defs>
<rect width="100%" height="100%" fill="url(#bg-13)"/>
<g opacity="0.14">
  <circle cx="0" cy="0" r="6.6" fill="url(#bubble-grad-13)" filter="url(#soft-13)"/>
  <animateTransform attributeName="transform" type="translate" values="959.4,61.7; 981.3,-29.3; 959.4,-120.3" keyTimes="0;0.5;1" dur="12.8s" repeatCount="indefinite"/>
</g>
<g opacity="0.25">
  <circle cx="0" cy="0" r="12.2" fill="url(#bubble-grad-13)" filter="url(#soft-13)"/>
  <animateTransform attributeName="transform" type="translate" values="182.3,52.6; 210.2,-38.4; 182.3,-129.4" keyTimes="0;0.5;1" dur="7.7s" repeatCount="indefinite"/>
</g>
<g opacity="0.25">
  <circle cx="0" cy="0" r="3.7" fill="url(#bubble-grad-13)" filter="url(#soft-13)"/>
  <animateTransform attributeName="transform" type="translate" values="386.2,29.7; 425.4,-61.3; 386.2,-152.3" keyTimes="0;0.5;1" dur="13.0s" repeatCount="indefinite"/>
</g>
<g opacity="0.21">
  <circle cx="0" cy="0" r="14.8" fill="url(#bubble-grad-13)" filter="url(#soft-13)"/>
  <animateTransform attributeName="transform" type="translate" values="1111.3,36.3; 1148.9,-54.7; 1111.3,-145.7" keyTimes="0;0.5;1" dur="12.8s" repeatCount="indefinite"/>
</g>
<g opacity="0.28">
  <circle cx="0" cy="0" r="7.8" fill="url(#bubble-grad-13)" filter="url(#soft-13)"/>
  <animateTransform attributeName="transform" type="translate" values="601.8,39.7; 640.7,-51.3; 601.8,-142.3" keyTimes="0;0.5;1" dur="6.9s" repeatCount="indefinite"/>
</g>
</svg>"""

# Write SVGs directly to the portfolio workspace root
svg_out_dir = r"C:\Users\Hp\Documents\portfolio"
with open(os.path.join(svg_out_dir, "header.svg"), "w", encoding="utf-8") as f:
    f.write(header_svg)
with open(os.path.join(svg_out_dir, "divider1.svg"), "w", encoding="utf-8") as f:
    f.write(divider_1_svg)
with open(os.path.join(svg_out_dir, "divider2.svg"), "w", encoding="utf-8") as f:
    f.write(divider_2_svg)

print("Saved SVG files to root directory!")

# Format experience markdown
experience_md = ""
for exp in db_data.get("experience", []):
    desc_str = exp.get("description", "")
    desc_str = desc_str.replace('\\"', '"').replace('","', '\n- ')
    if desc_str.startswith('"') and desc_str.endswith('"'):
        desc_str = desc_str[1:-1]
        
    experience_md += f"### 💼 {exp.get('role')} at **{exp.get('company')}**\n"
    experience_md += f"*{exp.get('duration')} | {exp.get('location')}*\n\n"
    experience_md += f"{desc_str}\n\n"

# Format education markdown
education_md = ""
for edu in db_data.get("education", []):
    education_md += f"| 🏫 {edu.get('school')} | 🎓 {edu.get('degree')} | 📅 {edu.get('duration')} |\n"

# Format featured projects markdown
projects_md = ""
featured_projects = [p for p in db_data.get("projects", []) if p.get("featured") or p.get("title") in ["Doctor's Hub", "Clearance Flow", "Lumina Study"]]
for p in featured_projects:
    desc_first_line = p.get('description', '').split('\n')[0]
    projects_md += f"### 🛠️ {p.get('title')}\n"
    projects_md += f"{desc_first_line}\n\n"
    projects_md += "**Tech Stack**: " + ", ".join([f"`{t}`" for t in p.get("tech_stack", [])]) + "\n\n"
    links = []
    if p.get("github_link"):
        links.append(f"[Code Base 🔗]({p.get('github_link')})")
    if p.get("deployed_link"):
        links.append(f"[Live Demo 🚀]({p.get('deployed_link')})")
    projects_md += " • ".join(links) + "\n\n"

# Assemble the whole final README using URL-encoded Typing SVG and RAW SVG urls pointing to their profile repository
readme_md = f"""<div align="center">
<img src="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/main/header.svg" width="100%" alt="header"/>
</div>

<div align="center">

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&amp;weight=600&amp;size=22&amp;duration=3000&amp;pause=800&amp;color=6C63FF&amp;center=true&amp;vCenter=true&amp;width=650&amp;lines=Building+scalable+web+%26+mobile+apps+%F0%9F%9A%80;Flutter+%7C+React.js+%7C+Node.js+%7C+Gemini+AI;Turning+coffee+into+clean+code+%E2%98%95;Open+to+Software+Engineer+Internships!" alt="Typing SVG" />
</a>

<br/><br/>

<a href="mailto:i.alishba1342@gmail.com"><img src="https://img.shields.io/badge/Email-i.alishba1342%40gmail.com-6C63FF?style=for-the-badge&logo=gmail&logoColor=white" /></a>
<a href="https://www.linkedin.com/in/alishba-iqbal-a667b6263" target="_blank"><img src="https://img.shields.io/badge/LinkedIn-Connect-00C9A7?style=for-the-badge&logo=linkedin&logoColor=white" /></a>
<a href="https://alishbaiqbal123.vercel.app" target="_blank"><img src="https://img.shields.io/badge/Portfolio-Visit-FF6B6B?style=for-the-badge&logo=vercel&logoColor=white" /></a>
<a href="https://github.com/AlishbaIqbal123" target="_blank"><img src="https://img.shields.io/badge/GitHub-Follow-181717?style=for-the-badge&logo=github&logoColor=white" /></a>

<br/><br/>

<img src="https://komarev.com/ghpvc/?username=AlishbaIqbal123&color=6C63FF&style=for-the-badge&label=PROFILE+VIEWS" alt="Profile Views" />

</div>

<img src="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/main/divider1.svg" width="100%" alt="divider"/>

## 🙋‍♀️ About Me

```yaml
name: Alishba Iqbal
role: Software Engineering Student @ COMSATS University Islamabad, Vehari
graduating: June 2027
location: Vehari, Pakistan 🇵🇰
currently_building: AI-powered apps, full-stack platforms & Flutter mobile apps
looking_for: Software Engineer / Full Stack Developer Internship
fun_fact: "I debug faster with chai in hand ☕"
```

> 🚀 I love turning ideas into **scalable, user-focused products** — from AI resume analyzers to offline-first mobile apps.

<img src="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/main/divider1.svg" width="100%" alt="divider"/>

## 🎓 Education

<div align="center">

| 🏫 Institution | 🎓 Degree | 📅 Duration |
|:---|:---|:---|
{education_md}

</div>

<img src="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/main/divider1.svg" width="100%" alt="divider"/>

## 🛠️ Tech Stack

<div align="center">

**Languages**
<br/>
<img src="https://skillicons.dev/icons?i=cpp,py,php,js,dart,java&theme=light" />

<br/><br/>

**Frameworks & Libraries**
<br/>
<img src="https://skillicons.dev/icons?i=flutter,react,nodejs,express,laravel,bootstrap,stripe&theme=light" />

<br/><br/>

**Databases**
<br/>
<img src="https://skillicons.dev/icons?i=mysql,postgres,supabase,firebase,mongodb,sqlite&theme=light" />

<br/><br/>

**Tools & Platforms**
<br/>
<img src="https://skillicons.dev/icons?i=git,github,vscode,androidstudio,jira&theme=light" />

</div>

<img src="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/main/divider2.svg" width="100%" alt="divider"/>

## 💼 Experience & Internships

{experience_md}

<img src="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/main/divider2.svg" width="100%" alt="divider"/>

## 🚀 Featured Projects

{projects_md}

<img src="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/main/divider2.svg" width="100%" alt="divider"/>

## 📊 GitHub Metrics & Activity

<div align="center">
  <table border="0">
    <tr>
      <td align="center" valign="top">
        <img src="https://github-stats-extended.vercel.app/api?username=AlishbaIqbal123&show_icons=true&theme=radical&hide_border=true" alt="GitHub Stats" width="400" />
      </td>
      <td align="center" valign="top">
        <img src="https://github-stats-extended.vercel.app/api/top-langs/?username=AlishbaIqbal123&layout=compact&theme=radical&hide_border=true" alt="Top Languages" width="350" />
      </td>
    </tr>
  </table>
  <br/>
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=AlishbaIqbal123&bg_color=0d1117&color=6C63FF&line=00C9A7&point=ffffff&area=true&hide_border=true" alt="Contribution Graph" width="100%" />
</div>

<img src="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/main/divider2.svg" width="100%" alt="divider"/>

## 🐍 GitHub Contribution Snake Game

<div align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/output/github-contribution-grid-snake-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/output/github-contribution-grid-snake.svg">
    <img alt="GitHub Contribution Snake" src="https://raw.githubusercontent.com/AlishbaIqbal123/AlishbaIqbal123/output/github-contribution-grid-snake.svg" width="100%">
  </picture>
</div>
"""

# Write final README output
output_path = r"C:\Users\Hp\.gemini\antigravity\brain\cb16a3f7-ff83-4250-aaa6-ee54172bc04a\github_profile_readme.md"
with open(output_path, "w", encoding="utf-8") as out:
    out.write(readme_md)

print("Generated complete, uncorrupted, detailed GitHub Profile README successfully!")
