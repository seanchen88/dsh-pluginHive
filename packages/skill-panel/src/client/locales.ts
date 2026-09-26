/** Locale bundles for the Skill management panel. */

export type SkillLocaleKey =
  | 'nav' | 'title' | 'intro'
  | 'group.skills' | 'import' | 'new' | 'empty'
  | 'fromPlugin' | 'scope.user'
  | 'import.reading' | 'import.imported' | 'import.exists' | 'import.invalid' | 'import.error'
  | 'import.exists.confirm' | 'import.tooLarge'
  | 'new.copied' | 'new.hint' | 'new.prefill' | 'new.opened' | 'new.failed' | 'load.error'
  | 'view' | 'delete' | 'delete.confirm' | 'delete.done' | 'delete.failed' | 'delete.protected'
  | 'detail.title' | 'detail.loading' | 'detail.error' | 'detail.truncated' | 'modal.close'

export const en: Record<SkillLocaleKey, string> = {
  nav: 'Skills',
  title: 'Skills',
  intro: 'Extend the agent with skills (by default under .agents/skills) and create commands to simplify workflows.',
  'group.skills': 'Skills',
  import: 'Import',
  new: 'New',
  empty: 'No skills in this scope.',
  fromPlugin: 'From plugin',
  'scope.user': 'User level',
  'import.reading': 'Importing…',
  'import.imported': 'Skill imported.',
  'import.exists': 'A skill with this name already exists.',
  'import.invalid': 'Invalid skill package.',
  'import.error': 'Import failed.',
  'import.exists.confirm': 'A skill with this name already exists. Overwrite it?',
  'import.tooLarge': 'The zip is too large.',
  'new.copied': 'Copied /create-skill to the clipboard.',
  'new.hint': 'Start a new chat and paste it to create a skill with guidance.',
  'new.prefill': 'Create a skill with the following requirements:\n',
  'new.opened': 'Opened a new chat with the skill-creation prompt filled in.',
  'new.failed': 'Could not open a new chat automatically. Copy /create-skill into one to start.',
  'load.error': 'Failed to load skills.',
  view: 'View',
  delete: 'Delete',
  'delete.confirm': 'Delete skill "{name}" and its folder? This cannot be undone.',
  'delete.done': 'Skill deleted.',
  'delete.failed': 'Delete failed.',
  'delete.protected': 'Bundled with the plugin',
  'detail.title': 'Skill document',
  'detail.loading': 'Loading…',
  'detail.error': 'Could not read SKILL.md.',
  'detail.truncated': 'The file is larger than the viewer limit; the rest is not shown.',
  'modal.close': 'Close',
}

export const zh: Record<SkillLocaleKey, string> = {
  nav: '技能',
  title: '技能',
  intro: '通过技能（默认包含 .agents/skills）扩展智能体能力，创建指令简化工作流程。',
  'group.skills': '技能',
  import: '导入',
  new: '新建',
  empty: '该作用域下暂无技能。',
  fromPlugin: '来自插件',
  'scope.user': '用户级',
  'import.reading': '导入中…',
  'import.imported': '技能已导入。',
  'import.exists': '同名技能已存在。',
  'import.invalid': '技能包无效。',
  'import.error': '导入失败。',
  'import.exists.confirm': '同名技能已存在，是否覆盖？',
  'import.tooLarge': 'zip 包过大。',
  'new.copied': '已复制 /create-skill 到剪贴板。',
  'new.hint': '新建会话并粘贴，即可按引导创建技能。',
  'new.prefill': '创建一个技能，要求如下：\n',
  'new.opened': '已新建会话，并填入创建技能的引导提示词。',
  'new.failed': '未能自动新建会话，请手动新建会话并输入 /create-skill。',
  'load.error': '加载技能失败。',
  view: '查看',
  delete: '删除',
  'delete.confirm': '确定删除技能“{name}”及其目录？此操作不可撤销。',
  'delete.done': '技能已删除。',
  'delete.failed': '删除失败。',
  'delete.protected': '插件自带，不可删除',
  'detail.title': '技能内容',
  'detail.loading': '加载中…',
  'detail.error': '无法读取 SKILL.md。',
  'detail.truncated': '文件超过查看上限，剩余部分未展示。',
  'modal.close': '关闭',
}
