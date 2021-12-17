import WWasmModule from "./build.mjs";

export let hi = () => null;
export let zh_run_main = () => null;
export let zh_get_output = () => null;
export let zh_set_main = () => null;

export let is_init = false;



export function zh_init() {
  is_init = false;
  WWasmModule().then((Module) => {
    hi = Module.cwrap("hi");
    zh_run_main = Module.cwrap("zh_run_main");
    zh_get_output = Module.cwrap("zh_get_output", "string");
    zh_set_main = Module.cwrap("zh_set_main", "v", ["string"]);
    is_init = true;
  });
}