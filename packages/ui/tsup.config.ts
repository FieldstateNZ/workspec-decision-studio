import { defineConfig } from 'tsup';

// Library build: ESM + types for the JS entry. `dist/styles.css` is NOT built
// here — the package.json build script chains @tailwindcss/cli over
// `src/index.css` (the Tailwind entry that composes the WorkSpec preset, the
// utilities the adopted @workspec/design components need, and the bespoke
// component styles), because the stylesheet now requires a Tailwind compile.
// React and TanStack Query are the host's — externalised so the remote (S6)
// and standalone hosts share single instances and no framework is bundled in.
// @workspec/design stays a regular dependency (tsup auto-externals deps).
export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: { entry: 'src/index.ts' },
  clean: true,
  sourcemap: true,
  external: ['react', 'react-dom', 'react/jsx-runtime', '@tanstack/react-query'],
});
