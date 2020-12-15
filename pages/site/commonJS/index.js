function logout() {
  
  fetch('/api/auth/logout')
  .then(res => res.json())
  .then(data => {
    let { msg } = data
    console.log('logout')
    window.location.replace('/login/login.html')
  })
}

document.getElementById('logout').addEventListener('click', logout)