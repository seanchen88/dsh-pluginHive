# Harness 技能契约（已对源码核实）

> 本文是 `create-skill` 的第二级披露：只有要落地细节或排错时才读。
> 结论来源标注到文件与行号，便于日后复核（harness 会演进，行号可能漂移，但函数名稳定）。

## 1. frontmatter 字段

解析入口：`packages/skill/skill-filesystem/src/index.ts` 的 frontmatter 解析函数。

| 键 | 必需 | 类型 | 说明 |
|---|---|---|---|
| `name` | ✅ | string | 必须通过 `isSkillName()` |
| `description` | ✅ | string | 非空；**触发判断的唯一依据** |
| `whenToUse` | — | string | 注意是 **camelCase**（不是 `when-to-use`） |
| `metadata` | — | object | 任意结构化附加信息 |
| `user-invocable` | — | boolean | `false` → 不进 `/` 菜单 |
| `disable-model-invocation` | — | boolean | `true` → 模型不能自动调用，只能用户手动 |

未知顶层键不会被拒绝，但也不会生效——别指望自定义字段能传到模型侧。

### 名称语法

```
packages/skill/skill/src/index.ts:21
const SKILL_NAME = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
```

纯 kebab-case，小写字母与数字，**没有长度上限**。（`[A-Za-z0-9_-]{1,32}` 那条 32 字符限制是
**MCP serverName** 的规则，与技能名无关，别混用。）

### 布尔键的大小写陷阱（最常见的静默失效）

`parseInvocationPolicy()` 会主动**抛错**拒绝 camelCase 遗留写法：

```
packages/skill/skill-filesystem/src/index.ts:1000-1015
rejectLegacyInvocationKey(data, 'disableModelInvocation', 'disable-model-invocation')
rejectLegacyInvocationKey(data, 'modelInvocable',        'disable-model-invocation')
rejectLegacyInvocationKey(data, 'userInvocable',         'user-invocable')
// throw new Error(`frontmatter field "${legacy}" is unsupported; use "${canonical}"`)
```

抛错被上层捕获后，该技能文件**只是被跳过并打一条 warn 日志**，界面上看不到任何报错——
表现就是"技能莫名其妙不出现"。

## 2. 失效模式一览（都只 warn，不抛给 UI）

| 症状 | 原因 | 定位 |
|---|---|---|
| 技能不出现 | 缺 `name` 或 `description` | `frontmatter requires name and description` |
| 技能不出现 | YAML 解析失败（缩进/引号/未闭合 `---`） | `invalid YAML frontmatter` |
| 技能不出现 | 文件不以 `---\n` 开头 | `missing YAML frontmatter` |
| 技能不出现 | `name` 不是 kebab-case（如 `My_Skill`） | `invalid skill name` |
| 技能不出现 | 用了 camelCase 布尔键 | `invalid invocation frontmatter` |
| `/` 菜单里没有 | `user-invocable: false` | 正常行为 |
| 模型从不自动用 | `description` 太含蓄，或任务太简单 | 见 SKILL.md「description 是唯一的触发机制」 |

排查顺序：先看宿主日志里的 `skill file ... ignored:` 行，再核对上面的表。

## 3. 作用域根与优先级

技能发现按根目录分级（rank 数字来自 `packages/skill/skill/src/index.ts`）：

| 根 | source 标签 | rank | 用途 |
|---|---|---|---|
| `~/.dsh/skills` | `user-dsh` | 400 | 用户级（Harness 专属目录） |
| `~/.agents/skills` | `user-agents` | 500 | 用户级（跨工具通用约定，**面板新建默认落这里**） |
| `<workspace>/.dsh/skills` | `project-dsh` | — | 项目级，可随仓库提交 |
| `<workspace>/.agents/skills` | `project-agents` | — | 项目级，可随仓库提交 |
| 插件自带 | `bundled` | 600 | 由插件贡献，面板里标「来自插件」，不可删 |

同名技能按 rank 决胜；面板列表按名字去重、**先命中的根优先**。

## 4. 生效与刷新

- 文件监视器（chokidar）命中 `SKILL.md` 变更即 `invalidate` 并重算目录，**不需要重启**。
- 但 `skills/change` 事件**不在**跨端转发 allowlist 里，所以「设置 → 技能」面板不会自动重绘；
  重新进入面板即可看到最新内容。
- 触发形态：`/skill-name ` 是**纯文本前缀**（`packages/client/ui-skill/src/client/index.ts` 的
  `onPick` 返回 `` `/${candidate.name} ` ``），宿主在解析 prompt 时识别开头 `/name` 并展开技能正文。
  没有结构化的 mention 字段，也不需要。

## 5. 打包分享

给别人的方式：把技能目录打成 zip，保留一层目录（zip 内是 `<name>/SKILL.md`），对方在
「设置 → 技能」点「导入」。导入侧的安全校验：压缩包 ≤25MB、解压后总量与条目数上限、
逐条目路径断言不得越出目标目录（防 zip-slip）、必须能解析出合法 frontmatter。
