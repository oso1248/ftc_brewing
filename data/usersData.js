const brewery = [
  {id: 1, brewery: 'Fort Collins', note: ''},
  {id: 2, brewery: 'Houston', note: ''},
  {id: 3, brewery: 'Los Angeles', note: ''},
  {id: 4, brewery: 'Newark', note: ''},
  {id: 5, brewery: 'Cartersville', note: ''}
]

const user = [
  {id: 1,username: 'coulsona', password: 'coulson', email: 'coulson@gmail.com', permissions: 5,brewery_id: 1},
  {id: 2,username: 'hinkelr', password: 'hinkel', email: 'hinkel@gmail.com', permissions: 5,brewery_id: 2},
  {id: 3,username: 'castroa', password: 'castro', email: 'castro@gmail.com', permissions: 3,brewery_id: 3},
  {id: 4,username: 'creenciat', password: 'creencia', email: 'creencia@gmail.com', permissions: 1,brewery_id: 4},
  {id: 5,username: 'davise', password: 'davis', email: 'davis@gmail.com', permissions: 1,brewery_id: 5}
]

module.exports = {
  brewery,
  user
}