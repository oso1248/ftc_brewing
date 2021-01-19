// WAD Settings
document.getElementById('btnWadSetClr').onclick = wadSetClr;
function wadSetClr(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  document.getElementById('wadSetting').reset();
}
document.getElementById('wadSetting').onclick = wadSetting;
function wadSetting(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let form = document.getElementsByName('wadSet');
  let currentAbw = parseFloat(form[0].value);
  let desiredAbw = parseFloat(form[1].value);
  let targetAbw = 1 - desiredAbw / currentAbw;

  form[2].value = Math.round(targetAbw * 100 * 100) / 100 + '%';
}

// Blends
document.getElementById('btnBlendClr').onclick = blendClr;
function blendClr(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  document.getElementById('blend').reset();
}
document.getElementById('btnBlendSub').onclick = blend;
function blend(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let alc = document.getElementsByName('alc');
  let cal = document.getElementsByName('cal');
  let carb = document.getElementsByName('carb');
  let vol = document.getElementsByName('vol');

  alc[3].value = Math.round(blendAve(vol, alc) * 100) / 100;
  cal[3].value = Math.round(blendAve(vol, cal) * 100) / 100;
  carb[3].value = Math.round(blendAve(vol, carb) * 100) / 100;
  vol[3].value =
    (parseFloat(vol[0].value) || 0) +
    (parseFloat(vol[1].value) || 0) +
    (parseFloat(vol[2].value) || 0);
}
function blendAve(vol, param) {
  let param1 = parseFloat(param[0].value) || 0;
  let param2 = parseFloat(param[1].value) || 0;
  let param3 = parseFloat(param[2].value) || 0;
  let vol1 = parseFloat(vol[0].value) || 0;
  let vol2 = parseFloat(vol[1].value) || 0;
  let vol3 = parseFloat(vol[2].value) || 0;
  let x =
    (param1 * vol1 + param2 * vol2 + param3 * vol3) / (vol1 + vol2 + vol3);
  return x;
}

// Top Tank
document.getElementById('btnTopClr').onclick = topClr;
function topClr(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  document.getElementById('top').reset();
}
document.getElementById('btnTopSub').onclick = topSub;
function topSub(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let form = document.getElementsByName('top');
  let currentAbw = parseFloat(form[0].value);
  let initialVol = parseFloat(form[1].value);
  let desireAbw = parseFloat(form[2].value);
  let tankCapacity = parseFloat(form[3].value);

  let targetAbw =
    (desireAbw * (initialVol + (tankCapacity - initialVol)) -
      currentAbw * initialVol) /
    (tankCapacity - initialVol);

  form[4].value = targetAbw;
}

// Conversion Factor
document.getElementById('btnFactorClr').onclick = factorClr;
function factorClr(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  document.getElementById('factor').reset();
}
document.getElementById('factor').onclick = factorSub;
function factorSub(ev) {
  ev.preventDefault();
  ev.stopPropagation();

  let form = document.getElementsByName('factor');
  let wadSetting = parseFloat(form[0].value);
  let schoeneBbls = parseFloat(form[1].value);

  let factor = Math.round((1000 / (1 - wadSetting / 100) / 1000) * 100) / 100;
  form[2].value = factor;
  form[3].value = Math.round(factor * schoeneBbls * 100) / 100;
}
