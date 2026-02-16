# Almaraam Architecture

## Overview

Almaraam is a content management system built with SvelteKit, Supabase, and TailwindCSS with DaisyUI. It serves articles and author information with a clean, responsive design.

## Technology Stack

### Frontend

- **Framework**: SvelteKit (v4.x)
- **UI Library**: DaisyUI with TailwindCSS
- **Icons**: unplugin-icons
- **Markdown Rendering**: markdown-it with markdown-it-footnote

### Backend

- **Database**: Supabase (PostgreSQL)
- **API**: SvelteKit API Routes
- **Client**: @supabase/supabase-js

### Development

- **TypeScript**: Strict mode enabled
- **Testing**: Vitest (unit), Playwright (E2E)
- **Linting**: ESLint, Prettier

## Project Structure

```
almaraam/
├── src/
│   ├── lib/
│   │   ├── components/        # Reusable Svelte components
│   │   │   ├── Alert.svelte          # Error/alert notifications
│   │   │   ├── ArticleListing.svelte # Article preview card
│   │   │   ├── Drawer.svelte        # Mobile drawer navigation
│   │   │   ├── Markdown.svelte     # Markdown content renderer
│   │   │   └── Navbar.svelte        # Top navigation bar
│   │   ├── types/
│   │   │   └── types.ts             # TypeScript type definitions
│   │   ├── utils/
│   │   │   ├── cutExcerpt.ts        # Text excerpt utility
│   │   │   ├── formatDate.ts        # Date formatting
│   │   │   └── markdownGen.ts       # Markdown to HTML conversion
│   │   └── supabaseClient.ts        # Supabase client configuration
│   ├── routes/                    # SvelteKit file-based routing
│   │   ├── api/                    # API endpoints
│   │   │   ├── article/
│   │   │   │   └── fetch/
│   │   │   │       ├── [id]/+server.ts      # Fetch article by ID
│   │   │   │       ├── all/+server.ts      # Fetch all articles
│   │   │   │       └── home/+server.ts     # Fetch recent articles
│   │   │   └── author/
│   │   │       └── fetch/[id]/+server.ts  # Fetch author by ID
│   │   ├── article/
│   │   │   └── [id]/
│   │   │       ├── +page.server.ts  # Server-side data loading
│   │   │       └── +page.svelte      # Article display component
│   │   ├── +layout.svelte           # App-wide layout
│   │   └── +page.svelte             # Homepage with article listings
│   ├── app.css                      # Global styles and Tailwind directives
│   └── hooks.server.ts              # Server-side hooks
├── docs/
│   ├── arch.md                      # Architecture documentation (this file)
│   └── schema.sql                   # Database schema reference
├── static/                          # Static assets
├── package.json                     # Dependencies and scripts
├── svelte.config.js                 # Svelte configuration
├── tailwind.config.js               # TailwindCSS configuration
└── tsconfig.json                    # TypeScript configuration
```

## Data Flow

### Article Retrieval Flow

1. **Client Request**: User navigates to an article page
2. **Server Load**: `+page.server.ts` extracts article ID from URL params
3. **Component Mount**: `+page.svelte` uses `onMount` to fetch article data
4. **API Call**: Fetch request to `/api/article/fetch/{id}`
5. **Supabase Query**: API route queries Supabase `articles` table
6. **Response**: Returns article data as JSON
7. **Render**: Article is displayed with author information

### Homepage Flow

1. **Page Load**: User lands on homepage
2. **Component Mount**: `+page.svelte` triggers on `onMount`
3. **API Call**: Fetch request to `/api/article/fetch/home`
4. **Supabase Query**: Fetches 10 most recent articles, ordered by date
5. **Skeleton Loading**: Shows loading skeleton while data fetches
6. **Response**: Displays article listings with titles, dates, and excerpts

### Author Data Flow

1. **Article Load**: Article is fetched with `author_id`
2. **Secondary API Call**: Fetch request to `/api/author/fetch/{author_id}`
3. **Supabase Query**: Queries `authors` table by ID
4. **Response**: Returns author name and metadata
5. **Display**: Author info shown alongside article content

## Database Schema

### Articles Table

- `id` (UUID, Primary Key)
- `title` (text)
- `content` (text - Markdown)
- `tags` (text)
- `author_id` (UUID, Foreign Key → authors.id)
- `excerpt` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### Authors Table

- `id` (UUID, Primary Key)
- `name` (text)
- `email` (text)
- `contact` (text)
- `description` (text)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## API Routes

### GET /api/article/fetch/:id

Returns a single article by ID.

### GET /api/article/fetch/all

Returns all articles, ordered by date descending.

### GET /api/article/fetch/home

Returns the 10 most recent articles.

### GET /api/author/fetch/:id

Returns author information by ID.

## Component Architecture

### Layout Components

- **Navbar**: Top navigation with drawer toggle
- **Drawer**: Side navigation for mobile/responsive view

### UI Components

- **Alert**: Modal alert for errors and notifications
- **ArticleListing**: Compact article preview card
- **Markdown**: Renders Markdown content with formatting

### State Management

- Uses Svelte's reactive system with `export let` for props
- No external state management library
- Local component state for loading states and data

## Styling Approach

### Design System

- **Framework**: TailwindCSS
- **Component Library**: DaisyUI
- **Typography**: Bitter (headings), Georgia (body), Arabic font (Arabic text)
- **Color Scheme**: Primary (background), Secondary (text), Accent (highlights)
- **Borders**: 2px solid
- **Spacing**: Consistent use of margins and gaps throughout

### Responsive Design

- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Desktop content max-width: `calc(100vw - 640px)` (with 80px side margins)

### Loading States

- DaisyUI skeleton components for loading feedback
- Skeletons match content structure and styling
- Loading indicators disappear once data is available

## Key Patterns

### API Route Pattern

```typescript
export const GET = async ({ params }) => {
	try {
		const { data, error } = await supabase.from('table').select('*').eq('id', id).single();
		if (error) throw error;
		return json({ data });
	} catch (error) {
		console.error('Error:', error);
		return json({ data: null });
	}
};
```

### Data Loading Pattern

```typescript
let loading = true;
let data;

onMount(async () => {
	const res = await fetch('/api/endpoint');
	if (res.ok) {
		data = (await res.json()).data;
	}
	loading = false;
});
```

### Type Safety

- All data models defined in `src/lib/types/types.ts`
- Explicit TypeScript annotations for functions and components
- Leverages Supabase-generated types when available

## Performance Considerations

1. **Lazy Loading**: Article content fetched only when page is mounted
2. **Optimized Queries**: Supabase queries use `.limit()`, `.order()`, and `.eq()` for efficiency
3. **Skeleton UI**: Improves perceived performance with loading states
4. **Static Generation**: SvelteKit supports pre-rendering static pages

## Security

1. **Environment Variables**: Database credentials stored in `.env` files (never committed)
2. **API Routes**: Server-side route handlers protect database queries
3. **CORS**: Configured appropriately for your domain
4. **XSS Prevention**: `{@html}` used sparingly with ESLint disable comments

## Future Enhancements

1. **Real-time Updates**: Implement Supabase real-time subscriptions
2. **SEO Optimization**: Add meta tags, Open Graph tags, sitemap
3. **Search Functionality**: Implement full-text search
4. **Content Management**: Admin interface for creating/editing articles
5. **Comments System**: Add commenting functionality
6. **Image Optimization**: Add image uploads and CDN
7. **Analytics**: Integrate analytics for content engagement
8. **PWA Support**: Add service workers for offline capabilities
