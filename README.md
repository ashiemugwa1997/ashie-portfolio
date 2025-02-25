# Ashley Mugwambi Portfolio

A modern and interactive portfolio website showcasing my projects, skills, and professional experience as a Lead Django Developer.

## Overview

This portfolio is built with React, TypeScript, and Vite, featuring a responsive design with interactive components and smooth animations using Framer Motion. The UI is designed with Tailwind CSS and shadcn/ui components.

## Features

- **Responsive Design**: Optimized for all device sizes
- **Dark/Light Mode**: Toggle between light and dark themes
- **Interactive Project Cards**: Showcase of professional projects with filtering by technology
- **Animated UI**: Smooth transitions and micro-interactions using Framer Motion
- **Skills Section**: Visual representation of technical expertise
- **Contact Form**: Easy way for potential employers or clients to reach out
- **AI Assistant**: Interactive AI tool to help visitors navigate the portfolio
- **Performance Optimizations**:
  - Advanced lazy loading of images with Intersection Observer API
  - Low-quality image placeholders for faster perceived loading
  - Progressive image loading techniques
  - Native browser lazy loading support

## Key Projects Showcased

- **UZ Research Week Android App**: A voting and research showcase platform for the University of Zimbabwe
- **ZETDC Loadshedding System**: Web and mobile application for power outage management
- **Zvipfuwo Online Livestock Market**: Award-nominated digital marketplace for livestock
- **ZESA Drone School Management**: Comprehensive training management system for drone pilots

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **State Management**: React Hooks and Context API
- **Animations**: Framer Motion
- **UI Components**: shadcn/ui
- **Build Tool**: Vite
- **Documentation**: Postman (API documentation)

## Performance Features

The portfolio incorporates several performance optimizations:

- **Lazy Loading Images**: Images are loaded only when they enter (or approach) the viewport using Intersection Observer
- **LQIP (Low Quality Image Placeholders)**: Blurred, tiny versions of images are displayed while the full image loads
- **Progressive Loading**: Images smoothly fade in as they load to improve perceived performance
- **Image Error Handling**: Graceful fallbacks when images fail to load
- **Optimized Resource Loading**: Appropriate loading priorities for different types of images
- **Responsive Image Loading**: The correct image size is loaded based on device needs

## Getting Started

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd ashie-portfolio

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Deployment

The portfolio is designed to be easily deployed to various platforms such as Vercel, Netlify, or GitHub Pages.

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
