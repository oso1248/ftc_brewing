const db = require('../dbConfig')

async function com(data){
  let rtn = await db('mtl_commodity').select('id').where('commodity', data['com_id'])
  let {id} = rtn[0]
  data['com_id'] = id
  return data
}


async function add(data) {
  await com(data)  
  
  const [{com_id}] = await db('mtl_commodity').insert(data, ['com_id'])
  return getByName(commodity)
}