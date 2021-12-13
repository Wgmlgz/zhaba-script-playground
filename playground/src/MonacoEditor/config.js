import { monaco, window } from "@monaco-editor/react";
import { Registry } from "monaco-textmate";
import { wireTmGrammars } from "monaco-editor-textmate";
import { loadWASM } from "onigasm";
import theme  from "./theme.js";
let loaded = false;

export async function rewireEditor() {
  if (!loaded) {
    await loadWASM("/onigasm.wasm");
    loaded = true;
  }

  await monaco.init().then(monaco => {
    const registery = new Registry({
      getGrammarDefinition: async scopeName => {
        return {
          format: "json",
          content: await (await fetch("./zh.tmLanguage.json")).text()
        };
      }
    });
    const grammars = new Map();
    grammars.set("zh", "source.zhm");
    monaco.languages.register({
      id: "zh",
      configuration: process.env.PUBLIC_URL + `/language-configuration.json`,
    });
    monaco.editor.defineTheme("one-dark-pro", theme);
    wireTmGrammars(monaco, registery, grammars);
  });
}
