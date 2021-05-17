document.getElementById('submit').addEventListener('click', login);
const api = '/api/auth/login';

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

function login(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  var form = document.getElementById('form');
  let data = {};
  let i;

  for (i = 0; i < form.length - 1; i++) {
    let id = form.elements[i].id;
    let name = form.elements[i].value;
    data[id] = name;
  }
  fetch(api, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      let { msg, permissions } = data;
      if (msg === 'pass') {
        setCookie('perm', permissions, '4321');
        window.location.href = '../index.html';
      } else {
        alert('Invalid username or password');
      }
    });
}
