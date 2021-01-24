async function logout() {
  await fetch('/api/auth/logout', { method: 'post' })
    .then((res) => res.json())
    .then((data) => {
      if (data.msg === 'no user') {
        alert('no user');
        caches
          .keys()
          .then((keys) => {
            return caches.open(keys);
          })
          .then((cache) => {
            cache.delete('/pgAdmin/admin.html');
            cache.delete('/pgMaterials/material.html');
          });
        document.cookie = 'BudApp=; Max-Age=-99999999;';
        window.location.replace('/login.html');
        return;
      } else if (window.location != '/login.html') {
        caches
          .keys()
          .then((keys) => {
            return caches.open(keys);
          })
          .then((cache) => {
            cache.delete('/pgAdmin/admin.html');
            cache.delete('/pgMaterials/material.html');
          });
        document.cookie = 'BudApp=; Max-Age=-99999999;';
        window.location.replace('/login.html');
        return;
      } else {
        caches
          .keys()
          .then((keys) => {
            return caches.open(keys);
          })
          .then((cache) => {
            cache.delete('/pgAdmin/admin.html');
            cache.delete('/pgMaterials/material.html');
          });
        document.cookie = 'BudApp=; Max-Age=-99999999;';
        window.location.replace('/login.html');
      }
    })
    .catch((err) => {
      window.location.replace('/offLine.html');
    });
}

document.getElementById('logout').addEventListener('click', logout);
