async function logout() {
  
  fetch('/api/auth/logout')
  .then(res => res.json())
  .then(data => {
    let { msg } = data
    document.cookie = 'BudApp=; Max-Age=-99999999;'
    
    window.location.replace('/login/login.html')
  })
}

document.getElementById('logout').addEventListener('click', logout)