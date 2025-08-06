// Java's Math.copySign in JS
function copySign(x, y) {
  return Math.abs(x) * (y < 0 ? -1 : 1);
}

// Winitzki approximation for inverse error function
function approxInverseErrorFunction(x) {
  // clamp x to (-0.999999, 0.999999) to avoid log(0)
  x = Math.max(-0.999999, Math.min(0.999999, x));
  let a = 0.147;
  let ln = Math.log(1 - x * x);
  let part1 = (2 / (Math.PI * a)) + (ln / 2.0);
  let part2 = ln / a;
  let sqrtInner = Math.sqrt(part1 * part1 - part2);
  return copySign(Math.sqrt(sqrtInner - part1), x);
}

function calculateQualPoints() {
  const N = parseFloat(document.getElementById('numTeams').value);
  const R = parseFloat(document.getElementById('qualRank').value);
  const resultDiv = document.getElementById('result');

  // Input validation
  if (isNaN(N) || isNaN(R) || N < 2 || R < 1 || R > N) {
    resultDiv.textContent = "Please enter valid numbers: N ≥ 2, 1 ≤ R ≤ N.";
    return;
  }

  const alpha = 1.07;
  const inner = (N - 2 * R + 2) / (alpha * N);
  const invErfInner = approxInverseErrorFunction(inner);
  const invErfAlpha = approxInverseErrorFunction(1.0 / alpha);

  let result = Math.ceil(invErfInner * (7.0 / invErfAlpha) + 9);

  resultDiv.textContent = `Qualification Points: ${result}`;
}

document.getElementById('calculateBtn').addEventListener('click', calculateQualPoints);
