document.getElementById('submit').addEventListener('click', login)
const api = '/api/auth/login'

function login(ev) {
  ev.preventDefault() 
  ev.stopPropagation()

  var form = document.getElementById('form')
  let data = {}
  let i
    
  for (i = 0; i < form.length - 1; i++) {
    let id = form.elements[i].id
    let name = form.elements[i].value
    data[id] = name
  }
  fetch(api, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(data => {
    let { msg } = data
    if(msg === 'pass'){
      
      window.location.href='../index.html'
      // window.location.replace('/')
    } else {
      alert('Invalid username or password')
    }
  })
}