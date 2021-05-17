// const perm5 = require('../../../api/auth/perm5');

function setCookie(cookieName, cookieValue, hoursToExpire, path, domain) {
  let date = new Date();
  date.setTime(date.getTime() + hoursToExpire * 60 * 60 * 1000);
  document.cookie = cookieName + '=' + cookieValue + '; expires=' + date.toGMTString() + 'path=' + path + 'domain=' + domain;
}
function getCookie(cookieName) {
  var cookieValue = document.cookie.match('(^|;)\\s*' + cookieName + '\\s*=\\s*([^;]+)');
  return cookieValue ? cookieValue.pop() : '';
}
function deleteCookie(cookieName) {
  document.cookie = cookieName + '=; max-age=0; expires=0';
}
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
        alert(getCookie('perm'));
        deleteCookie('BudApp');
        deleteCookie('perm');
        // document.cookie = 'BudApp=; Max-Age=-99999999;';
        // document.cookie = 'perm=; Max-Age=-99999999;';
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
        deleteCookie('BudApp');
        deleteCookie('perm');
        // document.cookie = 'BudApp=; Max-Age=-99999999;';
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
        deleteCookie('BudApp');
        deleteCookie('perm');
        // document.cookie = 'BudApp=; Max-Age=-99999999;';
        window.location.replace('/login.html');
      }
    })
    .catch((err) => {
      window.location.replace('/offLine.html');
    });
}

let perm = getCookie('perm');
let perm5 = document.getElementById('perm5');
let perm4 = document.getElementById('perm4');
let perm3 = document.getElementById('perm3');
let perm2brw = document.getElementById('perm2brw');
let perm2fin = document.getElementById('perm2fin');

if (perm >= 5 && perm5 && perm4 && perm3 && perm2brw && perm2fin) {
  console.log('5');
  perm5.style.display = 'block';
  perm4.style.display = 'block';
  perm3.style.display = 'block';
  perm2brw.style.display = 'block';
  perm2fin.style.display = 'block';
} else if (perm >= 4 && perm4 && perm3 && perm2brw && perm2fin) {
  console.log('4');
  perm4.style.display = 'block';
  perm3.style.display = 'block';
  perm2brw.style.display = 'block';
  perm2fin.style.display = 'block';
} else if (perm >= 3 && perm3 && perm2brw && perm2fin) {
  console.log('3');
  perm3.style.display = 'block';
  perm2brw.style.display = 'block';
  perm2fin.style.display = 'block';
} else if (perm >= 2 && perm2brw && perm2fin) {
  console.log('2');
  perm2brw.style.display = 'block';
  perm2fin.style.display = 'block';
}

let logOutButton = document.getElementById('logout');
if (logOutButton) {
  document.getElementById('logout').addEventListener('click', logout);
}
