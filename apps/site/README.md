# @workspec/site

The product site + in-browser demo for **WorkSpec Decision Studio**, served from
this repo's GitHub Pages at `decision-studio.workspec.io`.

- **`/`** — the marketing page: positioning, the `npx` quickstart, the schema /
  IntelliSense story, and the open-core model.
- **`/demo`** — the full studio (Options / Compare / Catalog / ADR) running
  entirely in the browser against a `MemoryRepository` seeded with both worked
  examples. Toggle levers, edit costs, decide, and **Export ADR** — nothing
  leaves the page.

## Why it depends on the registry, not the workspace

Unlike the other workspace packages, this app depends on the **published**
`@workspec/*` versions from npm (see `package.json` — concrete versions, not
`workspace:*`). The root `.npmrc` sets `link-workspace-packages=false`, so pnpm
installs them from the registry and the lockfile records the registry tarballs.

That makes the site a **living integration test of the published artifacts**: if
`pnpm --filter @workspec/site build` succeeds, the packages work for a stranger
running `npm install`. The vendored `src/examples/*.yaml` are a verbatim copy of
the repo's `examples/`, and validate against the published schema's `apiVersion`.

## Develop

```bash
pnpm --filter @workspec/site dev       # vite dev server
pnpm --filter @workspec/site build     # static build → apps/site/dist (+ 404.html SPA fallback)
pnpm --filter @workspec/site preview    # preview the production build
```

## Deployment (pending)

Publishing to `decision-studio.workspec.io` via `pages.yml` is **not wired up
yet**: this repo's Pages slot currently serves the JSON Schemas at
`schema.workspec.io`. Per issue #5, the site only claims the Pages slot once
schema hosting has moved to its own repo (`FieldstateNZ/workspec-schemas#1`), so
the CNAME cutover and the `pages.yml` switch land in a follow-up.
