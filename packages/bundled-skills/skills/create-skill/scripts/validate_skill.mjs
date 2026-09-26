#!/usr/bin/env node
/**
 * Validate a skill directory against the DeepSeek Harness skill contract.
 *
 * Zero dependencies (node builtins only) so it runs anywhere a skill runs.
 * The checks mirror what `skill-filesystem` actually does: an invalid file is
 * silently skipped with a host-side warn, so a skill that "doesn't show up" is
 * almost always one of these. Use it after writing a skill, before importing it.
 *
 * Usage:  node validate_skill.mjs <skill-dir> [<skill-dir> ...]
 * Exit:   0 = no errors (warnings allowed), 1 = at least one error.
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { basename, join, resolve } from 'node:path'

/** Same grammar as `isSkillName` in packages/skill/skill/src/index.ts. */
const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

/** Keys the harness rejects (throws → the whole file is ignored). */
const LEGACY_BOOLEAN_KEYS = ['disableModelInvocation', 'modelInvocable', 'userInvocable']

/** Recommended ceilings from the progressive-disclosure guidance. */
const BODY_LINE_LIMIT = 500
const REFERENCE_LINE_LIMIT = 300

const errors = []
const warnings = []

function report(file) {
  return { error: (message) => { errors.push(`${file}: ${message}`) },
           warn: (message) => { warnings.push(`${file}: ${message}`) } }
}

/**
 * Parse the leading YAML frontmatter as a flat key map.
 * @param raw - full SKILL.md text.
 * @returns `{ data, body, bodyStartLine }`, or undefined when there is no frontmatter block.
 */
function parseFrontmatter(raw) {
  const normalized = raw.replace(/\r\n/g, '\n')
  if (!normalized.startsWith('---\n')) return undefined
  const end = normalized.indexOf('\n---', 4)
  if (end < 0) return undefined
  const block = normalized.slice(4, end)
  const data = {}
  for (const line of block.split('\n')) {
    // Only top-level keys (no leading whitespace) are part of the contract.
    const match = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line)
    if (match === null) continue
    data[match[1]] = (match[2] ?? '').trim().replace(/^["']|["']$/g, '')
  }
  const body = normalized.slice(end + 4)
  return { data, body, bodyStartLine: block.split('\n').length + 2 }
}

/** Relative markdown link targets inside a document body. */
function localLinks(body) {
  const found = []
  for (const match of body.matchAll(/\]\(([^)\s]+)\)/g)) {
    const target = match[1]
    if (/^(https?:|mailto:|#|\/)/.test(target)) continue
    found.push(target.split('#')[0])
  }
  return found.filter(target => target !== '')
}

function validateSkillDir(dir) {
  const absolute = resolve(dir)
  const file = join(absolute, 'SKILL.md')
  const say = report(dir)

  if (!existsSync(file)) {
    say.error('缺少 SKILL.md')
    return
  }
  const raw = readFileSync(file, 'utf8')
  const parsed = parseFrontmatter(raw)
  if (parsed === undefined) {
    say.error('没有可解析的 YAML frontmatter（文件必须以 --- 开头并有闭合的 ---）')
    return
  }
  const { data, body } = parsed

  const name = data.name
  const description = data.description
  if (name === undefined || name === '') say.error('frontmatter 缺少 name')
  else if (!SKILL_NAME.test(name)) say.error(`name "${name}" 不是 kebab-case（应匹配 ${SKILL_NAME}）`)

  if (description === undefined || description === '') say.error('frontmatter 缺少 description（缺失会被 harness 直接忽略）')
  else if (description.length < 40) say.warn(`description 只有 ${description.length} 字符，通常不足以覆盖触发场景`)

  for (const legacy of LEGACY_BOOLEAN_KEYS) {
    if (legacy in data) say.error(`布尔键 "${legacy}" 是遗留 camelCase 写法，harness 会抛错并忽略整个文件；改用 kebab-case（user-invocable / disable-model-invocation）`)
  }
  if ('when-to-use' in data) say.warn('harness 读取的是 camelCase 的 whenToUse；"when-to-use" 会被当作未知键丢弃')
  for (const key of ['allowed-tools', 'license', 'compatibility']) {
    if (key in data) say.warn(`"${key}" 不是 harness 识别的字段（不会报错，但也不会生效）`)
  }

  if (name !== undefined && name !== '' && basename(absolute) !== name) {
    say.warn(`目录名 "${basename(absolute)}" 与 frontmatter name "${name}" 不一致（约定应相同）`)
  }

  const bodyLines = body.split('\n').length
  if (bodyLines > BODY_LINE_LIMIT) say.warn(`正文 ${bodyLines} 行，超过 ${BODY_LINE_LIMIT} 行建议上限；把细节移到 references/ 并加指路`)

  for (const target of localLinks(body)) {
    if (!existsSync(join(absolute, target))) say.error(`正文引用了不存在的文件：${target}`)
    else if (target.startsWith('references/') && statSync(join(absolute, target)).isFile()
      && readFileSync(join(absolute, target), 'utf8').split('\n').length > REFERENCE_LINE_LIMIT) {
      say.warn(`${target} 超过 ${REFERENCE_LINE_LIMIT} 行，建议加小目录`)
    }
  }
}

const targets = process.argv.slice(2)
if (targets.length === 0) {
  console.error('用法：node validate_skill.mjs <技能目录> [<技能目录> ...]')
  process.exit(2)
}
for (const target of targets) validateSkillDir(target)

for (const line of errors) console.log(`  ✗ ${line}`)
for (const line of warnings) console.log(`  ! ${line}`)
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`)
process.exit(errors.length === 0 ? 0 : 1)
