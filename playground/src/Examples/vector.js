let program = 
`use 'vec.zh'

fn main
  Vec<int> v
  v.ctor()
  
  v <<= 1
  v <<= 2
  v <<= 3
  v <<= 4
  
  v.print()

  v.dtor()
`;
export default program;
