async function logout() {
  await fetch('/api/auth/logout',{method:'post'})
  .then(res => res.json())
  .then(data => {
    if(data.msg === 'no user') {
      alert('no user')
      document.cookie = 'BudApp=; Max-Age=-99999999;'
      window.location.replace('/login.html')
      return
    } else if (window.location != '/login.html') {
      document.cookie = 'BudApp=; Max-Age=-99999999;'
      window.location.replace('/login.html')
      return
    } else {
      document.cookie = 'BudApp=; Max-Age=-99999999;'
      window.location.replace('/login.html')
    }  
  })
  .catch(err => {
    // console.log(err)
    window.location.replace('/offLine.html')
  })
  
}

// async function logout() {
//   // fetch('/api/auth/logout')
//   await fetch('/api/auth/logout',{method:'post'})
//   .then(res => res.json())
//   .then(data => {
//     alert('logged out')
//     let { msg } = data
//     console.log(msg)  

//     // window.location.replace('/login.html')

    // document.cookie = 'BudApp=; Max-Age=-99999999;'
//     // caches.delete(CACHE_STATIC)
//     // window.location.replace('/login.html')
//     // window.location.href('/login.html')
    
//   })
// }



document.getElementById('logout').addEventListener('click', logout)