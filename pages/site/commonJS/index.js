function logout() {
  fetch('/api/auth/logout')
  .then(res => res.json())
  .then(data => {
    let { msg } = data
    location.href = '/index.html'
  })
}

document.getElementById('logout').addEventListener('click', logout)


