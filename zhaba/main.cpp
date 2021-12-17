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
EMSCRIPTEN_KEEPALIVE void hi() {
  std::ofstream of("std/file.txt");
  of << "impostor";
  of.close();
  std::ifstream f("std/file.txt");
  std::ifstream f2("std/file2.txt");
  std::string s;
  std::string s2;
  f >> s;
  f2 >> s2;
  std::cout << s << std::endl;
  std::cout << s2 << std::endl;
}

std::string output;
EMSCRIPTEN_KEEPALIVE void zh_run_main() {
  zhdata.bools["B"] = true;
  zhdata.bools["show_bytecode"] = true;

  std::stringstream ss;

  zhdata.out = &ss;
  std::filesystem::path file_path = "main.zh";
  try {
    zhdata.std_path = "std";
    compileFile(file_path);
    output = ss.str();
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
  zh_run_main();
}