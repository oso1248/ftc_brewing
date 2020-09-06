const brewery = [
  {id: 1, brewery: 'Fort Collins', note: ''},
  {id: 2, brewery: 'Houston', note: ''},
  {id: 3, brewery: 'Los Angeles', note: ''},
  {id: 4, brewery: 'Newark', note: ''},
  {id: 5, brewery: 'Cartersville', note: ''}
]

const user = [
  {id: 1,username: 'patrick', password: '$2a$06$hxCTGG5Hu6drA6sIeb76pu74XOwHsWaVgcZKyoDMY7y7V4VMmGRA.', email: 'patrick@bud.com', permissions: 5,brewery_id: 1},
  {id: 2,username: 'adam', password: '$2a$06$Zv0olDgxHsy38Upq5ESckO551Q1WxB/RT/SJ9tg/a562b2E1XCoH.', email: 'adam@bud.com', permissions: 5,brewery_id: 2},
  {id: 3,username: 'greg', password: '$2a$06$jkuh85zYYR6bnQ.UF0Of6.abozDXoDwgGVklsJ2z0BKk4.fDU9Wb2', email: 'greg@bud.com', permissions: 3,brewery_id: 3},
  {id: 4,username: 'tony', password: '$2a$06$RobcFzpQduFSZflSiWyTMOSUtOR7nKkKpnGamwlQ817yl9Fibal7a', email: 'tony@bud.com', permissions: 1,brewery_id: 4},
  {id: 5,username: 'denny', password: '$2a$06$YlEPsZ7VKm0naCzccg4FvupHRaiDcdjpvRzy3tSOy4nNFtYmd4Z4C', email: 'denny@bud.com', permissions: 1,brewery_id: 5}
]

module.exports = {
  brewery,
  user
}