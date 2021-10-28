const calculate = (a, b, op) => {
  switch (op) {
    case "+":
      return a + b
    case "-":
      return a - b
    case "/":
      return b === 0 ? "Err" : a / b
    case "*":
      return a === 0 && b === 0 ? "Err" : a * b
    default:
    // do nothing
  }
}
export { calculate }
