cmake_minimum_required(VERSION 3.21)
project(zhaba)
set(CMAKE_CXX_STANDARD 20)


include_directories(zhaba-script/src/compiler)
include_directories(zhaba-script/src/interpreter)
include_directories(zhaba-script/src/lang)
include_directories(zhaba-script/src/libs)
include_directories(zhaba-script/src/parser)
include_directories(zhaba-script/src/tree_lib)
include_directories(zhaba-script/src/zhaba)
include_directories(tests)


set(lib          
  zhaba-script/src/compiler/compiler.hpp
  zhaba-script/src/compiler/tables.hpp
  zhaba-script/src/compiler/module_compiler.hpp
  zhaba-script/src/compiler/to_c.hpp
  zhaba-script/src/compiler/to_c.cpp
  zhaba-script/src/interpreter/bytecode.hpp
  zhaba-script/src/interpreter/heap.hpp
  zhaba-script/src/interpreter/instructions.hpp
  zhaba-script/src/interpreter/stack.hpp
  zhaba-script/src/interpreter/to_bytecode.hpp
  zhaba-script/src/interpreter/zhvm.hpp
  zhaba-script/src/lang/ast.hpp
  zhaba-script/src/lang/expression.hpp
  zhaba-script/src/lang/generics.hpp
  zhaba-script/src/lang/lang.hpp
  zhaba-script/src/lang/lang_tables.hpp
  zhaba-script/src/lang/scope.hpp
  zhaba-script/src/lang/scope.cpp
  zhaba-script/src/lang/syntax_tree.hpp
  zhaba-script/src/lang/token.cpp
  zhaba-script/src/lang/token.hpp
  zhaba-script/src/lang/types.hpp
  zhaba-script/src/lang/zhdata.hpp
  zhaba-script/src/libs/termcolor.hpp
  zhaba-script/src/parser/ast_parser.hpp
  zhaba-script/src/parser/definitions_parser.hpp
  zhaba-script/src/parser/expression_parser.hpp
  zhaba-script/src/parser/lexer.hpp
  zhaba-script/src/parser/parser.hpp
  zhaba-script/src/lang/parser_error.hpp
  zhaba-script/src/parser/preprocess.hpp
  zhaba-script/src/parser/syntax_tree_parser.hpp
  zhaba-script/src/parser/type_parser.hpp
  zhaba-script/src/tree_lib/Tree.hpp
  zhaba-script/src/tree_lib/TreePrinterASCII.hpp
  zhaba-script/src/tree_lib/TreeLib.hpp
  zhaba-script/src/zhaba/CmdOptios.hpp
  zhaba-script/src/lang/expression.cpp
  zhaba-script/src/lang/types.cpp
  zhaba-script/src/lang/ast.cpp
  zhaba-script/src/lang/generics.cpp
  zhaba-script/src/lang/syntax_tree.cpp
  zhaba-script/src/lang/parser_error.cpp
  zhaba-script/src/lang/zhdata.cpp
  zhaba-script/src/lang/lang_tables.cpp
  zhaba-script/src/interpreter/runtime_error.cpp
  zhaba-script/src/interpreter/runtime_error.hpp
  zhaba-script/src/parser/type_parser.cpp
  zhaba-script/src/parser/syntax_tree_parser.cpp
  zhaba-script/src/parser/definitions_parser.cpp
  zhaba-script/src/parser/expression_parser.cpp
  zhaba-script/src/parser/ast_parser.cpp
  zhaba-script/src/parser/lexer.cpp
  zhaba-script/src/parser/preprocess.cpp
  zhaba-script/src/interpreter/to_bytecode.cpp
  zhaba-script/src/interpreter/bytecode.cpp
  zhaba-script/src/interpreter/heap.cpp
  zhaba-script/src/interpreter/stack.cpp)

add_executable(zhaba ${lib} zhaba/main.cpp)

if (${CMAKE_SYSTEM_NAME} MATCHES "Emscripten")
    add_definitions( "-s NO_DISABLE_EXCEPTION_CATCHING -O3" )
    set_target_properties( zhaba
        PROPERTIES
        ARCHIVE_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/playground/src/zhaba"
        LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/playground/src/zhaba"
        RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/playground/src/zhaba"
    )
    set_target_properties(
        zhaba
        PROPERTIES 
            OUTPUT_NAME "build"
            SUFFIX ".mjs"
    )
    set_target_properties(zhaba PROPERTIES LINK_FLAGS [=[ -o playground/src/zhaba/build.mjs -s NO_DISABLE_EXCEPTION_CATCHING	  --no-entry     -s ENVIRONMENT='web' 	  -s SINGLE_FILE=1  	  -s EXPORT_NAME='WWasmModule' 	  -s USE_ES6_IMPORT_META=0  	  -s TOTAL_MEMORY=50MB 	  --std=c++20     -s "EXPORTED_FUNCTIONS=["_malloc", "_free"]"  	  -s "EXPORTED_RUNTIME_METHODS=["ccall", "cwrap"]"  	   	  -O3  --embed-file ./zhaba-script/std    ]=])
endif()

install(TARGETS zhaba)

# ------------------- TESTS -------------------

# include(FetchContent)
# FetchContent_Declare(
#   googletest
#   URL https://github.com/google/googletest/archive/609281088cfefc76f9d0ce82e1ff6c30cc3591e5.zip
# )
# # For Windows: Prevent overriding the parent project's compiler/linker settings
# set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)
# FetchContent_MakeAvailable(googletest)

# enable_testing()

# add_executable(
#   zhaba_test
#    ${lib} tests/misc.cpp
# )
# target_link_libraries(
#   zhaba_test
#   gtest_main
# )

# include(GoogleTest)
# gtest_discover_tests(zhaba_test)