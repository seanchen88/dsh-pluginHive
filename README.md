# dsh-pluginHive

[DeepSeek Harness](https://deepseek-harness.github.io/deepseek-harness/) 的自定义插件集合。
为 Web 设置页贡献管理面板、为左栏贡献一个 MCP 市场入口，并提供一套可复制扩展的面板骨架。

| 包 | 设置页分区 | 能做什么 |
|---|---|---|
| [`@dsh-plugins/mcp-panel`](packages/mcp-panel) | **MCP 服务** | 添加 / 编辑 / 删除 / 启停 MCP 服务器，两种传输方式，自定义环境变量与请求头，展开查看 URL 与工具列表 |
| [`@dsh-plugins/skill-panel`](packages/skill-panel) | **技能** | 列举技能、阅读 `SKILL.md`（内置 Markdown 渲染）、导入 zip 技能包、删除技能、一键新建（自动开新会话并预填 `/create-skill`） |
| [`@dsh-plugins/bundled-skills`](packages/bundled-skills) | — | 随插件分发的技能内容（`create-skill`），首次挂载时自动引导到用户技能目录 |
| [`@dsh-plugins/mcp-market-panel`](packages/mcp-market-panel) | **左栏「MCP 市场」** | 浏览 / 搜索两套 MCP 目录（随插件离线分发的社区目录 300 条 + 官方 MCP Registry 实时联网），填凭据后一键安装；安装窗逐字展示将执行的命令与将写入的配置，并报告是否真的连上 |
| [`@dsh-plugins/plugin-kit`](packages/plugin-kit) | — | 共享基座：面板注册、Remote 代理、字典注册、自抄 UI 控件、零依赖 Markdown 渲染 |
| [`@dsh-plugins/example-panel`](packages/example-panel) | 示例 | 无 Remote 的最小面板骨架，**复制它即可开始写新面板** |

> 当前未发布到 npm，请从源码安装（见下）。
> 随插件分发的 MCP 目录数据来自 Apache-2.0 许可的上游，归属见
> [THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md)。

## 环境要求

- **DeepSeek Harness** `0.2.0-rc.1`（已验证；`0.1.7-rc.2` 亦通过）。面板依赖 harness 的 Cordis
  插件框架、设置页插槽与左栏 `sidebar.panellist` / `main` 插槽。
- **Node** `^22.19.0 || >=24.0.0`
- **pnpm** 11（仓库以 `packageManager: pnpm@11.7.0` 锁定）

## 安装

### 方式一：从源码安装（推荐）

```bash
git clone https://github.com/seanchen88/dsh-pluginHive.git
cd dsh-pluginHive
pnpm install
pnpm build                     # 产出各包的 lib/index.js 与 lib/client.js

# 把需要的面板装进当前 dsh profile
dsh plugin add ./packages/mcp-panel
dsh plugin add ./packages/skill-panel
dsh plugin add ./packages/mcp-market-panel   # 左栏「MCP 市场」
```

`dsh plugin add` 会把包写入 profile 的依赖与 bundle 列表，插件自带的
`packages/*/cordis.patch.yml` 负责挂载宿主端，浏览器端由包内 `dsh.client` 声明被自动发现。
重新打开设置页即可看到「MCP 服务」「技能」两个分区；装了市场面板的话，左栏「插件」下方
会出现「MCP 市场」入口。市场面板**不自己写配置**，安装动作复用 `mcp-panel` 的写路径，
所以要装市场就同时装 `mcp-panel`。

只想要其中一个面板，就只 add 其中一个。

### 方式二：应用内安装

打开 **设置 → 插件 → 安装引导**，填入本仓库的 GitHub 地址
（`https://github.com/seanchen88/dsh-pluginHive`）。

> 注意：monorepo 里每个面板是独立包，应用内安装若不能定位到子包目录，请改用方式一。

## 使用

### MCP 服务面板

![MCP 服务分区：卡片带连接状态、编辑 / 删除与启用开关](assets/screenshots/mcp-panel.png)

- **添加**：选择传输方式后填写
  - `Streamable HTTP`：服务名称、URL、请求头、请求超时时长
  - `STDIO`：服务名称、命令、参数、工作目录、环境变量、请求超时时长
- **请求头 / 环境变量**：多行文本框，每行一个 `KEY=value`。按**第一个** `=` 切分，
  所以值里可以再含 `=`（例如 base64 形式的密钥）。留空则不写入该键。
- **编辑**：弹窗会完整回填当前配置；未在表单中暴露的字段会原样保留，不会被保存动作丢掉。
- **启停**：卡片上的开关，不删除配置。
- **删除**：确认框会指名要删除的服务名。
- 超时时长可选 30s / 1min / 5min / 10min。

配置最终写入 profile 的补丁层（见[数据位置](#数据与配置位置)），harness 热加载，**无需重启**。

![添加 MCP 服务的表单](assets/screenshots/mcp-form.png)

> ⚠️ **环境变量与请求头以明文保存**，其中通常含 API Key。请把该文件当作凭据对待，
> 不要提交进任何公开仓库。

### 技能面板

![技能分区：随插件分发的 create-skill 受保护，用户技能可删除](assets/screenshots/skill-panel.png)

- **列表**：按作用域展示技能卡片（名称、描述、来源标记）。
- **查看**：弹窗内以 Markdown 渲染 `SKILL.md`（frontmatter 单独成表），超过 256 KiB 会截断并提示。
- **导入**：选择含 `<name>/SKILL.md` 结构的 `.zip`，上限 25 MiB；同名技能会先征求确认。
- **删除**：随插件分发的 `create-skill` 受保护，只能查看。
- **新建**：自动打开一个新会话，并在输入框预填 `/create-skill 创建一个技能，要求如下：`
  （`/create-skill` 渲染为技能引用）。若当前部署缺少会话服务，则降级为复制引导词到剪贴板并提示。

![SKILL.md 的内置 Markdown 渲染](assets/screenshots/skill-viewer.png)

![新建技能：自动开新会话并预填 /create-skill](assets/screenshots/new-session-prefill.png)

### MCP 市场面板（左栏）

安装后入口出现在**左栏「插件」下方**（不是设置页）。两套目录：

- **本地目录**（默认）：随插件离线分发的社区目录 300 条，含分类筛选与全文搜索，**不联网**也能用。
- **官方 Registry**：实时拉取 `registry.modelcontextprotocol.io`，游标翻页、按关键词搜索。

安装流程：

- **凭据表单**：目录条目里的 `${VAR}` 占位符会渲染成待填字段（名字含 `KEY`/`TOKEN`/`SECRET`
  的按密码框显示）。**必填项没填时「确认安装」是禁用的** —— DSH 不展开环境变量占位符，
  带着 `${...}` 装出去只会得到一个连不上的坏服务。
- **安装前确认**：弹窗逐字显示将执行的命令与将写入 profile 的配置。装 MCP 等于在你的机器上
  执行第三方 `npx` / `uvx` / `docker` 命令，请先确认来源可信。
- **安装反馈**：写入期间显示进度并禁用开关；结束后自动关闭安装窗，弹结果窗分别报告
  「写入结果」与「连接状态」（是否真的拉到工具）。
- **传输门**：DSH 的 MCP 客户端只支持 `stdio` 与 `streamable-http`，`sse`-only 的条目会被
  明确标为不支持而不是悄悄装坏。
- 卡片上的状态点由**实际注册的工具数**推导：绿=已连接、红=已启用但没有工具、灰=已停用。

> 市场面板不自己实现持久化：安装走 `mcp-panel` 的 `mcpAdmin` 远端，因此必须同时安装
> `mcp-panel`。它缺席时面板照常渲染，安装按钮给出降级说明。

### create-skill（随插件分发的技能）

引导你和模型一起把一个流程沉淀成技能：弄清意图 → 访谈 → 写 `SKILL.md` → 校验 → 试触发 → 迭代。
含一个零依赖校验器，可单独使用：

```bash
node packages/bundled-skills/skills/create-skill/scripts/validate_skill.mjs <技能目录>
```

## 二次开发

完整的工程约定、架构不变量与踩坑清单见 **[AGENTS.md](AGENTS.md)**（包括给 AI 编码助手看的部分）。

常用命令：

| 命令 | 作用 |
|---|---|
| `pnpm build` | 构建全部包（宿主端 + 浏览器端） |
| `pnpm typecheck` | 独立类型检查（用 `typecheck/stubs.d.ts`，**不需要** harness checkout） |
| `pnpm verify` | 类型检查 + zip 导入用例（11 项）+ 市场目录映射用例（33 项） |
| `pnpm test:zip` / `pnpm test:market` | 单独跑某一组用例 |
| `pnpm watch` | 监听构建 |
| `pnpm gen:cordis` | 生成本地开发用的 `cordis.yml` |
| `pnpm gen:catalog` | 从上游 `servers.json` 重新生成市场面板内置的本地目录（见 THIRD_PARTY_LICENSES.md） |
| `pnpm setup:harness` | 从本地 harness checkout 链接 `@deepseek-ai/*` peer（见下） |
| `pnpm gen:typert` | 重新生成 Remote 产物（需要 harness checkout） |
| `pnpm dev:web` | 构建后以本仓库补丁启动 harness Web 端 |

新增一个面板：复制 `packages/example-panel/`，按 [AGENTS.md 的「新增面板」](AGENTS.md#新增一个面板) 改名并接线。

### 什么时候需要 harness 源码

`pnpm install` / `build` / `typecheck` / `verify` **都不需要** DeepSeek Harness 的 checkout：
`@deepseek-ai/*` 是 peer 依赖，类型由 `typecheck/stubs.d.ts` 提供，构建时按 external 处理。

只有两件事需要它：

1. **从本仓库直接运行宿主端**（harness 不启用 `--preserve-symlinks`，Node 会按包的**真实路径**向上解析）；
2. **重新生成 Remote 产物**（typert 生成器未发布到 npm）。

这时把 harness clone 到同级目录（或用 `DSH_REPO` 指定路径）：

```bash
DSH_REPO=/path/to/deepseek-harness pnpm setup:harness
```

`lib/typert.*.js` / `lib/typert.*.d.ts` 是生成产物，但作为**构建输入**随仓库提交，
这样普通 clone 无需 harness 也能构建；只有改动 `@Remote` 方法签名时才需要重新生成。

## 数据与配置位置

| 内容 | 位置 |
|---|---|
| MCP 服务配置 | `~/.dsh/profiles/<profile>/cordis.patch.yml`（每台 server 一条 `insert` 记录，id 形如 `mcp-<name>`）。市场面板安装的服务写的是**同一个文件、同一套实现** |
| 用户级技能 | `~/.agents/skills/<name>/SKILL.md`、`~/.dsh/skills/<name>/SKILL.md` |
| 项目级技能 | `<workspace>/.agents/skills/<name>/SKILL.md`、`<workspace>/.dsh/skills/<name>/SKILL.md` |
| 随插件分发的技能 | `packages/bundled-skills/skills/`（引导安装到用户技能目录，按内容哈希决定是否升级） |

## 常见问题

**面板没出现在设置页**
确认 `pnpm build` 已成功、`dsh plugin add` 指向的是**包目录**（含 `package.json` 与 `cordis.patch.yml`），
以及 harness 版本满足要求。运行期从本仓库直连时，先执行 `pnpm setup:harness`。

**技能不出现在列表里**
最常见原因是 frontmatter 的布尔键写成了 camelCase（`userInvocable` / `disableModelInvocation`）——
必须用 kebab-case（`user-invocable` / `disable-model-invocation`），否则整个技能会被静默忽略，
只在宿主日志留一行 warn。用上面的 `validate_skill.mjs` 检查。

**保存 MCP 后界面没反应**
写请求的返回值在 harness 重载补丁层时可能丢失，面板已内置超时兜底：超时后重新拉取列表，
以列表结果为准。若列表确实没变，看宿主日志。

**`pnpm install` 之后 `pnpm build` 报 `ERR_PNPM_FETCH_404`**
说明 `@deepseek-ai/*` 被链接进了 harness 源码树而 pnpm 又去解析它们的 `workspace:*` 依赖。
仓库已在 `pnpm-workspace.yaml` 里关闭 `verifyDepsBeforeRun` 与 `autoInstallPeers` 规避；
若你改回了默认值就会复现。

## 仓库结构

```
dsh-pluginHive/
├── assets/screenshots/  # README 配图
├── packages/
│   ├── plugin-kit/        # 共享基座（面板注册 / Remote 代理 / UI 控件 / Markdown 渲染）
│   ├── mcp-panel/         # MCP 服务面板（设置页）
│   ├── mcp-market-panel/  # MCP 市场（左栏入口；含内置社区目录，见 THIRD_PARTY_LICENSES.md）
│   ├── skill-panel/       # 技能面板
│   ├── bundled-skills/    # 随插件分发的技能（create-skill）
│   └── example-panel/     # 新面板模板
├── scripts/               # gen-cordis / gen-catalog / gen-typert / setup:harness
├── typecheck/             # 独立类型检查配置 + @deepseek-ai/* 类型 stub
├── cordis.yml             # 本地开发加载入口（pnpm gen:cordis 生成）
├── THIRD_PARTY_LICENSES.md # 非 MIT 的再分发内容（内置目录数据等）
└── AGENTS.md              # 工程约定与架构不变量
```

每个面板包都是**双端**结构：`src/index.ts`（Node 宿主端）与 `src/client/`（浏览器端），
由 `tsdown` 分别产出 `lib/index.js` 与 `lib/client.js`，再通过包名在运行时接上。

## 许可证

本仓库源码采用 [MIT](LICENSE)。

随插件分发的 MCP 目录数据来自 Apache-2.0 许可的上游，以及若干被内联进浏览器产物的
第三方运行库（zod / clsx 等）——完整归属见 **[THIRD_PARTY_LICENSES.md](THIRD_PARTY_LICENSES.md)**，
再分发时请一并保留。

## 链接

- DeepSeek Harness 文档：<https://deepseek-harness.github.io/deepseek-harness/>
- 插件打包与发布：[config](https://deepseek-harness.github.io/deepseek-harness/develop/basic/config) ·
  [publish](https://deepseek-harness.github.io/deepseek-harness/develop/basic/publish)
