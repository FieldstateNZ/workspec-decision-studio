import { defineConfig } from 'vitest/config';

// Workspace-root Vitest config. Each package contributes a project via its own
// vitest.config.ts; `vitest run` here executes them all, while `pnpm -r test`
// runs each package in isolation.
export default defineConfig({
  test: {
    projects: ['packages/*'],
  },
});
