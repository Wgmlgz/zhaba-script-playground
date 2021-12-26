#include "em.hpp"
#include <iostream>
#include <fstream>
#include <string>
#include <sstream>
/*0*/ #include "../Zhaba-script/src/Parser/Parser.hpp"
/*1*/ #include "../Zhaba-script/src/Compiler/Compiler.hpp"
/*2*/ #include "../Zhaba-script/src/TreeLib/TreeLib.hpp"
/*3*/ #include "../Zhaba-script/src/Interpreter/ToBytecode.hpp"

extern "C" {
std::string output;
EMSCRIPTEN_KEEPALIVE void zh_run_main(const char* input) {
  zhdata.bools["B"] = true;

  std::stringstream out_stream;
  std::stringstream in_stream;

  zhdata.out = &out_stream;
  zhdata.in = &in_stream;
  in_stream << input;
  std::filesystem::path file_path = "main.zh";
  try {
    zhdata.std_path = "Zhaba-script/std";
    compileFile(file_path);
    output = out_stream.str();
    std::cout << "output: " << output << std::endl;
  } catch (ParserError err) {
    std::cout << err.toString();
    output = err.toString();
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

int main() {
  zh_run_main("");
}