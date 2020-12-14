function logout() {
  console.log('logout')
  fetch('/api/auth/logout')
  .then(res => res.json())
  .then(data => {
    let { msg } = data
    // location.href = '/index.html'
    // document.cookie = 'BudApp=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    res.redirect('/login.html')
  })
}

document.getElementById('logout').addEventListener('click', logout)