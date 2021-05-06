String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
String.prototype.toNonAlpha = function (spaces) {
  if (spaces === '') {
    return this.replace(/[^\w\s]/gi, '').replace(/ +(?= )/g, '');
  } else {
    return this.replace(/[^0-9a-z]/gi, '');
  }
};
String.prototype.testNanFormat = function () {
  return /^\d+(\.\d{1,2})?$/.test(this);
};

//Add
document.getElementById('btnClear').addEventListener('click', (ev) => {
  ev.preventDefault();
  document.getElementById('frmAdd').reset();
});

document.getElementById('btnSubmit').addEventListener('click', sendAdd);
async function sendAdd(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  const form = document.getElementById('frmAdd');
  let data = {};
  let i;
  for (i = 0; i < form.length - 2; i++) {
    let id = form.elements[i].id;
    let name = form.elements[i].value;
    data[id] = name;
  }

  let fails = await validateAdd(data);
  if (fails.length === 0) {
    data.labels = ['bug'];
    let query = '/api/enviro/token';
    let { data: token } = await axios.post(query).catch((err) => alert(err));
    data.body = data.body + `\n\nSubmitted By: ${token.user}`;

    axios({
      method: 'post',
      url: 'https://api.github.com/repos/oso1248/ftc_brewing/issues',
      headers: { Authorization: token.key },
      responseType: 'json',
      data: data,
    })
      .then(function (res) {
        let { data } = res;
        alert(`New Issue Created With Title: ${data.title}\n\nThank You`);
        window.history.back();
      })
      .catch((err) => alert(err));
  } else {
    let msg = 'Problems:\n';
    for (i = 0; i < fails.length; i++) {
      msg = msg + '\n' + fails[i]['input'] + ' ' + fails[i]['msg'];
    }
    alert(msg);
  }
}
async function validateAdd(data) {
  let failures = [];

  if (!data.title) {
    failures.push({ input: 'title', msg: 'Required' });
  } else {
    data.title = data.title.toUpperCase();
  }

  if (data.body === '') {
    failures.push({ input: 'description', msg: 'Required' });
    data.body = null;
  } else {
    data.body = data.body.toProperCase();
  }

  return failures;
}

document.getElementById('btnBack').addEventListener('click', () => {
  window.history.back();
});
