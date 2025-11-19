# Project Crayon

<img src="assets/images/crayon.png" width="180" alt="Project Crayon Mascot">

> **An Independent Game Developer and Digital Publisher specializing in retro game porting, software emulation, and FPGA solutions.**

## 🛠️ Tech Stack

This website is built with a focus on performance, accessibility, and modern CSS techniques without heavy frameworks.

- **HTML5**: Semantic structure optimized for accessibility and SEO.
- **CSS3**: 
  - **Glassmorphism**: `backdrop-filter` and translucent backgrounds.
  - **Layout**: Extensive use of CSS Grid and Flexbox.
  - **Animations**: CSS transitions and keyframe animations for parallax and hover effects.
  - **Variables**: CSS Custom Properties for theming.
- **Vanilla JavaScript**: 
  - **IntersectionObserver**: For efficient scroll-triggered animations.
  - **DOM Manipulation**: Lightweight interaction logic for the mobile menu and mascots.
  - **No Dependencies**: Zero external runtime libraries.

## 🚀 Local Development

Since this is a static website, deployment and local testing are straightforward.

### Prerequisites
- A web browser
- A local static server (recommended for correct asset loading)

### Quick Start

1.  **Clone the repository**
    ```bash
    git clone https://github.com/projectcrayon/projectcrayon.github.io.git
    cd projectcrayon.github.io
    ```

2.  **Start a local server**
    
    *Using Python:*
    ```bash
    python -m http.server 8000
    ```

    *Using Node.js:*
    ```bash
    npx http-server .
    ```

3.  **View the site**
    Open `http://localhost:8000` in your browser.

## 🎨 Design Implementation

The design focuses on a "retro-modern" aesthetic:

- **Parallax Hero**: A multi-layered CSS/JS parallax effect in the hero section (`.hero__scene`).
- **Interactive Elements**: Mascots like the "Crayon" and "Kintaro" have interactive states triggered by click or keyboard events.
- **Responsive**: Fluid typography (`clamp()`) and grid layouts adapt to any screen size.

## 🌌 About Project Crayon

Project Crayon bridges the gap between retro nostalgia and modern platforms. We are passionate about preserving gaming history and creating new experiences that feel like classics.

**Core Expertise:**
- **Software Emulation**
- **Reverse Engineering**
- **FPGA Emulation**

## 🕹️ Current Projects

- **Arcana Mundi**: A story-driven tactical RPG.
- **Mystic Seals**: A cooperative puzzle adventure.

## 📄 License

Copyright © **Project Crayon LLC** 2024. All rights reserved.
