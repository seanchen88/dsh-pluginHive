# Third-party notices

The source in this repository is licensed under the **MIT License** (see [LICENSE](LICENSE)).
Some redistributed material is **not** MIT and is listed here. This file is the place to
look when re-licensing, redistributing, or shipping a derived build.

## 1. Bundled MCP catalog data — Apache-2.0 / community catalog

`packages/mcp-market-panel/src/client/local-catalog-data.ts` is a **generated** file: run
`pnpm gen:catalog` (→ `scripts/gen-local-catalog.mjs`) to rebuild it. Its input is
`servers.json` as vendored by an MCP Hub deployment, which is licensed under the
**Apache License 2.0**. The underlying records are the community
[MCPM](https://mcpm.sh) directory of MCP servers.

- Only fields the market UI renders were kept; per-server `tools` JSON schemas (>1 MB of the
  original 2.4 MB) and long prose were dropped or truncated.
- The provenance header inside the generated file repeats this attribution, and the generator
  rewrites it on every run — do not strip it.
- Apache-2.0 is a permissive license that requires preserving notices; it is compatible with
  redistributing this derived dataset inside an MIT project as long as this notice stays.
- The upstream data may itself contain content with other terms. Individual server entries
  describe third-party software whose license is stated in the entry (`repository`, `license`).

If you redistribute a build that embeds this catalog, keep this file and the header in the
generated module.

## 2. Runtime dependencies shipped inside the browser bundles

The client half of each panel is bundled into a single self-contained `lib/client.js`
(the harness module table cannot resolve bare specifiers at runtime), so these packages are
**redistributed inside our bundle** rather than fetched by the consumer:

| Package | Version | License | Where |
|---|---|---|---|
| [`zod`](https://github.com/colinhacks/zod) | 3.25.76 | MIT | inlined into `mcp-panel` / `skill-panel` client bundles (Remote argument codecs) |
| [`clsx`](https://github.com/dcastil/clsx) | 2.1.1 | MIT | inlined via `plugin-kit` (class composition) |
| [`yaml`](https://github.com/eemeli/yaml) | 2.9.1 | ISC | host half dependency of `mcp-panel`, resolved from the installed tree (not inlined) |
| [`fflate`](https://github.com/101arrowz/fflate) | 0.8.3 | MIT | host half dependency of `skill-panel` (zip import), resolved from the installed tree |

Their own license texts ship in the installed `node_modules` of a full checkout
(`node_modules/.pnpm/<pkg>@<version>/.../LICENSE`).

## 3. Peer dependencies — the DeepSeek Harness

`@deepseek-ai/*` packages are **not** vendored or bundled. They are resolved at runtime from a
local DeepSeek Harness checkout (see [README](README.md#prerequisites)), and are declared as
peer dependencies only. Client bundles are gated at build time to make sure no harness client
package is inlined.

## 4. Generated Remote artifacts

`packages/*/lib/typert.*` are code generated from this repository's own `@Remote` signatures by
the harness typert generator. They are committed so a plain clone stays buildable without a
harness checkout, and are covered by this repository's MIT license.
