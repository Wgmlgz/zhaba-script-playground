import WWasmModule from './build.mjs'

export let zh_run_main = (_: string) => null
export let zh_get_output = () => ''
export let zh_set_main = (_: string) => null

export const zh_init = async () => {
  const Module = await WWasmModule()
  zh_run_main = Module.cwrap('zh_run_main', 'v', ['string'])
  zh_get_output = Module.cwrap('zh_get_output', 'string')
  zh_set_main = Module.cwrap('zh_set_main', 'v', ['string'])
}
