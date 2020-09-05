document.getElementById('get').addEventListener('click', get)
// document.getElementById('post').addEventListener('click', post)
// document.getElementById('patch').addEventListener('click', patch)

function get() {
  axios.get('/api/supplier/')
    .then(res => console.log(res.data))
}

// function post() {
//   axios.post('/api/supplier', {
//     company: "Walmart",
//     contact: "Tarrah Creencia",
//     email: "tarrah.creencia@gmail.com",
//     phone: "970-490-1234",
//     address: "1223 Otto Rd Cheyenne WY 82001",
//     note: "This is a test note."
//   })
//     .then(res => console.log(res.data))
// }

// function patch() {
//   axios.patch('/api/supplier/Budweiser', {
//     contact: "Adam Coulson",
//     email: "tarrah.creencia@gmail.com",
//     phone: "970-490-1234",
//     address: "1223 Otto Rd Cheyenne WY 82001",
//     note: "This is a test note."
//   })
//   .then(console.log(res.data))
// }