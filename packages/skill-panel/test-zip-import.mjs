/**
 * Runtime verification for the security-critical skill zip importer.
 *
 * zip-import.ts depends only on node builtins + fflate (no harness packages),
 * so it can be compiled and exercised standalone. Run from the repo root:
 *   node_modules/.bin/tsc packages/skill-panel/src/zip-import.ts packages/skill-panel/src/types.ts \
 *     --outDir packages/skill-panel/.tmp-build --rootDir packages/skill-panel/src \
 *     --module esnext --moduleResolution bundler --target es2022 \
 *     --allowImportingTsExtensions --rewriteRelativeImportExtensions --skipLibCheck
 *   node packages/skill-panel/test-zip-import.mjs
 *
 * Placed under packages/skill-panel so `fflate` (a per-package dep) resolves.
 */
import { mkdtempSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { zipSync, strToU8 } from 'fflate'

const { importSkillZip } = await import('./.tmp-build/zip-import.js')

let pass = 0
let fail = 0
function check(name, condition) {
  if (condition) { pass++; console.log(`  ok   ${name}`) }
  else { fail++; console.log(`  FAIL ${name}`) }
}

const skillMd = '---\nname: demo-skill\ndescription: A demo skill for tests.\n---\n\n# Demo\nBody.\n'
const workRoot = mkdtempSync(join(tmpdir(), 'dsh-skill-test-'))
const scope = { kind: 'workspace', cwd: workRoot }

// 1. valid zip with SKILL.md at root
{
  const zip = zipSync({ 'SKILL.md': strToU8(skillMd) })
  const res = await importSkillZip(zip, scope, false)
  check('valid zip -> imported', res.status === 'imported' && res.name === 'demo-skill')
  check('file written under .agents/skills/demo-skill',
    existsSync(join(workRoot, '.agents', 'skills', 'demo-skill', 'SKILL.md')))
}

// 2. valid zip nested under a single top-level directory
{
  const zip = zipSync({ 'demo-nested/SKILL.md': strToU8(skillMd.replace('demo-skill', 'nested-skill')) })
  const res = await importSkillZip(zip, scope, false)
  check('nested-dir zip -> imported', res.status === 'imported' && res.name === 'nested-skill')
  check('nested file written under nested-skill',
    existsSync(join(workRoot, '.agents', 'skills', 'nested-skill', 'SKILL.md')))
}

// 3. zip-slip: an entry escaping the destination
{
  const zip = zipSync({
    'SKILL.md': strToU8(skillMd.replace('demo-skill', 'slip-skill')),
    '../../evil.txt': strToU8('pwned'),
  })
  const res = await importSkillZip(zip, scope, false)
  check('zip-slip rejected as invalid', res.status === 'invalid')
  check('no evil file escaped the skills root', !existsSync(join(workRoot, 'evil.txt')))
}

// 4. missing SKILL.md
{
  const zip = zipSync({ 'README.md': strToU8('no skill here') })
  const res = await importSkillZip(zip, scope, false)
  check('missing SKILL.md -> invalid', res.status === 'invalid')
}

// 5. bad frontmatter name (not kebab-case)
{
  const zip = zipSync({ 'SKILL.md': strToU8('---\nname: Bad_Name\ndescription: x\n---\nbody') })
  const res = await importSkillZip(zip, scope, false)
  check('non-kebab name -> invalid', res.status === 'invalid')
}

// 6. duplicate import without overwrite -> exists; with overwrite -> imported
{
  const zip = zipSync({ 'SKILL.md': strToU8(skillMd) })
  const first = await importSkillZip(zip, scope, false)
  check('re-import reports exists', first.status === 'exists')
  const forced = await importSkillZip(zip, scope, true)
  check('overwrite re-import -> imported', forced.status === 'imported')
}

// 7. oversize buffer rejected before decompression
{
  const big = new Uint8Array(26 * 1024 * 1024) // > MAX_ZIP_BYTES (25MB)
  const res = await importSkillZip(big, scope, false)
  check('oversize -> invalid', res.status === 'invalid')
}

rmSync(workRoot, { recursive: true, force: true })
console.log(`\nzip-import: ${pass} passed, ${fail} failed`)
process.exit(fail === 0 ? 0 : 1)
