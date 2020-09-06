function logout() {
  fetch('/api/auth/logout')
  .then(res => res.json())
  .then(data => {
    let { msg } = data
    location.href = '/login.html'
  })
}

document.getElementById('logout').addEventListener('click', logout)


