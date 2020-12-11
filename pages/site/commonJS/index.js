function logout() {
  console.log('logout')
  fetch('/api/auth/logout')
  .then(res => res.json())
  .then(data => {
    let { msg } = data
    // location.href = '/index.html'
    res.redirect('/login.html')
  })
}

document.getElementById('logout').addEventListener('click', logout)