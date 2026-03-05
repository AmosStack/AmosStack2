# Amos Muddy Portfolio

Modern personal portfolio website for **Amos Muddy** built as a static site.

## Overview

This project is a customized portfolio based on a Bootstrap-style layout, modernized with:
- Updated visual design system
- Animated Hero node-network background
- Projects card section
- Light/Dark mode toggle with persistence
- Accessibility fixes for skill progress bars

## Features

- Responsive sidebar navigation
- Animated Hero section (`canvas` network)
- About, Projects, Skills, Resume, Contact sections
- Project cards with image + Demo + GitHub links
- Theme toggle (`Light/Dark`) saved in `localStorage`
- Smooth scrolling and section highlighting

## Project Structure

```text
.
├── index.html
├── CNAME
└── assets
    ├── css
    │   └── style.css
    ├── js
    │   └── main.js
    ├── img
    │   ├── hero-bg.jpg
    │   ├── logo.png
    │   ├── LOGO.jpg
    │   └── profile-img.jpeg
    └── vendor
```

## Run Locally

Because this is a static site, you can run it with any static server.

### Option 1: VS Code Live Server
1. Open the folder in VS Code.
2. Start **Live Server** on `index.html`.

### Option 2: Python HTTP server
```bash
python -m http.server 8000
```
Then open: `http://localhost:8000`

## Customization Guide

### 1) Personal info
Edit content in:
- `index.html` (About, Resume, Contact, footer details)

### 2) Project cards
In `index.html` under `#projects`:
- Replace each card `href="#"` with real Demo and GitHub URLs.
- Replace `assets/img/hero-bg.jpg` with real project screenshots.

### 3) Theme styling
Edit theme tokens in:
- `assets/css/style.css` under `:root` and `body.dark-mode`

### 4) Hero animation
Edit animation behavior in:
- `assets/js/main.js` (function that initializes `#hero-network`)

## Accessibility Notes

Recent fixes include:
- Added accessible names to all `role="progressbar"` elements.
- Added labels/titles for icon-only social links and controls.

## Deployment

This repository is ready for static hosting (e.g., GitHub Pages, Netlify, Vercel static).

## Maintainer

- **Amos Muddy (AmosStack)**
- GitHub: https://github.com/AmosStack
