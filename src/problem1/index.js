// Problem 1: Three ways to sum to n

// n < Number.MATH_SAFE_INTERGER

// I will asumme that the input could be anything, so we need a input validation checker
// Or just throw an error
var getValidNumberInput = (n) => {
  if (!n || !Number.isInteger(Number(n)) || Number(n) < 0) {
    throw new Error("Your input is invalid!");
  }

  return Number(n);
};

// the basic way, using loop
var sum_to_n_a = function (n) {
  var validInput = getValidNumberInput(n);
  var result = 0;

  for (var i = 1; i <= validInput; i++) {
    result += i;
  }

  return result;
};

// Apply formular: (first + last) * (last - first + 1) / 2
var sum_to_n_b = function (n) {
  var validInput = getValidNumberInput(n);
  return ((1 + validInput) * validInput) / 2;
};

// Apply recursive
var sum_to_n_c = function (n) {
  var validInput = getValidNumberInput(n);

  if (validInput === 1) {
    return 1;
  }

  return validInput + sum_to_n_c(validInput - 1);
};

/* function main() {
  const n = 50;

  const solutionAResult = sum_to_n_a(n);
  const solutionBResult = sum_to_n_b(n);
  const solutionCResult = sum_to_n_c(n);

  console.log({ solutionAResult });
  console.log({ solutionBResult });
  console.log({ solutionCResult });
}

main(); */
