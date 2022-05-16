#include <fstream>
#include <iostream>
#include <sstream>
#include <string>

#include "../zhaba-script/src/compiler/compiler.hpp"
#include "../zhaba-script/src/interpreter/to_bytecode.hpp"
#include "../zhaba-script/src/parser/parser.hpp"
#include "../zhaba-script/src/tree_lib/TreeLib.hpp"
#include "em.hpp"

extern "C" {
std::string output;
EMSCRIPTEN_KEEPALIVE void zh_run_main(const char* input) {
  zhdata = ZHDATA();
  zhdata.flags["B"] = true;

  std::stringstream out_stream;
  std::stringstream in_stream;

  zhdata.out = &out_stream;
  zhdata.in = &in_stream;
  in_stream << input;
  std::filesystem::path file_path = "main.zh";
  try {
    zhdata.std_path = "zhaba-script/std";
    compileFile(file_path);
    output = out_stream.str();
    std::cout << "output: " << output << std::endl;
  } catch (ParserError err) {
    std::cout << err.what();
    output = err.what();
  } catch (zhin::RuntimeError err) {
    std::cout << err.what();
    output = err.what();
  } catch (const std::exception& err) {
    std::cout << err.what() << std::endl;
    output = err.what();
  }
}
EMSCRIPTEN_KEEPALIVE const char* zh_get_output() { return output.c_str(); }
EMSCRIPTEN_KEEPALIVE void zh_set_main(const char* str) {
  std::ofstream f("main.zh");
  f << str;
  f.close();
}
}

int main() { zh_run_main(""); }