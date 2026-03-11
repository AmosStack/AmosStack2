# AmosStack Portfolio

Modern personal portfolio website for **AmosStack** built as a high-performance static site with advanced animations and glassmorphism design.

## Overview

Premium portfolio featuring a contemporary design system with:
- **Floating sidebar** navigation with centered links and rounded aesthetics
- **Full-page animated background** (Hero network canvas) fixed behind all scrolling content
- **Glassmorphism UI** with backdrop-filter blur effects across all sections
- **Interactive collision-physics animations** for skill nodes
- **Light/Dark mode toggle** with localStorage persistence
- **Glass-effect login form** with responsive styling
- **Modern color system** with brand colors for each technology skill

## Features

- **Floating Sidebar Navigation**: Fixed rounded sidebar with centered navigation links
- **Hero Network Animation**: HTML5 Canvas-based animated background layer
- **Glass-Panel Sections**: Translucent containers with backdrop blur (About, Projects, Skills, Resume, Contact)
- **Dynamic Skills Section**: 17 animated skill icons with individual brand colors + real-time collision physics
- **Project Cards**: Glass-style cards with image, description, Demo + GitHub links
- **Light/Dark Theme**: Full theme system with color-coded CSS variables + localStorage persistence
- **Login Form** (form.html): Standalone authentication page with glass-morphism styling
- **Accessibility-First**: Responsive design, theme preference detection, reduced-motion support

## Project Structure

```text
.
├── index.html                    # Main portfolio page
├── CNAME                         # GitHub Pages custom domain
├── assets/
│   ├── css/
│   │   └── style.css            # Main stylesheet (1500+ lines with modern theming)
│   ├── js/
│   │   └── main.js              # Collision physics + theme toggle logic
│   ├── img/
│   │   ├── profile-img.jpeg
│   │   └── (project images)
│   └── vendor/                  # Third-party libraries
│       ├── bootstrap/           # Bootstrap 5.3.3
│       ├── boxicons/            # Icon library for skills
│       ├── aos/                 # Scroll animation library
│       ├── glightbox/           # Lightbox for image galleries
│       ├── isotope-layout/      # Portfolio grid filtering
│       ├── swiper/              # Image carousel
│       ├── typed.js/            # Text typing effect
│       ├── purecounter/         # Counter animation
│       └── waypoints/           # Scroll detection
└── README.md                     # This file
```

## Run Locally

Because this is a static site, you can run it with any HTTP server. The canvas animation and collision physics work instantly with no build step required.

### VS Code Live Server (Recommended)
1. Open folder in VS Code
2. Install **Live Server** extension
3. Right-click `index.html` → "Open with Live Server"
4. Browser opens at `http://localhost:5500`

## Customization Guide

### 1) Personal Information
Edit content in:
- `index.html` (About, Resume, Contact, Personal Links)
- `#header .profile` section for name, avatar, social links

### 2) Tech Skills (Collision Physics)
Edit skill nodes in `index.html` under `#skills .skills-orbit`:
- Add/remove `<div class="skill-node skill-{techname}">` elements
- Each skill needs: icon (`<i class="bx bxl-...">`) + label (`<span>`)
- Color variables auto-defined in `assets/css/style.css` (`.skill-react`, `.skill-nodejs`, etc.)
- **Note**: Collision physics automatically activate — no code changes needed

**Add new skill color** in `assets/css/style.css`:
```css
.skill-newtech {
  --accent: #color-hex;
  --accent-soft: rgba(r, g, b, 0.4);
}
```

### 3) Project Cards
In `index.html` under `#projects`:
- Update project images in `src="assets/img/..."`
- Replace Demo/GitHub URLs in card links
- Modify project title, description, and tech stack

### 4) Theme Styling
Edit theme tokens in `assets/css/style.css`:
- `:root` selector for default light mode colors
- `body.dark-mode` selector for dark mode overrides
- CSS variables control: `--accent`, `--glass-panel-bg`, `--glass-panel-border`, etc.

### 5) Hero Background & Animations
Edit in `assets/js/main.js`:
- **Collision physics**: Adjust velocity/bounce in `initSkillsOrbit()` function
- **Hero canvas animation**: See `#hero-network` canvas initialization
- **Hero gradient**: Update `--hero-gradient` variable in CSS

### 6) Glass-Panel Effect
All sections (About, Projects, Skills, Resume, Contact) use glass styling:
```css
--glass-panel-bg: rgba(255, 255, 255, 0.15);      /* Adjust transparency */
--glass-panel-border: rgba(255, 255, 255, 0.3);  /* Adjust border opacity */
backdrop-filter: blur(10px);                       /* Adjust blur intensity */
```



## Accessibility & Performance

### Accessibility Features
- **Reduced Motion Support**: Respects `prefers-reduced-motion` media query for collision physics
- **Theme Detection**: Auto-switches between light/dark mode based on system preferences
- **Semantic HTML**: Proper heading hierarchy and navigation structure
- **Color Contrast**: WCAG AAA contrast ratios for text on all background types
- **Keyboard Navigation**: Full keyboard support for all interactive elements

### Performance Optimizations
- **Fixed Background Layer**: Canvas animation runs on separate z-index layer, doesn't block scrolling
- **GPU Acceleration**: CSS `will-change` properties and `transform3d` for smooth 60fps animations
- **RequestAnimationFrame**: Collision physics loop synced with browser refresh rate
- **Deferred Loading**: Vendor libraries loaded asynchronously
- **Static Site**: No server processing — instant load times

## Technologies Used

- **HTML5**: Semantic markup with canvas for animations
- **CSS3**: Custom properties, Glass-morphism effects, Backdrop-filter blur, Keyframe animations
- **JavaScript (ES6+)**: Collision detection (AABB algorithm), Physics simulation, Animation loops
- **Bootstrap 5**: Responsive grid system
- **Boxicons**: Technology skill icons
- **Canvas API**: Hero network background animation

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 15+ (iOS 15+, macOS 12+)
- Fallbacks included for older browsers

## Deployment

This repository is ready for static hosting:
- **GitHub Pages**: Deploy by pushing to `main` branch (automatic with GitHub Actions)
- **Netlify**: Connect repo, auto-deploys on push
- **Vercel**: Similar to Netlify, zero-config deployment
- **Firebase Hosting**: Static file upload

Current deployment: Live on GitHub Pages at custom domain (CNAME configured)

## Maintainer

- **Amos Muddy (AmosStack)**
- GitHub: https://github.com/AmosStack
- Portfolio: https://masterplanjr.netlify.app
