# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## 这是什么

DeepSeek Harness（Cordis 框架）的**外部插件集**：pnpm monorepo，产出可安装的组合包（bundle），
为 harness 的 Web 设置页贡献管理面板。当前含 `mcp-panel`、`skill-panel`、`example-panel`（模板），
共享基座 `plugin-kit` 与技能内容包 `bundled-skills`。

面向使用者的安装与功能说明在 [README.md](README.md)；本文件讲**架构约束与踩坑不变量**。

与 harness 的依赖关系要分清三档：

| 场景 | 需要 harness 源码吗 |
|---|---|
| `pnpm install` / `build` / `typecheck` / `verify` | **不需要**。`@deepseek-ai/*` 是 peer，类型由 `typecheck/stubs.d.ts` 提供，打包时按 external 处理；Remote 产物已随仓库提交 |
| 从本仓库直接挂载宿主半联调 | **需要**（`pnpm setup:harness` 建 peer 链接） |
| 改动 `@Remote` 方法签名后重新生成产物 | **需要**（`pnpm gen:typert`，生成器未发布到 npm） |

## 常用命令

```bash
pnpm install                # packageManager: pnpm@11.7.0；engines: node ^22.19.0 || >=24
pnpm build                  # 各包 → lib/index.js（宿主半）+ lib/client.js（浏览器半）
pnpm verify                 # 离线 typecheck（桩类型）+ 技能 zip 安全用例   ← 提交前跑这个
pnpm typecheck              # tsc -p typecheck/tsconfig.check.json（无需 harness 链接）
pnpm test:zip               # 编译并运行 zip-import 的 11 条安全用例
pnpm gen:cordis             # 生成根 cordis.yml（勿手改该文件）
pnpm setup:harness          # 从本地 harness checkout 链接 @deepseek-ai/* peer
pnpm gen:typert             # 重生成 ./typert + ./remote（改了 @Remote 签名必跑）
pnpm clean                  # 删 lib/ 与 tsbuildinfo
pnpm dev:web                # build 后在 harness 侧起 web 并叠加 --patch cordis.yml
```

改 `zip-import.ts` 后单独复跑用例：`pnpm test:zip`（先生成 `.tmp-build/`），
再 `node packages/skill-panel/test-zip-import.mjs`。

与 harness 联调（官方流程，**顺序不可颠倒**——先备产物，再用产物起服务）：

```bash
cd ../deepseek-harness && pnpm install && pnpm run build
pnpm dsh plugin --profile web add /abs/path/to/dsh-pluginHive/packages/mcp-panel
pnpm dsh --profile web --dump-config | grep -A2 '# == @dsh-plugins/mcp-panel'   # 确认 bundle 层已并入
pnpm dsh web
```

浏览器地址用启动日志里带 `?token=` 的 URL（默认 `http://127.0.0.1:3080`）。

## 大图：一个面板 = 两个 face + 一份 bundle 声明

每个面板包同时是**三样东西**，理解它们的耦合关系是本仓库最大的门槛：

1. **宿主半** `src/index.ts` → `lib/index.js`：Cordis 插件（`export const name/inject` + `apply(ctx)`），
   并在此**入口文件内**定义 `TypertRemoteService` 子类与 `@Remote` 方法（写在别的文件里生成器收集不到）。
2. **浏览器半** `src/client/index.ts` → `lib/client.js`：必须是
   `window.__ModuleLoader__.load({ id, factory })` 的 lazy-CJS 工厂格式，由 `plugin-kit` 复现的
   `clientBundle` 产出（harness 原版预设未发布）。
3. **组合包层** `cordis.patch.yml` + `package.json` 的 `dsh.bundle.patch`：profile 装上该包即生效。

三者的连接点是**裸包名**：Web 客户端模块系统按「Loader 行的 `name` == 裸包名」把 client 半挂到该行，
`typert-loader` 也按裸包名解析 `package.json` 找 `./typert`。因此 patch 行**绝不能**写
`./src/index.ts` 之类的路径——那样只加载宿主半，面板静默不出现。

第四个产物 `lib/typert.host.js` / `lib/typert.remote-client.js`（`./typert` / `./remote`）**不由 tsdown
生成**，由 `pnpm gen:typert` 产出。生成器的 `isTypeMetaSymbol` 要求 `@deepseek-ai/dsh-typert-protocol`
与插件在**同一分析 root** 注册，所以脚本会把包临时并入 harness 的 `packages/` 树、以 harness 为 root
生成、再拷回，并在 `finally` 里无条件还原 harness（含失败路径）。**只有改 `@Remote` 面签名时才需要跑它。**

## 关键不变量（违反即运行期故障，均已在实机踩过）

| 规则 | 破坏后的症状 |
|---|---|
| `@Remote` 控制器写在**入口文件内** | typert 产出 0 模型，client 半解析不到 `./remote` |
| 宿主方法返回**原始值**，失败 `throw new RemoteError(code, msg, data)` | 双重 `RemoteResult` 信封 → 客户端 `.map is not a function` |
| `@Remote` 方法名避开 `RemoteNamespaceService` 保留名 `remove` / `has` | 命名空间注册冲突（故用 `deleteServer`） |
| client `inject` 写 `['slots','locale','remote']`，**不含** `remote.<ns>`；自挂载后用 `ctx.get('remote.<ns>')` | 同插件把自挂载的命名空间写进 inject → 死锁 "parked waiting for service" |
| 命名空间类型只来自生成的 `lib/typert.remote-client.d.ts`，**不手写** `remote-types.ts` | 声明合并重复 → TS2717 |
| 二进制跨 Remote 走 **base64 字符串** | `Uint8Array` 过不了 JSON-RPC |
| node 半挂 `transpileDecorators()` 且 `clean: false` | `lib/index.js` 残留 `@Remote(` 语法错误；或 typert 产物被清 |
| 标准装饰器，**不要**开 `experimentalDecorators` | 与 `ClassMethodDecoratorContext` 不兼容 |
| `plugin-kit` / `zod` 放 `devDependencies` 以强制内联进 client 半 | 放 `dependencies` 会被当 external，运行期解析不到 |
| `files` 必须含 typert 的两个 `.d.ts` | `validateExport` 抛错 |
| 技能列表读**磁盘** `SKILL.md`（`skill-scan.ts`），不用 `ctx.skills.list` | web profile 禁用了全局 `skill-filesystem`，全局列表恒空 → 面板空白 |
| 写操作的**返回值不可信**：超时（20s）就重取 `list()`，UI 真相以 `list()` 为准 | `upsert` 返回前调 reconcile，reconcile 会重载发起调用的宿主 fiber → patch 已落盘但回复丢包，「保存」按钮永久 disabled |
| 跨插件服务（`uiWorkspace` / `sessions` / `workspaces` / `conversation`）一律 `ctx.get(...)` 软访问 + 降级，**不写进 `inject`** | 声明成硬依赖后，部署缺任一服务会让整个面板不激活 |
| 常驻渲染的 Modal 表单不得用 `useState(() => seed(prop))` 吸收外部初值，要在 `open`/初值变化时 `useEffect` 重播种 | 点「编辑」弹出来的窗子是空的（只看到「添加」那次播种） |
| 长内容弹窗靠 `Modal` 的 flex 列钉住 header/footer、**只让 body 内滚**；副信息放 `title` 节点而非 footer | `.modal` 自身 `overflow:auto` 会让整窗（含关闭按钮）随内容滚走 → 必须滚到底才能关闭 |
| `.modalBody > *` 必须 `flex: 0 0 auto` | column flex 子项默认 `flex-shrink: 1`：内容超高时会先把子项**压扁**塞进去，`overflow-y:auto` 永不触发 → 代码块塌成一条缝 |
| 表单控件必须自己写 `box-sizing: border-box` | 宿主对插件元素是 **content-box**（preflight 在 `@layer base`/`@scope` 里盖不到我们），`.field` 的 column-flex stretch 把子项拉到容器宽，`padding`/`border` 再叠上 22px → 输入框贴出弹窗右边缘 + 顶出横向滚动条 |
| env / headers 录入用 `TextArea` 多行，按**第一个** `=` 切分，空集合不写键 | 单行框无法录入第二个变量；值里含 `=`（如 base64 key）会被截断 |
| 需要关设置弹层时，用 `settings.section` 的 **owner prop** `close()` | 宿主 `renderSlot('settings.section', { close: onClose }, …)` 一直在传，只是我们原先不收 → 导航到新会话后弹层还浮在用户脸上。接宿主能力前先查 harness 的 `packages/client/ui-settings/src/client/contract/slots.ts` 的 owner 类型，别凭"宿主没导出这个服务"的印象绕路 |
| 技能 frontmatter 的布尔键必须 kebab-case（`user-invocable` / `disable-model-invocation`） | 写成 camelCase 会让 `parseInvocationPolicy` 抛错、**整个技能被静默忽略**（只有宿主 warn） |
| 技能可选补充键是 camelCase 的 `whenToUse`；技能名无长度上限 | 写成 `when-to-use` 会被当未知键丢弃；把 MCP serverName 的 32 字上限误安到技能名 |
| 删除/读取技能只接受 **name**，宿主用 `resolveSkillDir` 在已知根内解析；受保护名单从 `BUNDLED_SKILLS.bootstrap` 派生 | 客户端传路径 = 路径穿越；`create-skill` 与其他用户技能同在 `~/.agents/skills`，靠 `source` 分不出来 |
| 渲染不可信文本用 React 节点，**不用 `dangerouslySetInnerHTML`**；链接 href 只放行 `http(s)` | 技能 `SKILL.md` 是第三方内容，HTML/脚本注入会直接跑在宿主页面里 |
| Markdown 段落要**先折叠软换行、再走一次行内解析** | 手工折行的中文 markdown 里 `**粗体**` 经常跨行，逐行解析则两边都配不上对 → 屏幕上漏出字面 `**` |
| 删除类确认文案必须**指名对象**（`{name}` 占位符） | 多行同构卡片时，泛化的"确定删除该服务？"极易点错行造成用户数据丢失（已真实发生过一次） |
| 自动化测试里定位列表行时，**不能**靠"向上找包含目标名的祖先" | 列表容器的 `innerText` 包含**所有**行名，会匹到第一行——必须用"含目标名 且 不含其它行名 且 只有一个操作按钮"的最小祖先 |
| 表单控件必须自己写 `box-sizing: border-box` | 宿主对插件元素是 **content-box**（它的 preflight 在 `@layer base`/`@scope` 里，盖不到我们），`.field` 的 column-flex stretch 把子项拉到容器宽，`padding`/`border` 再叠上去 → 输入框贴出弹窗右边缘并顶出横向滚动条 |
| **CSS 里的 `--dsw-alias-*` 名字必须能在 harness 里 grep 到** | 不存在的 token 会让 `var(x, 兜底)` 静默退到硬编码浅色值，深色模式整块面板跑偏且**不报任何错**。宿主真实词表：`label-{primary,secondary,tertiary}` / `bg-{base,layer-1..3,skeleton,overlay}` / `border-l1..l4` / `brand-{primary,text}` / `state-{error,warn,success}-primary` / `button-{primary,floating,tool-bar}-fill` / `switch-thumb` / `tooltip-bg` / `link`。动手前先跑 `grep -rhoE "\-\-dsw-alias-[a-z0-9-]+:" <harness>/packages/client \| sort -u`；**`.tsx` 里的内联 style 也要扫**，那里同样会写死 token |
| 需要关设置弹层时，用 `settings.section` 的 **owner prop** `close()` | 宿主 `renderSlot('settings.section', { close: onClose }, …)` 一直在传。接宿主能力前先查 `packages/client/ui-settings/src/client/contract/slots.ts` 的 owner 类型，别凭印象绕路 |
| 左栏入口必须**成对注册**：`sidebar.panellist`（list 槽，用 `id`）+ `main`（keyed 槽，用 `key`），两者字符串相同；并在 `dsh.client.inject` 声明 `dsh-client-ui-sidebar` / `dsh-client-ui-layout` | 只注册 nav 行 → 点击时宿主 `layout.selectPanel` 抛 `main panel "x" is not registered`。「插件」行本身也是槽贡献（`order:0`），位置由 `order` 决定：1..9 落在插件之下、工作区区域之上 |
| 常驻弹窗的播种 effect **不得**把「实时派生数据」列进依赖数组 | 写操作成功后刷新出来的新引用会让 effect 重跑 → 弹窗跳回第一步并把结果文案擦掉。播种只依赖 `open` / 目标对象 / 模式，实时值走 ref |
| 复用别的面板已有的 Remote 命名空间时，一律 `ctx.get('remote.<ns>')` 软访问 + 按钮降级，**不要**再写第二份持久化 | 两个面板各写 patch 会让锁 / 回滚 / reconcile 行为分叉；市场面板因此**完全没有** `@Remote`（也就无需 typert） |
| 会把第三方代码拉起来执行的入口（装 MCP = 跑 `npx`/`uvx`/`docker`），确认窗必须展示**将执行的完整命令与将写入的完整配置**，必填凭据未填要阻止而非放行 | 供应链风险被藏在一个按钮后；且 DSH 不展开 `${VAR}`，带着占位符装出去只会得到一个连不上的坏服务 |
| **stdio 行必须写一个存在的 `cwd`** | 宿主 `mcp-client` 的 zod 把 `cwd` 默认成 `''`，而 `spawn(..., {cwd:''})` 直接 **ENOENT** → 服务永远起不来，日志里刷 `sh: <bin>: command not found`。表单留空是常态，所以在**宿主半** `upsert` 里补 `homedir()`（`mcp-panel/src/index.ts` 的 `withStdioCwd`），两个面板一起受益 |
| 连接状态只能由**实际注册的工具数**推导，不能由 `enabled` 推导 | 命令起不来的服务会**永远 enabled** → 状态点一路绿色。三态：`tools>0` 绿 / `enabled && tools===0` 红 / `!enabled` 灰；探针留 4s 宽限期再判红，否则把还在握手的服务误判成失败。启停写入本身要 3–5 秒（走 reconcile），必须同时给「正在生效…」进度并禁用开关 |
| 第三方目录里的 `${...}` 占位符必须**宽松识别**（`[^{}]+`）并保证一个都不写进配置 | 社区目录里同时有 `api-key`、`your-secret-api-key`、`input:organization_id` 甚至 `-s`；按标识符匹配会漏，漏掉的原样进 profile 变成坏服务 |
| 从别的许可协议的项目里灌数据，**出处与许可证要写在产物里** | 本仓库 MIT；市场面板的内置目录源自 MCP Hub（Apache-2.0）vendored 的 MCPM 社区目录。归因见 `THIRD_PARTY_LICENSES.md` 与生成文件头部，重新生成时不要丢 |
| JSX 只能写在 `.tsx` 里 | 把 SVG 组件塞进 `client/index.ts` 会让 `tsc` 吐一串 `TS1005 '>' expected`，像语法被 parser 吃掉，其实只是文件后缀不对 |

## 新增一个面板

复制 `packages/example-panel/`（它是无 Remote 的最小骨架），然后按顺序处理：

1. **改名**：目录名、`package.json` 的 `name`（`@dsh-plugins/<panel>`）、`tsdown.config.ts`、
   三个 `tsconfig*.json` 里的引用。
2. **bundle 声明**：`package.json` 的 `dsh.bundle.patch` 指向包内 `cordis.patch.yml`，
   后者用 `- insert: [{ id, name: '@dsh-plugins/<panel>' }]` 挂载宿主半（**裸包名**，见大图）。
   `dsh.client.inject` 列出浏览器半需要的宿主注入面。
3. **加进本地开发入口**：在 `scripts/gen-cordis-yml.mjs` 的 `PANELS` 追加一行，然后 `pnpm gen:cordis`。
4. **需要读写宿主数据时**：在 `src/index.ts` **入口文件内**写 `TypertRemoteService` 子类 +
   `@Remote` 方法，跑 `pnpm gen:typert` 生成 `./typert` 与 `./remote`，客户端用
   `ctx.get('remote.<ns>')` 取（不要写进 `inject`）。
5. **UI**：只用 `plugin-kit` 的自抄控件与 `--dsw-alias-*` token；字典走 `registerLocale(ctx, ns, {zh,en})`。
6. 提交前 `pnpm verify`，并在真实 harness 里打开设置页确认分区出现。

## 环境陷阱（会直接报错，先读这里）

- **`pnpm build` 报 `ERR_PNPM_FETCH_404 @deepseek-ai/dsh-type-meta`**：当
  `packages/*/node_modules/@deepseek-ai/*` 是指向 harness 源码树的符号链接时（跑过
  `setup:harness` 或 `gen:typert` 之后就是这种状态），那些包带 `workspace:*` 依赖，
  在本仓库外无法解析，pnpm 的运行前依赖检查会去 registry 碰壁。解法已内置在
  `pnpm-workspace.yaml`：`verifyDepsBeforeRun: false` + `autoInstallPeers: false`。
  **注意 pnpm 11 已把这些设置移到 `pnpm-workspace.yaml`，写进 `.npmrc` 不生效。**
- **主干升级不等于要重跑 typert**：先在 harness 仓库
  `git diff <旧 tag> HEAD -- packages/typert/protocol packages/typert/generator`，
  若 `.ts` 未变则产物仍有效，省掉一次 staging（它会给 harness 工作区引入约 68MB 的平台二进制下载）。
- `gen:typert` 的 staging 会把本仓库包复制进 harness 并改 `tsconfig.host.json` 的 references、
  改写 `extends`；脚本用 `finally` 无条件还原，**不要**手工照抄这套步骤（历史上漏过 3 步导致产物为 0）。
- profile 的 `dsh.profile.patchReload` 在 rc.2 已无读取方（HMR 无条件 watch patch 文件），
  不要依赖它解释热重载行为。

## 红线约束

- **harness 源码零改动**：任何改动 harness 仓库的动作（含临时并入生成 typert）结束后必须还原，
  `cd ../deepseek-harness && git status --porcelain` 应为空。临时构建尤其容易把 `.js/.d.ts/.map`
  泄进 `packages/**/src`，用 `git clean -fd` 清掉。
- **客户端纯净性**：client 半禁止运行时值 import 任何 `@deepseek-ai/dsh-client-ui-*`（跨插件协同一律
  走服务/slot）；UI 控件自抄在 `plugin-kit/src/ui.tsx`，只用 `--dsw-alias-*` token；禁止 iframe。
  `clientBundle` 内置该纯净门，违规会在构建期报错。
- **`cordis.yml` 与 `lib/`（除 typert 产物）是生成物**：改 `scripts/gen-cordis-yml.mjs` 的 `PANELS`
  而非手写 yml；`lib/typert.*` 是唯一被 `.gitignore` 反向放行的生成物（作为构建输入随仓库提交）。
- 面板写操作只写 profile 的 `cordis.patch.yml`，且保留注释与 `!!js` 表达式（用 `yaml` 文档 API，
  注意 `insert` 是 `YAMLSeq` 节点，判数组要用 `isSeq().items.filter(isMap)`）。
- **凭据是明文**：MCP 的 `env` / `headers` 常含 API Key，明文落在 profile 里。任何"写入用户配置"
  的改动都要假设值可能是秘密：不要写进日志、不要回显到列表行、不要提交进仓库。

## 目录速览

```
packages/
├── plugin-kit/       # 共享基座：definePanel / createRemoteProxy / registerLocale / 自抄 UI / Markdown
│                     # + ./build 子路径（clientBundle、transpileDecorators，Node-only）
├── mcp-panel/        # MCP 服务面板（mcpAdmin Remote + patch-writer 热生效）
├── skill-panel/      # 技能面板（skillAdmin Remote + skill-scan / zip-import / 新会话预填）
├── example-panel/    # 复制即用的新面板模板（无 Remote）
└── bundled-skills/   # create-skill 的唯一内容来源（SKILL.md + references/ + scripts/validate_skill.mjs）
                      # 由 skill-panel 按内容哈希 bootstrap 升级到 ~/.agents/skills（不覆盖用户编辑）
typecheck/            # 无 harness 链接时的桩类型离线检查（排除 client-bundle.ts）
scripts/              # gen-cordis-yml.mjs / link-harness.mjs / gen-typert.mjs / typert-last-mile.mjs
```

## 验证方式

- 静态门禁：`pnpm verify`（类型 + zip 安全用例）。**任何提交前先跑它。**
- 运行期验证要在真实 harness 里打开设置页：面板是否出现、增删改是否落盘
  （`~/.dsh/profiles/<profile>/cordis.patch.yml`）、控制台是否报错。
- 用浏览器自动化验证时：
  - **合成 `el.click()` 不算真实交互**——它不产生 pointer 序列，宿主和组件的 mousedown/blur 类逻辑
    不会走。判断"宿主到底会不会做 X"必须用真实输入事件（CDP 级 `click` / `press_key`）。
    本仓库曾因此把一条错误结论写进文档，被实测直接推翻。
  - 清富文本草稿要用真实按键 `Meta+A` → `Delete`；`document.execCommand('delete')` 会被 ProseMirror
    忽略（返回 `false`）。测完确认输入框回到空且发送按钮重新 disabled。
  - 窗口最小化（`visibilityState === 'hidden'`）时截图与原生文件选择器必然失败，
    此时改用 DOM 级断言。
- 破坏性验证（删除类）要**先确认目标行**，且优先用你自己造的测试数据；不要用真实配置做删除实验。
