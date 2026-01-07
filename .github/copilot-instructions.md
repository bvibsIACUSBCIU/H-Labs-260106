# H Labs Ecosystem OS - AI Agent Instructions

## Architecture Overview

This is a **dual-mode React/TypeScript application** built with Vite, featuring two completely independent systems:

1. **Landing Site** (`landing/`) - Marketing website with sections for services, cases, partners
2. **Terminal Dashboard** (`dashboard/`) - Internal control center with real-time market data, KOL portal, bounty hall, academy, and fund management

**Key Decision**: Originally a 1144-line monolithic `App.tsx`, now refactored into 20+ modular files for independent development and maintenance. The `App.tsx` now serves ONLY as a router between these two systems via `ViewState` ('landing' | 'terminal').

## Critical Files & Data Flow

```
App.tsx (24 lines) → routes to:
  ├── landing/LandingPage.tsx → aggregates 7 section components
  └── dashboard/Dashboard.tsx → aggregates 5 view components

Shared infrastructure:
  ├── i18n.ts → All translations (en/zh) in one object
  ├── types.ts → All TypeScript interfaces (140 lines)
  ├── constants.ts → Market data, cases, alerts (149 lines)
  └── components/ → Reusable UI (TickerTape, TerminalHeader, SectionCard)
```

## Styling Conventions

**Tailwind via CDN** - NO separate CSS files. All styling is inline with Tailwind classes.

### Project-Specific Patterns:
- **Terminal aesthetic**: Use `font-mono`, `border-${color}-900/30`, `bg-slate-950` for dashboard views
- **Landing pages**: Use `bg-gradient-to-br`, `backdrop-blur-md`, lighter slate tones
- **Color coding by feature**:
  - War Room: `red-500` / `red-900`
  - KOL Portal: `purple-500` / `purple-900`
  - Bounty Hall: `emerald-500` / `emerald-900`
  - Academy: `blue-500` / `blue-900`
  - Fund: `yellow-500` / `yellow-900`

### Animation Classes (defined in `index.html`):
```js
'animate-[scroll_30s_linear_infinite]' // Ticker tape scrolling
'animate-in fade-in duration-500'       // View transitions
'animate-pulse'                          // Live indicators
```

## Internationalization Pattern

**All text must be in `i18n.ts`**, NOT hardcoded in components. Components receive `lang` prop and `translations` object:

```tsx
// ✅ Correct
const t = translations[lang].dashboard.war_room;
<h2>{t.title}</h2>

// ❌ Never do this
<h2>WAR ROOM TERMINAL</h2>
```

### Adding New Text:
1. Add to both `en` and `zh` objects in `i18n.ts`
2. Pass `translations={translations}` to component
3. Extract text with `const t = translations[lang].section`

**Exception**: For formatting with JSX (like `<br/>` or `<span>`), render conditionally in the component based on `lang` (see `LandingHero.tsx` lines 26-47).

## Adding New Features

### New Landing Section:
```tsx
// 1. Create landing/NewSection.tsx
export const NewSection = ({ lang, translations }: { lang: Language, translations: any }) => {
  const t = translations[lang].newSection;
  return <div>...</div>;
};

// 2. Add translations to i18n.ts
en: { newSection: { title: "...", desc: "..." } }
zh: { newSection: { title: "...", desc: "..." } }

// 3. Import and use in landing/LandingPage.tsx
<NewSection lang={lang} translations={translations} />
```

### New Dashboard View:
```tsx
// 1. Create dashboard/NewView.tsx with TerminalHeader
export const NewView = ({ lang, translations }) => {
  const t = translations[lang].dashboard.newView;
  return (
    <div className="animate-in fade-in duration-500">
      <TerminalHeader title={t.title} subtitle={t.subtitle} color="cyan" />
      {/* content */}
    </div>
  );
};

// 2. Add to types.ts TabState union
export type TabState = '...' | 'new_view';

// 3. Update Dashboard.tsx routing
{activeTab === 'new_view' && <NewView lang={lang} translations={translations} />}

// 4. Add menu item in DashboardSidebar.tsx menuItems array
{ id: 'new_view', label: t.new_view, icon: IconName }
```

## Constants & Data Management

**All static data lives in `constants.ts`**. Export typed arrays:

```typescript
// Define interface in types.ts first
export interface NewDataType { ... }

// Then export data in constants.ts
export const newData: NewDataType[] = [...];

// Import where needed
import { newData } from '../constants';
```

**Real-time data**: Currently mocked. For live APIs, add fetch logic in dashboard views, NOT in constants.

## Component Patterns

### Responsive Design:
- Desktop sidebar: `hidden md:flex w-20 md:w-64`
- Mobile nav: `md:hidden fixed bottom-0`
- Content padding: `p-4 md:p-8`
- Grid responsive: `grid-cols-1 md:grid-cols-3 lg:grid-cols-4`

### Icon Usage (Lucide React):
```tsx
import { IconName } from 'lucide-react';
<IconName size={24} className="text-indigo-400" />
```

All icons already imported in components. Check existing imports before adding new ones.

## Development Workflow

```bash
npm install          # First time setup
npm run dev          # Start dev server on localhost:3000
npm run build        # Production build
npm run preview      # Preview production build
```

**No tests configured** - Add Jest/Vitest if needed.

## Common Pitfalls

1. **Dynamic Tailwind classes don't work**: `border-${color}-900` requires full class names. Use string templates or conditional rendering.
2. **JSX in i18n.ts fails**: TypeScript can't parse JSX in .ts files. Render conditionally in components instead.
3. **Missing translations**: Always add to BOTH `en` and `zh` objects. App will crash if key missing.
4. **State in wrong place**: `ViewState` only in App.tsx. `TabState` only in Dashboard.tsx. Don't lift unnecessarily.

## Key Dependencies

- **React 19.2.3** - Latest with concurrent features
- **Lucide React** - Icon library (400+ icons available)
- **Vite 6.2** - Build tool with HMR
- **TailwindCSS** - Via CDN, NOT npm package

No routing library - manual state-based routing. No state management library - React useState only.

---

**Questions?** Check `PROJECT_STRUCTURE.md` for detailed module explanations or specific component examples in their respective directories.
