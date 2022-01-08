let examples = new Map<string, string>([
  [
    'fibonacci',
    `use 'range.zh'

fn int fib int n:
  ? n <= 1: <<< n
  <<< fib(n-1) + fib(n-2)

fn main
  @ i 0..15
    out fib(i)
`,
  ],
  [
    'for loop',
    `use 'range.zh'
use 'out.zh'

fn main
  @ i:=1000 i>=7 i-=7
    < i < '- 7 =' < (i - 7) <
`,
  ],
  [
    'hello world',
    `use 'out.zh'

fn main
  < 'hi world!' <
`,
  ],
  [
    'pointer arithmetic',
    `use 'range.zh'
fn main
  size := 10
  p := (malloc(sizeof(int) * size) as intP)
  out 'ptr + x'
  @ i 0..size: *(p + i) = i
  @ i 0..size: out(*(p + i))
  
  out 'x + ptr'
  @ i 0..size: *(i + p) = i
  @ i 0..size: out(*(i + p))
  
  out 'ptr - x'
  t := p + 5
  t = t - 2
  out(*t)
`,
  ],
  [
    'vector',
    `use 'range.zh'
use 'vec.zh'

fn main
  Vec<int> v
  v.ctor()
  @ i 0..10:
    v.push_back(i)
  put 'vector content: '
  v.print()
`,
  ],
  [
    'fizz buzz',
    `use 'range.zh'
use 'out.zh'

fn fizz_buzz int mx
  @ i 1..mx+1
    ? i %% 15: <'FizzBuzz'<
    | i %% 3: <'Fizz'<
    | i %% 5: <'Buzz'<
    \\ <i<

fn main: fizz_buzz(20)
`,
  ],
  [
    'int types',
    `use 'out.zh'

fn main
  < 'Literals:' <
  < 'Dec 100:' < 100 <
  < 'Hex 0xff:' < 0xff <
  < 'Bin 0b101:' < 0b101 < '\\n' < 

  _u8 := 8u8
  _u16 := 16u16
  _u32 := 32u32
  _u64 := 64u64

  _i8 := 8i8
  _i16 := 16i16
  _i32 := 32i32
  _i64 := 64i64

  < 'Enter values of u8, u16, u32, u64, i8, i16, i32 and i64' <
  > _u8 > _u16 > _u32 > _u64 > _i8 > _i16 > _i32 > _i64

  < 'Unsinged:' < < _u8 < _u16 < _u32 < _u64 <

  < 'Singed:' < < _i8 < _i16 < _i32 < _i64 <

  _u8 = 0u8 - 1u8
  _u16 = 0u16 - 1u16
  _u32 = 0u32 - 1u32
  _u64 = 0u64 - 1u64

  _i8 = 0i8 - 1i8
  _i16 = 0i16 - 1i16
  _i32 = 0i32 - 1i32
  _i64 = 0i64 - 1i64

  < 'Unsinged -1:' < < _u8 < _u16 < _u32 < _u64 <
  < 'Singed -1:' < < _i8 < _i16 < _i32 < _i64 <
`,
  ],

  [
    'brainfuck',
    `use 'out.zh'
    
fn brainfuck str s
  p := malloc(3000) as charP b := 0
  @ i 0..strlen(s): v := *p c := s^i
    ? c == '>': ++(p as i64)
    | c == '<': --(p as i64)
    | c == '+': ++(*p)
    | c == '-': --(*p)
    | c == '.': put v
    | c == ',': >(*p)
    | c == '[': ? !v: ++b
      @ ! !b: ++i
        ? s^i == '[': ++b
        ? s^i == ']': --b
    | c == ']': ? ! !v:
        ? c == ']': ++b
        @ ! !b: --i
          ? s^i == '[': --b
          ? s^i == ']': ++b
        --i

/** Hello world! */
fn main: brainfuck(\`
  ++++++++[>++++[>++>+++>+++>+<<<<-]>+>->+>>
  +[<]<-]>>.>>---.+++++++..+++.>.<<-.>.+++.-
  -----.--------.>+.>++.
  \`)
`,
  ],
  [
    'std brainfuck',
    `use 'brainfuck.zh'

fn main
  < '[Hello World!]' <
  brainfuck(\`
    ++++++++[>++++[>++>+++>+++>+<<<<-]>+>->+
    >>+[<]<-]>>.>>---.+++++++..+++.>.<<-.>.+
    ++.------.--------.>+.>++.
    \`)

  // /** SLOOOOOOW */
  // < '[Sierpinski Triangle]' <
  // brainfuck(\`
  //   ++++++++[>+>++++<<-]>++>>+<[-[>>+<<-]+>>]>+[-
  //   <<<[->[+[-]+>++>>>-<<]<[<]>>++++++[<<+++++>>-
  //   ]+<<++.[-]<<]>.>+[>>]>+]
  //   \`)
     
  < '[echo 5 symbols]' <
  brainfuck(\`+++++[>,.<-]\`)
`,
  ],
])
export default examples
