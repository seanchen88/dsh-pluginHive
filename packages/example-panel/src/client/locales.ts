/** Locale bundles for the example (template) panel. */

export type ExampleLocaleKey = 'nav' | 'title' | 'intro'

export const en: Record<ExampleLocaleKey, string> = {
  nav: 'Example',
  title: 'Example panel',
  intro: 'This section is the copy-me skeleton for adding a new management panel.',
}

export const zh: Record<ExampleLocaleKey, string> = {
  nav: '示例',
  title: '示例面板',
  intro: '本分区是新增管理面板的“复制即用”骨架。',
}
