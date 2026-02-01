# MA-IDS Delivery - Part 1: Setup & Configuration
## Project Setup and Configuration Files

---

## 1. Package Configuration (`package.json`)

**Purpose:** Defines project dependencies, scripts, and metadata for the Node.js application.

**Key Dependencies:**
```json
{
  "name": "base44-app",
  "version": "0.0.0",
  "dependencies": {
    "react": "^18.2.0",           // Core React library
    "react-dom": "^18.2.0",       // React DOM rendering
    "@tanstack/react-query": "^5.17.15", // Data fetching and caching
    "react-router-dom": "^6.21.3", // Client-side routing
    "lucide-react": "^0.344.0",   // Icon library
    "recharts": "^2.12.0",        // Data visualization charts
    "framer-motion": "^11.0.8",   // Animation library
    "tailwindcss": "^3.4.1",      // Utility-first CSS framework
    "@radix-ui/react-dialog": "^1.0.5", // Accessible UI components
    "@radix-ui/react-dropdown-menu": "^2.0.6",
    "@radix-ui/react-select": "^2.0.0",
    "@radix-ui/react-toast": "^1.1.5",
    "clsx": "^2.1.0",             // Conditional CSS classes
    "tailwind-merge": "^2.2.1",   // Merge Tailwind classes
    "date-fns": "^3.3.1"          // Date utility functions
  },
  "devDependencies": {
    "@types/react": "^18.2.45",   // TypeScript types for React
    "@types/react-dom": "^18.2.18",
    "@vitejs/plugin-react": "^4.2.1", // Vite React plugin
    "vite": "^5.1.0",             // Fast build tool
    "eslint": "^8.55.0",          // Code linting
    "autoprefixer": "^10.4.17",   // CSS vendor prefixing
    "postcss": "^8.4.33",         // CSS processing
    "tailwindcss": "^3.4.1"       // Tailwind CSS
  }
}
```

**Build Scripts:**
```json
{
  "scripts": {
    "dev": "vite",                    // Start development server
    "build": "vite build",            // Build for production
    "preview": "vite preview",        // Preview production build
    "lint": "eslint . --ext js,jsx",  // Run ESLint
    "typecheck": "tsc --noEmit"       // TypeScript type checking
  }
}
```

---

## 2. Vite Configuration (`vite.config.js`)

**Purpose:** Configures the Vite build tool for optimal React development and production builds.

**Key Configuration:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],  // Enable React plugin for JSX support

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),  // Path alias for src directory
    },
  },

  server: {
    port: 5173,        // Development server port
    host: true,        // Allow external access
  },

  build: {
    outDir: 'dist',    // Output directory for build
    sourcemap: true,   // Generate source maps for debugging
  },

  // Environment variables
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
})
```

---

## 3. Tailwind CSS Configuration (`tailwind.config.js`)

**Purpose:** Customizes Tailwind CSS with project-specific colors, animations, and utilities.

**Key Configuration:**
```javascript
/ ** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",           // HTML entry point
    "./src/**/*.{js,ts,jsx,tsx}", // All React components
  ],

  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",     // Custom border color
        input: "hsl(var(--input))",       // Input field colors
        ring: "hsl(var(--ring))",         // Focus ring colors
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",     // Custom border radius
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "fade-in": {             // Custom fade-in animation
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-in": {            // Custom slide-in animation
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },

      animation: {
        "fade-in": "fade-in 0.5s ease-out",     // Fade-in animation
        "slide-in": "slide-in 0.3s ease-out",   // Slide-in animation
      },
    },
  },

  plugins: [],  // Additional Tailwind plugins can be added here
}
```

---

## 4. ESLint Configuration (`eslint.config.js`)

**Purpose:** Configures ESLint for code quality and consistency checks.

**Key Configuration:**
```javascript
import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist'] },  // Ignore build output directory

  {
    files: ['**/*.{js,jsx}'],  // Target JavaScript and JSX files
    languageOptions: {
      ecmaVersion: 2020,       // ECMAScript version
      globals: globals.browser, // Browser global variables
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module',   // ES modules
      },
    },

    settings: {
      react: { version: '18.3' } // React version for rules
    },

    plugins: {
      react,                    // React-specific linting rules
      'react-hooks': reactHooks, // React hooks rules
      'react-refresh': reactRefresh, // React Fast Refresh rules
    },

    rules: {
      ...js.configs.recommended.rules,     // Recommended JS rules
      ...react.configs.recommended.rules,  // Recommended React rules
      ...react.configs['jsx-runtime'].rules, // JSX runtime rules
      ...reactHooks.configs.recommended.rules, // React hooks rules

      // Custom rules
      'react/jsx-no-target-blank': 'off',  // Allow target="_blank"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },     // Allow constant exports
      ],
    },
  },
]
```

---

## 5. Component Configuration (`components.json`)

**Purpose:** Configures shadcn/ui components for consistent UI design system.

**Key Configuration:**
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",              // UI style variant
  "rsc": false,                     // Not using React Server Components
  "tsx": false,                     // Using JavaScript, not TypeScript
  "tailwind": {
    "config": "tailwind.config.js", // Tailwind config file
    "css": "src/index.css",         // CSS entry point
    "baseColor": "slate",           // Base color scheme
    "cssVariables": true,           // Use CSS variables for theming
    "prefix": ""                    // No class prefix
  },
  "aliases": {
    "components": "@/components",   // Components directory alias
    "utils": "@/lib/utils",         // Utils directory alias
    "ui": "@/components/ui",        // UI components directory alias
    "lib": "@/lib",                 // Lib directory alias
    "hooks": "@/hooks"              // Hooks directory alias
  }
}
```

---

## 6. Main CSS Entry Point (`src/index.css`)

**Purpose:** Global CSS styles and Tailwind imports.

**Key Styles:**
```css
@tailwind base;      /* Tailwind base styles */
@tailwind components; /* Tailwind component styles */
@tailwind utilities;  /* Tailwind utility classes */

@layer base {
  :root {
    --background: 222.2 84% 4.9%;    /* Dark background */
    --foreground: 210 40% 98%;      /* Light text */
    --card: 222.2 84% 4.9%;         /* Card background */
    --card-foreground: 210 40% 98%; /* Card text */
    --popover: 222.2 84% 4.9%;      /* Popover background */
    --popover-foreground: 210 40% 98%; /* Popover text */
    --primary: 217.2 91.2% 59.8%;   /* Primary blue */
    --primary-foreground: 222.2 84% 4.9%; /* Primary text */
    --secondary: 217.2 32.6% 17.5%; /* Secondary color */
    --secondary-foreground: 210 40% 98%; /* Secondary text */
    --muted: 217.2 32.6% 17.5%;     /* Muted color */
    --muted-foreground: 215 20.2% 65.1%; /* Muted text */
    --accent: 217.2 32.6% 17.5%;    /* Accent color */
    --accent-foreground: 210 40% 98%; /* Accent text */
    --destructive: 0 62.8% 30.6%;    /* Error red */
    --destructive-foreground: 210 40% 98%; /* Error text */
    --border: 217.2 32.6% 17.5%;     /* Border color */
    --input: 217.2 32.6% 17.5%;      /* Input border */
    --ring: 224.3 76.3% 94.1%;       /* Focus ring */
    --radius: 0.5rem;                /* Border radius */
  }

  * {
    @apply border-border; /* Apply border color to all elements */
  }

  body {
    @apply bg-background text-foreground; /* Background and text colors */
  }
}

@layer components {
  .glass-card {
    @apply bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(12px);
  }

  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }

  .animate-slide-in {
    animation: slide-in 0.3s ease-out;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance; /* Better text wrapping */
  }
}
```

---

## 7. HTML Entry Point (`index.html`)

**Purpose:** Main HTML file that serves as the entry point for the React application.

**Key Structure:**
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>MA-IDS - Mubarak Alnassi Intrusion Detection System</title>

    <!-- Preload fonts for better performance -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  </head>

  <body>
    <div id="root"></div>  <!-- React app will mount here -->

    <!-- Load the main JavaScript bundle -->
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

---

## 8. Main React Entry Point (`src/main.jsx`)

**Purpose:** Entry point for the React application, renders the App component.

**Key Code:**
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'  // Import global styles

// Create React root and render the App component
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

---

## Summary of Part 1

This delivery part covers the complete setup and configuration of the MA-IDS project:

- **Package Management**: Dependencies and build scripts
- **Build Tools**: Vite configuration for fast development
- **Styling**: Tailwind CSS with custom theme and animations
- **Code Quality**: ESLint configuration for consistent code
- **UI System**: shadcn/ui component configuration
- **Entry Points**: HTML and React application bootstrap

All configuration files are properly set up for a modern React application with:
- Fast development with Vite
- Beautiful UI with Tailwind CSS and glass morphism effects
- Type-safe development with ESLint
- Consistent component library with shadcn/ui

**Next Part:** Core Components (GlassCard, Sidebar, KPIMetrics)