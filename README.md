# FTC Team 19639 Alphabots Official Website

Welcome to the official repository for the **First Tech Challenge (FTC) Team 19639, Alphabots**. We are a passionate high school robotics team based in the San Francisco Bay Area, dedicated to empowering youth through STEM, robotics, and community outreach.

This repository holds the code for our website: **[alphabotsrobotics.com](https://alphabotsrobotics.com)**.

---

## 🚀 Features
- **Dynamic Live Statistics:** Fetches real-time team statistics (OPR, Auto vs. Teleop Rank, etc.) via the FTC Scout API.
- **Interactive UI & 3D Model Viewer:** Highlights our modern robotic builds using Google Model Viewer for 3D CAD visualization.
- **Team Roster System:** Automatically updates and organizes team members and alumni based on their seasons.
- **Member Training Hub:** A dedicated portal with 8 FTC minigames (Wordle, Trivia, Hangman, Speed Match, etc.) explicitly designed to help new members practice rules and memorize FTC terminology.
- **Outreach & Gallery:** Documentation of our community engagement and impact alongside a dynamic photo gallery.

---

## 🛠️ Architecture & Technologies
This is a lightweight static website crafted entirely without heavy frontend frameworks to ensure maximum performance and accessibility.

- **Frontend Structure:** Plain HTML5 and Vanilla JS (`script.js`).
- **Styling:** Custom Vanilla CSS3 with mobile-first and responsive design principles, utilizing modern CSS variables for theming (`style.css`).
- **Icons:** Phosphor Icons.
- **Fonts:** Google Fonts (Inter).
- **Deployment & Hosting:** Automated CI/CD deployment to **GitHub Pages** via GitHub Actions (`.github/workflows/deploy.yml`).

---

## 💻 Local Development Setup

Because this is a static project, you don't need packages like Node.js or Python to run it. 

### Step 1: Clone the Repository
```bash
git clone https://github.com/Alphabots19639/FTC-Alphabots-19639-Website.git
cd FTC-Alphabots-19639-Website
```

### Step 2: Serve the Files
To view your changes without running into Cross-Origin Request (CORS) or caching issues (especially when working with modules or fetching images), we recommend using a simple local web server structure.

**Option A - VS Code Live Server (Recommended):**
1. Install the "Live Server" extension by Ritwick Dey.
2. Open the project folder in VS Code.
3. Click "Go Live" in the bottom right corner.

**Option B - Python Server (Native):**
If you have Python 3 installed, you can simply run:
```bash
python3 -m http.server 8000
```
Then navigate to `http://localhost:8000` in your browser.

---

## 🏗️ Repository Structure

```
├── index.html           # Main application structure, nav, sections
├── style.css            # Custom component styles and global themes
├── script.js            # Game logic, rendering logic, and API calls for components
├── logo.png             # Site logo
├── bot.jpg              # Featured robot image
├── download_images.js   # Automated Node script for asset handling
├── format_team.js       # Node script for formatting team member data
├── scrape_exact.js      # Internal node script for custom team data fetching
├── .github/
│   └── workflows/
│       └── deploy.yml   # GHA script for automated GitHub Pages delivery
├── images/
│   └── team/            # Compressed headshots of team members split by season
└── gallery/             # Images utilized in the photo gallery tab
```

---

## 🚀 Deployment

The site employs a continuous deployment pipeline configured through GitHub Actions. Whenever code is pushed or merged to the `main` branch, the `.github/workflows/deploy.yml` runs immediately.

The action automatically:
1. Checks out the repository.
2. Configures and bundles the current static content.
3. Deploys the artifacts to the active **GitHub Pages** server link.

If you push code to `main` and the live site isn't updating:
- Monitor the **Actions** tab in GitHub to ensure the job passed.
- Perform a hard refresh in your browser (`Ctrl + Shift + R` or `Cmd + Shift + R`), as CSS stylesheets and JS can be heavily cached.

---

## 🤝 Contributing
For team members contributing to the web dev base:
1. Always create a new branch containing the name of your feature (e.g., `feature/add-new-sponsors`).
2. Do not commit directly to `main` without testing your features using a local development server.
3. Open a Pull Request referencing any related issues when you're finished. 

---

_Designed for the Future. Empowering Youth. © 2026 Alphabots Robotics 19639._
