import { monaco } from '@monaco-editor/react'
import { Registry } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'
import { loadWASM } from 'onigasm'
import theme from './theme'
let loaded = false

export async function rewireEditor() {
  if (!loaded) {
    await loadWASM(process.env.PUBLIC_URL + '/onigasm.wasm')
    loaded = true
  }

  await monaco.init().then(monaco => {
    monaco.languages.register({
      id: 'zh',
      configuration: process.env.PUBLIC_URL + '/language-configuration.json',
    })
    monaco.editor.defineTheme('one-dark-pro', theme)
    wireTmGrammars(
      monaco,
      new Registry({
        getGrammarDefinition: async () => ({
          format: 'json',
          content: await (
            await fetch(
              'https://raw.githubusercontent.com/Wgmlgz/zhaba-script-vscode/main/zhaba-script/syntaxes/zh.tmLanguage.json'
            )
          ).json(),
        }),
      }),
      new Map([['zh', 'source.zhm']])
    )
  })
}
