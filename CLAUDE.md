# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Adwola is a React-based SPA (Single Page Application) built with Vite, featuring a modern marketing website with integrated authentication and contact management. The project uses Supabase for backend services, Tailwind CSS for styling, and Radix UI components.

## Company Info

- **Company name**: Adwola
- **Legal entity**: LEVER N GEAR LTD.
- **Address**: Lane 5, House-336, Baridhara DOHS, Dhaka Cantonment, Dhaka 1206
- **Email**: nahar@adwola.com

## Logo & Branding

- **Primary logo** (header & footer): `public/slazzer-preview-p3nef.png` — transparent RGBA PNG, use `className="h-10 w-auto"`
- **Favicon** (icon only): `public/2-remove-background.com.png` — transparent RGBA PNG, referenced in `index.html`
- **Brand color**: `#C5A23E` (gold)
- **Background color**: `#1A1A2E` (dark navy)

## Project Setup & Commands

### Installation
```bash
bun install
```

### Development
```bash
bun run dev
```
- Runs the dev server on `http://localhost:3000` (or `::1:3000` for IPv6)
- Includes hot module reloading and all Vite dev plugins

### Build
```bash
bun run build
```
- Runs `tools/generate-llms.js` to extract page metadata (routes, titles, descriptions) into `public/llms.txt`
- Then builds with Vite to `dist/` directory

### Linting
```bash
bun run lint
```
- Uses ESLint with React and import plugins
- Run with `--quiet` flag to suppress warnings
- Key disabled rules: `react/prop-types`, unused vars, many React 17+ rules (since `React` import isn't needed)
- Critical enabled: `no-undef`, `import/no-self-import` to catch runtime errors

### Preview
```bash
bun run preview
```
- Previews production build locally on `http://localhost:3000`

## Architecture

### Routing & Pages
- **Router**: React Router v6 (`BrowserRouter`)
- **Route structure** (defined in `src/App.jsx`):
  - `/` → `HomePage`
  - `/services` → `ServicesPage`
  - `/about` → `AboutPage`
  - `/case-studies` → `CaseStudiesPage`
  - `/contact` → `ContactPage`
- All page components use React Helmet for SEO (title, meta tags)
- `ScrollToTop` component handles scroll restoration on route changes

### Directory Structure
```
src/
├── App.jsx                    # Main router and layout
├── main.jsx                   # React entry point
├── index.css                  # Global styles
├── components/
│   ├── ui/                    # Radix UI component wrappers (button, toast, etc.)
│   ├── Header.jsx             # Navigation header
│   ├── Footer.jsx             # Site footer
│   ├── HeroImage.jsx          # Hero section image
│   ├── CallToAction.jsx       # CTA component
│   ├── TestimonialsCarousel.jsx # Testimonials carousel (uses embla-carousel)
│   ├── WelcomeMessage.jsx     # Welcome messaging
│   └── ScrollToTop.jsx        # Scroll restoration on route change
├── pages/                     # Page components with Helmet
│   ├── HomePage.jsx
│   ├── ServicesPage.jsx
│   ├── AboutPage.jsx
│   ├── CaseStudiesPage.jsx
│   └── ContactPage.jsx
├── contexts/
│   └── SupabaseAuthContext.jsx # Auth state provider
├── lib/
│   ├── supabaseClient.js      # Supabase client initialization
│   ├── customSupabaseClient.js # Custom Supabase utilities
│   └── utils.js               # General utilities (likely cn() for classNames)
└── plugins/                   # Vite plugins for dev features
    ├── visual-editor/         # Visual inline editing (dev-only)
    ├── selection-mode/        # Selection mode UI (dev-only)
    ├── utils/                 # Plugin utilities
    └── vite-plugin-iframe-route-restoration.js

tools/
└── generate-llms.js           # Extracts Helmet metadata to public/llms.txt (for LLM context)
```

### Key Dependencies

**UI & Components**
- `@radix-ui/*`: Accessible component primitives (20+ packages)
- `framer-motion`: Animation library
- `embla-carousel-react`: Carousel component
- `lucide-react`: Icon library
- `tailwindcss`: CSS framework

**Form Handling & Validation**
- `react-hook-form`: Form state management
- `@hookform/resolvers`: Validation adapters
- `zod`: Schema validation library

**Utilities**
- `react-router-dom`: SPA routing
- `react-helmet`: SEO meta tags
- `sonner`: Toast notifications
- `date-fns`: Date utilities
- `class-variance-authority`: Class composition utilities
- `clsx` + `tailwind-merge`: Conditional class management

**Backend**
- `@supabase/supabase-js`: Supabase SDK (auth, database, real-time)

### Supabase Integration

- **Config**: Environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`
- **Auth Context**: `SupabaseAuthContext.jsx` manages session state globally
  - Provides `user`, `session`, `loading`, `signUp()`, `signIn()`, `signOut()` via context hook
  - Listens to auth state changes automatically
- **Client usage**: Import `supabase` from `@/lib/supabaseClient` to interact with database/auth
- **Contact form** (ContactPage) submits to Supabase table
- **Calendly widget** embedded in contact page

### Styling

- **Tailwind CSS**: Configured in `tailwind.config.js`
- **CSS**: Global styles in `src/index.css`
- **Component approach**: UI components use Radix UI with Tailwind classes
- **Utilities**: `cn()` function likely in `lib/utils.js` for merging classNames

### Vite Configuration Details

**Dev plugins** (development only):
- `inlineEditPlugin()`: Visual inline editing capability
- `editModeDevPlugin()`: Edit mode toggle
- `iframeRouteRestorationPlugin()`: Handles route restoration in iframes
- `selectionModePlugin()`: Selection mode UI

**Error handling**: Vite config patches error reporting to post errors to parent window (for iframe contexts)

**Build config**: External dependencies defined to not bundle Babel parser/generator/types/traverse

## Development Notes

### Code Style
- ESLint enforces consistent code patterns
- Disable `console.warn` in Vite config (custom logger suppresses CSS warnings)
- Import alias `@` maps to `src/` directory

### Form Validation
- Pages use `react-hook-form` with `zod` schemas
- Example: ContactPage validates name, email, company, service, message

### Toast Notifications
- Use `useToast()` hook from `@/components/ui/use-toast`
- `Toaster` component rendered in both `main.jsx` and `App.jsx` (dual render is intentional)

### SEO
- Every page component wraps header content in `<Helmet>`
- Build process extracts titles/descriptions via `tools/generate-llms.js`
- Output stored in `public/llms.txt` for LLM context

### Testing
- No test runner configured; add Jest/Vitest as needed
- Lint before commits: `bun run lint`

## Common Development Tasks

### Adding a new page
1. Create component in `src/pages/FileName.jsx`
2. Add `<Route path="/route" element={<FileName />} />` in `App.jsx`
3. Add Helmet tags (title, meta description) for SEO
4. Import and export the component

### Creating a form
1. Use `react-hook-form` with `useForm()` hook
2. Define validation schema with `zod`
3. Handle submission with Supabase client
4. Show feedback with toast notifications

### Adding Radix UI component
1. Import from `src/components/ui/ComponentName.jsx`
2. These are already set up with Tailwind styling
3. Customize classes as needed with Tailwind utilities

## Environment & Deployment

- **Node version**: `.nvmrc` specifies `18.x` or similar (check `.nvmrc` file)
- **Supabase**: Uses public anon key (safe for frontend)
- **Build output**: `dist/` directory
- **Static assets**: `public/` directory
