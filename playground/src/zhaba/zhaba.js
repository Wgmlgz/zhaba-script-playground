import WWasmModule from "./build.mjs";

export let hi = () => null;

export let is_init = false;

WWasmModule().then((Module) => {
  hi = Module.cwrap("hi");
  is_init = true;
});
