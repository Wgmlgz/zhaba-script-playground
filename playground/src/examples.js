export let fibonacci = `use 'range.zh'

fn int fib int n:
  ? n <= 1: <<< n
  <<< fib(n-1) + fib(n-2)

fn main
  @ i 0..15
    out fib(i)
`;

export let for_loop = `use 'range.zh'
use 'out.zh'

fn main
  @ i:=1000 i>=7 i-=7
    < i < '- 7 =' < (i - 7) <
`;

export let hello_world = `use 'out.zh'

fn main
  < 'hi world!' <
`;

export let pointer_arithmetic = `use 'range.zh'
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
`;

export let vector = `use 'range.zh'
use 'vec.zh'

fn main
  Vec<int> v
  v.ctor()
  @ i 0..10:
    v.push_back(i)
  put 'vector content: '
  v.print()
`;
