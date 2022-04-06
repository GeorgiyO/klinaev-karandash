const {sin, sqrt, PI} = Math;

const in_G = document.getElementById("in_G");
const in_alpha = document.getElementById("in_alpha");
const in_len_start = document.getElementById("in_len_start");
const in_len_end = document.getElementById("in_len_end");

function get_number(input) {
  return Number.parseFloat(input.value);
}

function getG() {
  return get_number(in_G);
}

function getAlpha() {
  return get_number(in_alpha);
}

function getLenStart() {
  return get_number(in_len_start);
}

function getLenEnd() {
  return get_number(in_len_end);
}

[in_G, in_len_start, in_len_end, in_alpha].forEach(input => input.onchange = redraw);

function calcFallTime(length) {
    let dt = 0.0001;
    
    let _phi, phi;
    let _om, om;
    let _t, t;
    
    _phi = getAlpha();
    _om = 0;
    _t = 0;
    
    while (_phi < PI / 2) {
        t = _t + dt;
        om = _om + 1.5 * getG() * dt * sin(_phi) / length;
        phi = _phi + _om * dt;
        _t = t; _om = om; _phi = phi;
    }
    
    return t;
}

function redraw() {
  let x = [];
  let lenStart = getLenStart();
  let lenEnd = getLenEnd();
  let dl = (lenEnd - lenStart) / 10;
  new Array(11).fill(0).map((_, i) => lenStart + dl * i)
               .forEach(it => x.push(it));
  draw({
    x,
    y: [{
      label: "Time of fall",
      color: "#ff0000",
      data: x.map(calcFallTime)
    }]
  });
}

function prepareDrawData(data) {
  let labels = data.x;
  let datasets = data.y;
  return {
    labels,
    datasets: datasets.map(ds => {
      return {
        label: ds.label,
        backgroundColor: ds.color,
        borderColor: ds.color,
        data: ds.data
      };
    })
  };
}

let currentCanvas = null;

function draw(data) {
  if (currentCanvas != null) currentCanvas.destroy();
  currentCanvas = new Chart(
    document.getElementById("myChart"),
    {
      type: "line",
      data: prepareDrawData(data),
      options: {}
    }
  );
}

redraw();
