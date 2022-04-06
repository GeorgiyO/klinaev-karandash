const {cos, sqrt} = Math;

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

function integralFormula(x) {
  return 1 / sqrt(1 - cos(x));
}

function calcFallTime(length) {
  let g = getG();
  let alpha = getAlpha();
  if (isNaN(g) || isNaN(alpha)) {
    return 0;
  }
  let k = g / length;
  return (1 / sqrt(2 * k)) *
         (solveIntegral(integralFormula, 0, alpha, 10));
}

function solveIntegral(fx, x0, xN, N) {
  let DX = xN - x0;
  let dx = DX / N;
  let x = new Array(N + 1).fill(0)
                          .map((_, i) => x0 + i * dx);
  let sum = 0;
  for (let i = 1; i < x.length; i++) {
    console.log(fx((x[i - 1] + x[i]) / 2) * dx);
    sum += fx((x[i - 1] + x[i]) / 2);
  }
  console.log(sum, dx);
  console.log(x);
  return sum * dx;
}

function redraw() {
  let x = [];
  let lenStart = getLenStart();
  let lenEnd = getLenEnd();
  if (isNaN(lenStart) || isNaN(lenEnd)) return;
  let dl = (lenEnd - lenStart) / 10;
  new Array(10).fill(0).map((_, i) => lenStart + dl * i)
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