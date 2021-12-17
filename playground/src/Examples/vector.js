let program = `use 'range.zh'
use 'vec.zh'

fn main
  Vec<int> v
  v.ctor()
  @ i 0..10:
    v.push_back(i)
  put 'vector content: '
  v.print()

`;
export default program;
