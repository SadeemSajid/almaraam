# AGENTS.md

## Essential Commands

Build and lint:

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview production build

Linting and formatting:

- `npm run lint` - Run Prettier check and ESLint
- `npm run format` - Fix formatting with Prettier

Testing:

- `npm test` - Run all tests (unit + integration)
- `npm run test:unit` - Run Vitest unit tests
- `npm run test:integration` - Run Playwright integration tests
- `npx vitest run <path/to/test.ts>` - Run single unit test
- `npx vitest <path/to/test.ts>` - Watch single test

Type checking:

- `npm run check` - Type check Svelte code
- `npm run check:watch` - Watch for type errors

## Code Style Guidelines

### Formatting

- Use tabs, single quotes, no trailing commas
- Line width: 100 characters
- Prettier handles formatting automatically

### UI Components

- **DaisyUI**: Primary component library for UI elements (buttons, alerts, inputs, etc.)
- **Skeleton Loading**: Use DaisyUI skeleton components (`skeleton` class) for loading states
- **Theming**: DaisyUI handles theming via `theme` attribute and CSS variables
- **Responsive**: DaisyUI components support responsive design patterns
- **Layout**: Use DaisyUI layout utilities (flex, grid, spacing) alongside TailwindCSS
- **Style**: Everything in this app is based on text and links, do not use icons and images

### TypeScript Configuration

- Strict mode enabled
- `sourceMap: true`
- Types from `unplugin-icons/types/svelte` available
- Use explicit type annotations for function parameters and returns

### Import Statements

- `$lib` alias for src/lib imports: `import Component from '$lib/components/Component.svelte'`
- $app imports: `import { goto } from '$app/navigation'`
- Svelte imports: `import { onMount } from 'svelte'`
- Group imports by source (Svelte, $app, local components)

### Svelte Components

- Add `<script lang="ts">` for TypeScript
- Use `export let` for component props
- Use `createEventDispatcher` for component events
- Define explicit types for props and variables

### API Routes

- Use `+server.ts` files in route directories
- Export `GET`, `POST`, etc. functions
- Use `json()` from `@sveltejs/kit` for responses
- Wrap code in try-catch, log errors with console.log
- Example pattern:

  ```ts
  export const GET = async () => {
   try {
    const data = await something();
    return json({ data });
   } catch (error) {
    console.log('Error:', error);
   }
  };
  ```

### Data Models

- Use Supabase tables instead of Mongoose schemas
- Define types in src/lib/types/types.ts for type safety
- Import types from `@supabase/supabase-js` for database queries
- Tables should include timestamps (created_at, updated_at)

### Error Handling

- Use try-catch for async operations
- Log errors with console.log or console.error
- Return appropriate HTTP responses
- Show UI error messages (e.g., Alert component)

### Test Configuration

- Unit tests: `src/**/*.test.{js,ts}` pattern
- Use Vitest with `describe`, `it`, `expect`
- Test files in src directory for Vitest
- Use Playwright for end-to-end tests

### Server-Side Code

- Use `+page.server.ts` for load functions
- Access params via destructuring: `const { id } = params`
- Return data objects

### Database

- Use `supabase` client from `src/lib/supabaseClient.ts`
- Import: `import { supabase } from '$lib/supabaseClient'`
- Query data using Supabase methods: `supabase.from('table').select()`
- Use `.eq()`, `.order()`, `.limit()` for filtering and sorting
- Handle real-time subscriptions with `supabase.channel()`

### Component Props

- Export let at top of script
- Provide default values for optional props
- Use descriptive names (e.g. `articleId`, `createdAt`)

### Utilities

- Pure functions for formatting and data transformation
- Located in src/lib/utils/
- Export named functions

### Comments

- Minimal comments
- Only clarify complex logic
- TODO comments for pending tasks

## Update Tasks (Necessary)

- Please update docs/arch.md for any architectural changes

## Git Commit Guidelines

- Please follow docs/git-conventions.md for git commit style guide (very important)
