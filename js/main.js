const {log, sin, sqrt} = Math;

const in_G = document.getElementById("in_G");
const in_alpha = document.getElementById("in_alpha");
const in_len_start = document.getElementById("in_len_start");
const in_len_end = document.getElementById("in_len_end");

function getG() {
  return Number.parseFloat(in_G.value);
}

function getAlpha() {
  return Number.parseFloat(in_alpha.value);
}

function getLenStart() {
  return Number.parseInt(in_len_start.value);
}

function getLenEnd() {
  function Number.parseInt(in_len_end.value);
}

[in_G, in_len_start, in_len_end, in_alpha].forEach(input => input.onchange = redraw);

function calcFallTime(length) {
  let g = getG();
  let alpha = getAlpha();
  if (isNaN(g) || isNaN(alpha)) {
    return 0;
  }
  return log(1 + sin(getAlpha()))
         / sqrt(2 * getG() / length);
}

function redraw() {
  let x = [];
  let lenStart = getLenStart();
  let lenEnd = getLenEnd();
  if (isNaN(lenStart) || isNaN(lenEnd)) return;
  for (let i = lenStart; i <= lenEnd; i++) {
    x.push(i);
  }
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