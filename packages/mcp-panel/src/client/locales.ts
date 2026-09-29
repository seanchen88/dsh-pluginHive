/** Locale bundles for the MCP management panel. */

export type McpLocaleKey =
  | 'nav' | 'title' | 'intro' | 'docs' | 'add'
  | 'scope.user' | 'empty'
  | 'tools' | 'tools.none' | 'tools.loading' | 'tools.emptyNow' | 'timeout' | 'enabled' | 'disabled'
  | 'fromPlugin' | 'edit' | 'delete' | 'delete.confirm'
  | 'restartRequired' | 'transport' | 'transport.stdio' | 'transport.http'
  | 'url' | 'command' | 'args' | 'env' | 'serverName' | 'save' | 'cancel'
  | 'form.title.add' | 'form.title.edit' | 'form.headers' | 'form.cwd' | 'form.pairsHint'
  | 'secrets.stored'
  | 'modal.close'
  | 'load.error'
  | 'status.connected' | 'status.failed' | 'status.probing' | 'status.disabled' | 'status.applying'

export const en: Record<McpLocaleKey, string> = {
  nav: 'MCP Servers',
  title: 'MCP Servers',
  intro: 'Install new MCP servers to give the agent more tools. See the docs to learn more.',
  docs: 'Docs',
  add: 'Add',
  'scope.user': 'User level',
  empty: 'No MCP servers configured yet.',
  tools: 'Tools',
  'tools.none': 'No tools loaded — the server may not be connected yet.',
  'tools.loading': 'Loading tools… the server is starting, syncing, or reconnecting.',
  'tools.emptyNow': 'No tools yet — the server is up but has not registered any. Reopen after a moment.',
  timeout: 'Request timeout',
  enabled: 'Enabled',
  disabled: 'Disabled',
  fromPlugin: 'From plugin',
  edit: 'Edit',
  delete: 'Delete',
  'delete.confirm': 'Delete MCP server "{name}" and remove it from your profile? This cannot be undone.',
  restartRequired: 'Saved. Restart the app to apply this change.',
  transport: 'Transport',
  'transport.stdio': 'STDIO',
  'transport.http': 'Streamable HTTP',
  url: 'URL',
  command: 'Command',
  args: 'Arguments',
  env: 'Environment',
  serverName: 'Server name',
  save: 'Save',
  cancel: 'Cancel',
  'modal.close': 'Close',
  'form.title.add': 'Add MCP server',
  'form.title.edit': 'Edit MCP server',
  'form.headers': 'Headers',
  'form.cwd': 'Working directory',
  'form.pairsHint': 'one KEY=value per line',
  'secrets.stored': 'Values are stored in plain text in the profile patch file.',
  'load.error': 'Failed to load MCP servers.',
  'status.connected': '{n} tools',
  'status.failed': 'Not connected',
  'status.probing': 'Checking…',
  'status.disabled': 'Disabled',
  'status.applying': 'Applying…',
}

export const zh: Record<McpLocaleKey, string> = {
  nav: 'MCP 服务',
  title: 'MCP 服务',
  intro: '安装新的 MCP 服务为智能体扩展更多工具。如需了解更多，可查看',
  docs: '文档',
  add: '添加',
  'scope.user': '用户级',
  empty: '尚未配置任何 MCP 服务。',
  tools: '工具',
  'tools.none': '未加载工具 —— 服务可能尚未连接。',
  'tools.loading': '正在加载工具… 服务在启动、握手或重连中。',
  'tools.emptyNow': '暂无工具 —— 服务已连接但没有注册任何工具，稍等后重新展开查看。',
  timeout: '请求超时时长',
  enabled: '已启用',
  disabled: '已停用',
  fromPlugin: '来自插件',
  edit: '编辑',
  delete: '删除',
  'delete.confirm': '确定删除 MCP 服务“{name}”并从 profile 中移除？此操作不可撤销。',
  restartRequired: '已保存。重启应用后生效。',
  transport: '传输方式',
  'transport.stdio': 'STDIO',
  'transport.http': 'Streamable HTTP',
  url: 'URL',
  command: '命令',
  args: '参数',
  env: '环境变量',
  serverName: '服务名称',
  save: '保存',
  cancel: '取消',
  'modal.close': '关闭',
  'form.title.add': '添加 MCP 服务',
  'form.title.edit': '编辑 MCP 服务',
  'form.headers': '请求头',
  'form.cwd': '工作目录',
  'form.pairsHint': '每行一个 KEY=value',
  'secrets.stored': '这些值以明文保存在 profile 的补丁文件中。',
  'load.error': '加载 MCP 服务失败。',
  'status.connected': '{n} 个工具',
  'status.failed': '未连接',
  'status.probing': '检测中…',
  'status.disabled': '已停用',
  'status.applying': '正在生效…',
}
